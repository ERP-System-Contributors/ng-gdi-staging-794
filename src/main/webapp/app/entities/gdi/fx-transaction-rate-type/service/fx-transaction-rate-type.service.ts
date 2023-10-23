import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFxTransactionRateType, NewFxTransactionRateType } from '../fx-transaction-rate-type.model';

export type PartialUpdateFxTransactionRateType = Partial<IFxTransactionRateType> & Pick<IFxTransactionRateType, 'id'>;

export type EntityResponseType = HttpResponse<IFxTransactionRateType>;
export type EntityArrayResponseType = HttpResponse<IFxTransactionRateType[]>;

@Injectable({ providedIn: 'root' })
export class FxTransactionRateTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fx-transaction-rate-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fx-transaction-rate-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fxTransactionRateType: NewFxTransactionRateType): Observable<EntityResponseType> {
    return this.http.post<IFxTransactionRateType>(this.resourceUrl, fxTransactionRateType, { observe: 'response' });
  }

  update(fxTransactionRateType: IFxTransactionRateType): Observable<EntityResponseType> {
    return this.http.put<IFxTransactionRateType>(
      `${this.resourceUrl}/${this.getFxTransactionRateTypeIdentifier(fxTransactionRateType)}`,
      fxTransactionRateType,
      { observe: 'response' }
    );
  }

  partialUpdate(fxTransactionRateType: PartialUpdateFxTransactionRateType): Observable<EntityResponseType> {
    return this.http.patch<IFxTransactionRateType>(
      `${this.resourceUrl}/${this.getFxTransactionRateTypeIdentifier(fxTransactionRateType)}`,
      fxTransactionRateType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFxTransactionRateType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxTransactionRateType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxTransactionRateType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFxTransactionRateTypeIdentifier(fxTransactionRateType: Pick<IFxTransactionRateType, 'id'>): number {
    return fxTransactionRateType.id;
  }

  compareFxTransactionRateType(o1: Pick<IFxTransactionRateType, 'id'> | null, o2: Pick<IFxTransactionRateType, 'id'> | null): boolean {
    return o1 && o2 ? this.getFxTransactionRateTypeIdentifier(o1) === this.getFxTransactionRateTypeIdentifier(o2) : o1 === o2;
  }

  addFxTransactionRateTypeToCollectionIfMissing<Type extends Pick<IFxTransactionRateType, 'id'>>(
    fxTransactionRateTypeCollection: Type[],
    ...fxTransactionRateTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fxTransactionRateTypes: Type[] = fxTransactionRateTypesToCheck.filter(isPresent);
    if (fxTransactionRateTypes.length > 0) {
      const fxTransactionRateTypeCollectionIdentifiers = fxTransactionRateTypeCollection.map(
        fxTransactionRateTypeItem => this.getFxTransactionRateTypeIdentifier(fxTransactionRateTypeItem)!
      );
      const fxTransactionRateTypesToAdd = fxTransactionRateTypes.filter(fxTransactionRateTypeItem => {
        const fxTransactionRateTypeIdentifier = this.getFxTransactionRateTypeIdentifier(fxTransactionRateTypeItem);
        if (fxTransactionRateTypeCollectionIdentifiers.includes(fxTransactionRateTypeIdentifier)) {
          return false;
        }
        fxTransactionRateTypeCollectionIdentifiers.push(fxTransactionRateTypeIdentifier);
        return true;
      });
      return [...fxTransactionRateTypesToAdd, ...fxTransactionRateTypeCollection];
    }
    return fxTransactionRateTypeCollection;
  }
}
