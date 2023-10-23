import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAgriculturalEnterpriseActivityType, NewAgriculturalEnterpriseActivityType } from '../agricultural-enterprise-activity-type.model';

export type PartialUpdateAgriculturalEnterpriseActivityType = Partial<IAgriculturalEnterpriseActivityType> &
  Pick<IAgriculturalEnterpriseActivityType, 'id'>;

export type EntityResponseType = HttpResponse<IAgriculturalEnterpriseActivityType>;
export type EntityArrayResponseType = HttpResponse<IAgriculturalEnterpriseActivityType[]>;

@Injectable({ providedIn: 'root' })
export class AgriculturalEnterpriseActivityTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/agricultural-enterprise-activity-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/agricultural-enterprise-activity-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(agriculturalEnterpriseActivityType: NewAgriculturalEnterpriseActivityType): Observable<EntityResponseType> {
    return this.http.post<IAgriculturalEnterpriseActivityType>(this.resourceUrl, agriculturalEnterpriseActivityType, {
      observe: 'response',
    });
  }

  update(agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType): Observable<EntityResponseType> {
    return this.http.put<IAgriculturalEnterpriseActivityType>(
      `${this.resourceUrl}/${this.getAgriculturalEnterpriseActivityTypeIdentifier(agriculturalEnterpriseActivityType)}`,
      agriculturalEnterpriseActivityType,
      { observe: 'response' }
    );
  }

  partialUpdate(agriculturalEnterpriseActivityType: PartialUpdateAgriculturalEnterpriseActivityType): Observable<EntityResponseType> {
    return this.http.patch<IAgriculturalEnterpriseActivityType>(
      `${this.resourceUrl}/${this.getAgriculturalEnterpriseActivityTypeIdentifier(agriculturalEnterpriseActivityType)}`,
      agriculturalEnterpriseActivityType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgriculturalEnterpriseActivityType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgriculturalEnterpriseActivityType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgriculturalEnterpriseActivityType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAgriculturalEnterpriseActivityTypeIdentifier(
    agriculturalEnterpriseActivityType: Pick<IAgriculturalEnterpriseActivityType, 'id'>
  ): number {
    return agriculturalEnterpriseActivityType.id;
  }

  compareAgriculturalEnterpriseActivityType(
    o1: Pick<IAgriculturalEnterpriseActivityType, 'id'> | null,
    o2: Pick<IAgriculturalEnterpriseActivityType, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getAgriculturalEnterpriseActivityTypeIdentifier(o1) === this.getAgriculturalEnterpriseActivityTypeIdentifier(o2)
      : o1 === o2;
  }

  addAgriculturalEnterpriseActivityTypeToCollectionIfMissing<Type extends Pick<IAgriculturalEnterpriseActivityType, 'id'>>(
    agriculturalEnterpriseActivityTypeCollection: Type[],
    ...agriculturalEnterpriseActivityTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const agriculturalEnterpriseActivityTypes: Type[] = agriculturalEnterpriseActivityTypesToCheck.filter(isPresent);
    if (agriculturalEnterpriseActivityTypes.length > 0) {
      const agriculturalEnterpriseActivityTypeCollectionIdentifiers = agriculturalEnterpriseActivityTypeCollection.map(
        agriculturalEnterpriseActivityTypeItem =>
          this.getAgriculturalEnterpriseActivityTypeIdentifier(agriculturalEnterpriseActivityTypeItem)!
      );
      const agriculturalEnterpriseActivityTypesToAdd = agriculturalEnterpriseActivityTypes.filter(
        agriculturalEnterpriseActivityTypeItem => {
          const agriculturalEnterpriseActivityTypeIdentifier = this.getAgriculturalEnterpriseActivityTypeIdentifier(
            agriculturalEnterpriseActivityTypeItem
          );
          if (agriculturalEnterpriseActivityTypeCollectionIdentifiers.includes(agriculturalEnterpriseActivityTypeIdentifier)) {
            return false;
          }
          agriculturalEnterpriseActivityTypeCollectionIdentifiers.push(agriculturalEnterpriseActivityTypeIdentifier);
          return true;
        }
      );
      return [...agriculturalEnterpriseActivityTypesToAdd, ...agriculturalEnterpriseActivityTypeCollection];
    }
    return agriculturalEnterpriseActivityTypeCollection;
  }
}
