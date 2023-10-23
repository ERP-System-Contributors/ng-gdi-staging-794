import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFxTransactionType, NewFxTransactionType } from '../fx-transaction-type.model';

export type PartialUpdateFxTransactionType = Partial<IFxTransactionType> & Pick<IFxTransactionType, 'id'>;

export type EntityResponseType = HttpResponse<IFxTransactionType>;
export type EntityArrayResponseType = HttpResponse<IFxTransactionType[]>;

@Injectable({ providedIn: 'root' })
export class FxTransactionTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fx-transaction-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fx-transaction-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fxTransactionType: NewFxTransactionType): Observable<EntityResponseType> {
    return this.http.post<IFxTransactionType>(this.resourceUrl, fxTransactionType, { observe: 'response' });
  }

  update(fxTransactionType: IFxTransactionType): Observable<EntityResponseType> {
    return this.http.put<IFxTransactionType>(
      `${this.resourceUrl}/${this.getFxTransactionTypeIdentifier(fxTransactionType)}`,
      fxTransactionType,
      { observe: 'response' }
    );
  }

  partialUpdate(fxTransactionType: PartialUpdateFxTransactionType): Observable<EntityResponseType> {
    return this.http.patch<IFxTransactionType>(
      `${this.resourceUrl}/${this.getFxTransactionTypeIdentifier(fxTransactionType)}`,
      fxTransactionType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFxTransactionType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxTransactionType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxTransactionType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFxTransactionTypeIdentifier(fxTransactionType: Pick<IFxTransactionType, 'id'>): number {
    return fxTransactionType.id;
  }

  compareFxTransactionType(o1: Pick<IFxTransactionType, 'id'> | null, o2: Pick<IFxTransactionType, 'id'> | null): boolean {
    return o1 && o2 ? this.getFxTransactionTypeIdentifier(o1) === this.getFxTransactionTypeIdentifier(o2) : o1 === o2;
  }

  addFxTransactionTypeToCollectionIfMissing<Type extends Pick<IFxTransactionType, 'id'>>(
    fxTransactionTypeCollection: Type[],
    ...fxTransactionTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fxTransactionTypes: Type[] = fxTransactionTypesToCheck.filter(isPresent);
    if (fxTransactionTypes.length > 0) {
      const fxTransactionTypeCollectionIdentifiers = fxTransactionTypeCollection.map(
        fxTransactionTypeItem => this.getFxTransactionTypeIdentifier(fxTransactionTypeItem)!
      );
      const fxTransactionTypesToAdd = fxTransactionTypes.filter(fxTransactionTypeItem => {
        const fxTransactionTypeIdentifier = this.getFxTransactionTypeIdentifier(fxTransactionTypeItem);
        if (fxTransactionTypeCollectionIdentifiers.includes(fxTransactionTypeIdentifier)) {
          return false;
        }
        fxTransactionTypeCollectionIdentifiers.push(fxTransactionTypeIdentifier);
        return true;
      });
      return [...fxTransactionTypesToAdd, ...fxTransactionTypeCollection];
    }
    return fxTransactionTypeCollection;
  }
}
