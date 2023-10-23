import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFxTransactionChannelType, NewFxTransactionChannelType } from '../fx-transaction-channel-type.model';

export type PartialUpdateFxTransactionChannelType = Partial<IFxTransactionChannelType> & Pick<IFxTransactionChannelType, 'id'>;

export type EntityResponseType = HttpResponse<IFxTransactionChannelType>;
export type EntityArrayResponseType = HttpResponse<IFxTransactionChannelType[]>;

@Injectable({ providedIn: 'root' })
export class FxTransactionChannelTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fx-transaction-channel-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fx-transaction-channel-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fxTransactionChannelType: NewFxTransactionChannelType): Observable<EntityResponseType> {
    return this.http.post<IFxTransactionChannelType>(this.resourceUrl, fxTransactionChannelType, { observe: 'response' });
  }

  update(fxTransactionChannelType: IFxTransactionChannelType): Observable<EntityResponseType> {
    return this.http.put<IFxTransactionChannelType>(
      `${this.resourceUrl}/${this.getFxTransactionChannelTypeIdentifier(fxTransactionChannelType)}`,
      fxTransactionChannelType,
      { observe: 'response' }
    );
  }

  partialUpdate(fxTransactionChannelType: PartialUpdateFxTransactionChannelType): Observable<EntityResponseType> {
    return this.http.patch<IFxTransactionChannelType>(
      `${this.resourceUrl}/${this.getFxTransactionChannelTypeIdentifier(fxTransactionChannelType)}`,
      fxTransactionChannelType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFxTransactionChannelType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxTransactionChannelType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxTransactionChannelType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFxTransactionChannelTypeIdentifier(fxTransactionChannelType: Pick<IFxTransactionChannelType, 'id'>): number {
    return fxTransactionChannelType.id;
  }

  compareFxTransactionChannelType(
    o1: Pick<IFxTransactionChannelType, 'id'> | null,
    o2: Pick<IFxTransactionChannelType, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getFxTransactionChannelTypeIdentifier(o1) === this.getFxTransactionChannelTypeIdentifier(o2) : o1 === o2;
  }

  addFxTransactionChannelTypeToCollectionIfMissing<Type extends Pick<IFxTransactionChannelType, 'id'>>(
    fxTransactionChannelTypeCollection: Type[],
    ...fxTransactionChannelTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fxTransactionChannelTypes: Type[] = fxTransactionChannelTypesToCheck.filter(isPresent);
    if (fxTransactionChannelTypes.length > 0) {
      const fxTransactionChannelTypeCollectionIdentifiers = fxTransactionChannelTypeCollection.map(
        fxTransactionChannelTypeItem => this.getFxTransactionChannelTypeIdentifier(fxTransactionChannelTypeItem)!
      );
      const fxTransactionChannelTypesToAdd = fxTransactionChannelTypes.filter(fxTransactionChannelTypeItem => {
        const fxTransactionChannelTypeIdentifier = this.getFxTransactionChannelTypeIdentifier(fxTransactionChannelTypeItem);
        if (fxTransactionChannelTypeCollectionIdentifiers.includes(fxTransactionChannelTypeIdentifier)) {
          return false;
        }
        fxTransactionChannelTypeCollectionIdentifiers.push(fxTransactionChannelTypeIdentifier);
        return true;
      });
      return [...fxTransactionChannelTypesToAdd, ...fxTransactionChannelTypeCollection];
    }
    return fxTransactionChannelTypeCollection;
  }
}
