import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbCreditFacilityType, NewCrbCreditFacilityType } from '../crb-credit-facility-type.model';

export type PartialUpdateCrbCreditFacilityType = Partial<ICrbCreditFacilityType> & Pick<ICrbCreditFacilityType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbCreditFacilityType>;
export type EntityArrayResponseType = HttpResponse<ICrbCreditFacilityType[]>;

@Injectable({ providedIn: 'root' })
export class CrbCreditFacilityTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-credit-facility-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-credit-facility-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbCreditFacilityType: NewCrbCreditFacilityType): Observable<EntityResponseType> {
    return this.http.post<ICrbCreditFacilityType>(this.resourceUrl, crbCreditFacilityType, { observe: 'response' });
  }

  update(crbCreditFacilityType: ICrbCreditFacilityType): Observable<EntityResponseType> {
    return this.http.put<ICrbCreditFacilityType>(
      `${this.resourceUrl}/${this.getCrbCreditFacilityTypeIdentifier(crbCreditFacilityType)}`,
      crbCreditFacilityType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbCreditFacilityType: PartialUpdateCrbCreditFacilityType): Observable<EntityResponseType> {
    return this.http.patch<ICrbCreditFacilityType>(
      `${this.resourceUrl}/${this.getCrbCreditFacilityTypeIdentifier(crbCreditFacilityType)}`,
      crbCreditFacilityType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbCreditFacilityType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbCreditFacilityType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbCreditFacilityType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbCreditFacilityTypeIdentifier(crbCreditFacilityType: Pick<ICrbCreditFacilityType, 'id'>): number {
    return crbCreditFacilityType.id;
  }

  compareCrbCreditFacilityType(o1: Pick<ICrbCreditFacilityType, 'id'> | null, o2: Pick<ICrbCreditFacilityType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbCreditFacilityTypeIdentifier(o1) === this.getCrbCreditFacilityTypeIdentifier(o2) : o1 === o2;
  }

  addCrbCreditFacilityTypeToCollectionIfMissing<Type extends Pick<ICrbCreditFacilityType, 'id'>>(
    crbCreditFacilityTypeCollection: Type[],
    ...crbCreditFacilityTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbCreditFacilityTypes: Type[] = crbCreditFacilityTypesToCheck.filter(isPresent);
    if (crbCreditFacilityTypes.length > 0) {
      const crbCreditFacilityTypeCollectionIdentifiers = crbCreditFacilityTypeCollection.map(
        crbCreditFacilityTypeItem => this.getCrbCreditFacilityTypeIdentifier(crbCreditFacilityTypeItem)!
      );
      const crbCreditFacilityTypesToAdd = crbCreditFacilityTypes.filter(crbCreditFacilityTypeItem => {
        const crbCreditFacilityTypeIdentifier = this.getCrbCreditFacilityTypeIdentifier(crbCreditFacilityTypeItem);
        if (crbCreditFacilityTypeCollectionIdentifiers.includes(crbCreditFacilityTypeIdentifier)) {
          return false;
        }
        crbCreditFacilityTypeCollectionIdentifiers.push(crbCreditFacilityTypeIdentifier);
        return true;
      });
      return [...crbCreditFacilityTypesToAdd, ...crbCreditFacilityTypeCollection];
    }
    return crbCreditFacilityTypeCollection;
  }
}
