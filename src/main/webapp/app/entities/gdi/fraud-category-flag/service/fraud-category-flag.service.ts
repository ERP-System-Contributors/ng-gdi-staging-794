import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFraudCategoryFlag, NewFraudCategoryFlag } from '../fraud-category-flag.model';

export type PartialUpdateFraudCategoryFlag = Partial<IFraudCategoryFlag> & Pick<IFraudCategoryFlag, 'id'>;

export type EntityResponseType = HttpResponse<IFraudCategoryFlag>;
export type EntityArrayResponseType = HttpResponse<IFraudCategoryFlag[]>;

@Injectable({ providedIn: 'root' })
export class FraudCategoryFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fraud-category-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fraud-category-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fraudCategoryFlag: NewFraudCategoryFlag): Observable<EntityResponseType> {
    return this.http.post<IFraudCategoryFlag>(this.resourceUrl, fraudCategoryFlag, { observe: 'response' });
  }

  update(fraudCategoryFlag: IFraudCategoryFlag): Observable<EntityResponseType> {
    return this.http.put<IFraudCategoryFlag>(
      `${this.resourceUrl}/${this.getFraudCategoryFlagIdentifier(fraudCategoryFlag)}`,
      fraudCategoryFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(fraudCategoryFlag: PartialUpdateFraudCategoryFlag): Observable<EntityResponseType> {
    return this.http.patch<IFraudCategoryFlag>(
      `${this.resourceUrl}/${this.getFraudCategoryFlagIdentifier(fraudCategoryFlag)}`,
      fraudCategoryFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFraudCategoryFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFraudCategoryFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFraudCategoryFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFraudCategoryFlagIdentifier(fraudCategoryFlag: Pick<IFraudCategoryFlag, 'id'>): number {
    return fraudCategoryFlag.id;
  }

  compareFraudCategoryFlag(o1: Pick<IFraudCategoryFlag, 'id'> | null, o2: Pick<IFraudCategoryFlag, 'id'> | null): boolean {
    return o1 && o2 ? this.getFraudCategoryFlagIdentifier(o1) === this.getFraudCategoryFlagIdentifier(o2) : o1 === o2;
  }

  addFraudCategoryFlagToCollectionIfMissing<Type extends Pick<IFraudCategoryFlag, 'id'>>(
    fraudCategoryFlagCollection: Type[],
    ...fraudCategoryFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fraudCategoryFlags: Type[] = fraudCategoryFlagsToCheck.filter(isPresent);
    if (fraudCategoryFlags.length > 0) {
      const fraudCategoryFlagCollectionIdentifiers = fraudCategoryFlagCollection.map(
        fraudCategoryFlagItem => this.getFraudCategoryFlagIdentifier(fraudCategoryFlagItem)!
      );
      const fraudCategoryFlagsToAdd = fraudCategoryFlags.filter(fraudCategoryFlagItem => {
        const fraudCategoryFlagIdentifier = this.getFraudCategoryFlagIdentifier(fraudCategoryFlagItem);
        if (fraudCategoryFlagCollectionIdentifiers.includes(fraudCategoryFlagIdentifier)) {
          return false;
        }
        fraudCategoryFlagCollectionIdentifiers.push(fraudCategoryFlagIdentifier);
        return true;
      });
      return [...fraudCategoryFlagsToAdd, ...fraudCategoryFlagCollection];
    }
    return fraudCategoryFlagCollection;
  }
}
