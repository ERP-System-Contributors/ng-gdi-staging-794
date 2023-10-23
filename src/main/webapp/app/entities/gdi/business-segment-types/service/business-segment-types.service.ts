import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IBusinessSegmentTypes, NewBusinessSegmentTypes } from '../business-segment-types.model';

export type PartialUpdateBusinessSegmentTypes = Partial<IBusinessSegmentTypes> & Pick<IBusinessSegmentTypes, 'id'>;

export type EntityResponseType = HttpResponse<IBusinessSegmentTypes>;
export type EntityArrayResponseType = HttpResponse<IBusinessSegmentTypes[]>;

@Injectable({ providedIn: 'root' })
export class BusinessSegmentTypesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/business-segment-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/business-segment-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(businessSegmentTypes: NewBusinessSegmentTypes): Observable<EntityResponseType> {
    return this.http.post<IBusinessSegmentTypes>(this.resourceUrl, businessSegmentTypes, { observe: 'response' });
  }

  update(businessSegmentTypes: IBusinessSegmentTypes): Observable<EntityResponseType> {
    return this.http.put<IBusinessSegmentTypes>(
      `${this.resourceUrl}/${this.getBusinessSegmentTypesIdentifier(businessSegmentTypes)}`,
      businessSegmentTypes,
      { observe: 'response' }
    );
  }

  partialUpdate(businessSegmentTypes: PartialUpdateBusinessSegmentTypes): Observable<EntityResponseType> {
    return this.http.patch<IBusinessSegmentTypes>(
      `${this.resourceUrl}/${this.getBusinessSegmentTypesIdentifier(businessSegmentTypes)}`,
      businessSegmentTypes,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBusinessSegmentTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBusinessSegmentTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBusinessSegmentTypes[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getBusinessSegmentTypesIdentifier(businessSegmentTypes: Pick<IBusinessSegmentTypes, 'id'>): number {
    return businessSegmentTypes.id;
  }

  compareBusinessSegmentTypes(o1: Pick<IBusinessSegmentTypes, 'id'> | null, o2: Pick<IBusinessSegmentTypes, 'id'> | null): boolean {
    return o1 && o2 ? this.getBusinessSegmentTypesIdentifier(o1) === this.getBusinessSegmentTypesIdentifier(o2) : o1 === o2;
  }

  addBusinessSegmentTypesToCollectionIfMissing<Type extends Pick<IBusinessSegmentTypes, 'id'>>(
    businessSegmentTypesCollection: Type[],
    ...businessSegmentTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const businessSegmentTypes: Type[] = businessSegmentTypesToCheck.filter(isPresent);
    if (businessSegmentTypes.length > 0) {
      const businessSegmentTypesCollectionIdentifiers = businessSegmentTypesCollection.map(
        businessSegmentTypesItem => this.getBusinessSegmentTypesIdentifier(businessSegmentTypesItem)!
      );
      const businessSegmentTypesToAdd = businessSegmentTypes.filter(businessSegmentTypesItem => {
        const businessSegmentTypesIdentifier = this.getBusinessSegmentTypesIdentifier(businessSegmentTypesItem);
        if (businessSegmentTypesCollectionIdentifiers.includes(businessSegmentTypesIdentifier)) {
          return false;
        }
        businessSegmentTypesCollectionIdentifiers.push(businessSegmentTypesIdentifier);
        return true;
      });
      return [...businessSegmentTypesToAdd, ...businessSegmentTypesCollection];
    }
    return businessSegmentTypesCollection;
  }
}
