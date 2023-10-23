import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAnticipatedMaturityPeriood, NewAnticipatedMaturityPeriood } from '../anticipated-maturity-periood.model';

export type PartialUpdateAnticipatedMaturityPeriood = Partial<IAnticipatedMaturityPeriood> & Pick<IAnticipatedMaturityPeriood, 'id'>;

export type EntityResponseType = HttpResponse<IAnticipatedMaturityPeriood>;
export type EntityArrayResponseType = HttpResponse<IAnticipatedMaturityPeriood[]>;

@Injectable({ providedIn: 'root' })
export class AnticipatedMaturityPerioodService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/anticipated-maturity-perioods');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/anticipated-maturity-perioods');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(anticipatedMaturityPeriood: NewAnticipatedMaturityPeriood): Observable<EntityResponseType> {
    return this.http.post<IAnticipatedMaturityPeriood>(this.resourceUrl, anticipatedMaturityPeriood, { observe: 'response' });
  }

  update(anticipatedMaturityPeriood: IAnticipatedMaturityPeriood): Observable<EntityResponseType> {
    return this.http.put<IAnticipatedMaturityPeriood>(
      `${this.resourceUrl}/${this.getAnticipatedMaturityPerioodIdentifier(anticipatedMaturityPeriood)}`,
      anticipatedMaturityPeriood,
      { observe: 'response' }
    );
  }

  partialUpdate(anticipatedMaturityPeriood: PartialUpdateAnticipatedMaturityPeriood): Observable<EntityResponseType> {
    return this.http.patch<IAnticipatedMaturityPeriood>(
      `${this.resourceUrl}/${this.getAnticipatedMaturityPerioodIdentifier(anticipatedMaturityPeriood)}`,
      anticipatedMaturityPeriood,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnticipatedMaturityPeriood>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnticipatedMaturityPeriood[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnticipatedMaturityPeriood[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAnticipatedMaturityPerioodIdentifier(anticipatedMaturityPeriood: Pick<IAnticipatedMaturityPeriood, 'id'>): number {
    return anticipatedMaturityPeriood.id;
  }

  compareAnticipatedMaturityPeriood(
    o1: Pick<IAnticipatedMaturityPeriood, 'id'> | null,
    o2: Pick<IAnticipatedMaturityPeriood, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getAnticipatedMaturityPerioodIdentifier(o1) === this.getAnticipatedMaturityPerioodIdentifier(o2) : o1 === o2;
  }

  addAnticipatedMaturityPerioodToCollectionIfMissing<Type extends Pick<IAnticipatedMaturityPeriood, 'id'>>(
    anticipatedMaturityPerioodCollection: Type[],
    ...anticipatedMaturityPerioodsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const anticipatedMaturityPerioods: Type[] = anticipatedMaturityPerioodsToCheck.filter(isPresent);
    if (anticipatedMaturityPerioods.length > 0) {
      const anticipatedMaturityPerioodCollectionIdentifiers = anticipatedMaturityPerioodCollection.map(
        anticipatedMaturityPerioodItem => this.getAnticipatedMaturityPerioodIdentifier(anticipatedMaturityPerioodItem)!
      );
      const anticipatedMaturityPerioodsToAdd = anticipatedMaturityPerioods.filter(anticipatedMaturityPerioodItem => {
        const anticipatedMaturityPerioodIdentifier = this.getAnticipatedMaturityPerioodIdentifier(anticipatedMaturityPerioodItem);
        if (anticipatedMaturityPerioodCollectionIdentifiers.includes(anticipatedMaturityPerioodIdentifier)) {
          return false;
        }
        anticipatedMaturityPerioodCollectionIdentifiers.push(anticipatedMaturityPerioodIdentifier);
        return true;
      });
      return [...anticipatedMaturityPerioodsToAdd, ...anticipatedMaturityPerioodCollection];
    }
    return anticipatedMaturityPerioodCollection;
  }
}
