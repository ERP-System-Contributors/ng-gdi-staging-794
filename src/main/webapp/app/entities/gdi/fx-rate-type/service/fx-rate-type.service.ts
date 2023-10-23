import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFxRateType, NewFxRateType } from '../fx-rate-type.model';

export type PartialUpdateFxRateType = Partial<IFxRateType> & Pick<IFxRateType, 'id'>;

export type EntityResponseType = HttpResponse<IFxRateType>;
export type EntityArrayResponseType = HttpResponse<IFxRateType[]>;

@Injectable({ providedIn: 'root' })
export class FxRateTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fx-rate-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fx-rate-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fxRateType: NewFxRateType): Observable<EntityResponseType> {
    return this.http.post<IFxRateType>(this.resourceUrl, fxRateType, { observe: 'response' });
  }

  update(fxRateType: IFxRateType): Observable<EntityResponseType> {
    return this.http.put<IFxRateType>(`${this.resourceUrl}/${this.getFxRateTypeIdentifier(fxRateType)}`, fxRateType, {
      observe: 'response',
    });
  }

  partialUpdate(fxRateType: PartialUpdateFxRateType): Observable<EntityResponseType> {
    return this.http.patch<IFxRateType>(`${this.resourceUrl}/${this.getFxRateTypeIdentifier(fxRateType)}`, fxRateType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFxRateType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxRateType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFxRateType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFxRateTypeIdentifier(fxRateType: Pick<IFxRateType, 'id'>): number {
    return fxRateType.id;
  }

  compareFxRateType(o1: Pick<IFxRateType, 'id'> | null, o2: Pick<IFxRateType, 'id'> | null): boolean {
    return o1 && o2 ? this.getFxRateTypeIdentifier(o1) === this.getFxRateTypeIdentifier(o2) : o1 === o2;
  }

  addFxRateTypeToCollectionIfMissing<Type extends Pick<IFxRateType, 'id'>>(
    fxRateTypeCollection: Type[],
    ...fxRateTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fxRateTypes: Type[] = fxRateTypesToCheck.filter(isPresent);
    if (fxRateTypes.length > 0) {
      const fxRateTypeCollectionIdentifiers = fxRateTypeCollection.map(fxRateTypeItem => this.getFxRateTypeIdentifier(fxRateTypeItem)!);
      const fxRateTypesToAdd = fxRateTypes.filter(fxRateTypeItem => {
        const fxRateTypeIdentifier = this.getFxRateTypeIdentifier(fxRateTypeItem);
        if (fxRateTypeCollectionIdentifiers.includes(fxRateTypeIdentifier)) {
          return false;
        }
        fxRateTypeCollectionIdentifiers.push(fxRateTypeIdentifier);
        return true;
      });
      return [...fxRateTypesToAdd, ...fxRateTypeCollection];
    }
    return fxRateTypeCollection;
  }
}
