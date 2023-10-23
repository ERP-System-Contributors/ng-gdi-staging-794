import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFxReceiptPurposeType, NewFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';

export type PartialUpdateFxReceiptPurposeType = Partial<IFxReceiptPurposeType> & Pick<IFxReceiptPurposeType, 'id'>;

export type EntityResponseType = HttpResponse<IFxReceiptPurposeType>;
export type EntityArrayResponseType = HttpResponse<IFxReceiptPurposeType[]>;

@Injectable({ providedIn: 'root' })
export class FxReceiptPurposeTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fx-receipt-purpose-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fx-receipt-purpose-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fxReceiptPurposeType: NewFxReceiptPurposeType): Observable<EntityResponseType> {
    return this.http.post<IFxReceiptPurposeType>(this.resourceUrl, fxReceiptPurposeType, { observe: 'response' });
  }

  update(fxReceiptPurposeType: IFxReceiptPurposeType): Observable<EntityResponseType> {
    return this.http.put<IFxReceiptPurposeType>(
      `${this.resourceUrl}/${this.getFxReceiptPurposeTypeIdentifier(fxReceiptPurposeType)}`,
      fxReceiptPurposeType,
      { observe: 'response' }
    );
  }

  partialUpdate(fxReceiptPurposeType: PartialUpdateFxReceiptPurposeType): Observable<EntityResponseType> {
    return this.http.patch<IFxReceiptPurposeType>(
      `${this.resourceUrl}/${this.getFxReceiptPurposeTypeIdentifier(fxReceiptPurposeType)}`,
      fxReceiptPurposeType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFxReceiptPurposeType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxReceiptPurposeType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxReceiptPurposeType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFxReceiptPurposeTypeIdentifier(fxReceiptPurposeType: Pick<IFxReceiptPurposeType, 'id'>): number {
    return fxReceiptPurposeType.id;
  }

  compareFxReceiptPurposeType(o1: Pick<IFxReceiptPurposeType, 'id'> | null, o2: Pick<IFxReceiptPurposeType, 'id'> | null): boolean {
    return o1 && o2 ? this.getFxReceiptPurposeTypeIdentifier(o1) === this.getFxReceiptPurposeTypeIdentifier(o2) : o1 === o2;
  }

  addFxReceiptPurposeTypeToCollectionIfMissing<Type extends Pick<IFxReceiptPurposeType, 'id'>>(
    fxReceiptPurposeTypeCollection: Type[],
    ...fxReceiptPurposeTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fxReceiptPurposeTypes: Type[] = fxReceiptPurposeTypesToCheck.filter(isPresent);
    if (fxReceiptPurposeTypes.length > 0) {
      const fxReceiptPurposeTypeCollectionIdentifiers = fxReceiptPurposeTypeCollection.map(
        fxReceiptPurposeTypeItem => this.getFxReceiptPurposeTypeIdentifier(fxReceiptPurposeTypeItem)!
      );
      const fxReceiptPurposeTypesToAdd = fxReceiptPurposeTypes.filter(fxReceiptPurposeTypeItem => {
        const fxReceiptPurposeTypeIdentifier = this.getFxReceiptPurposeTypeIdentifier(fxReceiptPurposeTypeItem);
        if (fxReceiptPurposeTypeCollectionIdentifiers.includes(fxReceiptPurposeTypeIdentifier)) {
          return false;
        }
        fxReceiptPurposeTypeCollectionIdentifiers.push(fxReceiptPurposeTypeIdentifier);
        return true;
      });
      return [...fxReceiptPurposeTypesToAdd, ...fxReceiptPurposeTypeCollection];
    }
    return fxReceiptPurposeTypeCollection;
  }
}
