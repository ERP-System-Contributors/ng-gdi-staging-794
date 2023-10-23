import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbAgentServiceType, NewCrbAgentServiceType } from '../crb-agent-service-type.model';

export type PartialUpdateCrbAgentServiceType = Partial<ICrbAgentServiceType> & Pick<ICrbAgentServiceType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbAgentServiceType>;
export type EntityArrayResponseType = HttpResponse<ICrbAgentServiceType[]>;

@Injectable({ providedIn: 'root' })
export class CrbAgentServiceTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-agent-service-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-agent-service-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbAgentServiceType: NewCrbAgentServiceType): Observable<EntityResponseType> {
    return this.http.post<ICrbAgentServiceType>(this.resourceUrl, crbAgentServiceType, { observe: 'response' });
  }

  update(crbAgentServiceType: ICrbAgentServiceType): Observable<EntityResponseType> {
    return this.http.put<ICrbAgentServiceType>(
      `${this.resourceUrl}/${this.getCrbAgentServiceTypeIdentifier(crbAgentServiceType)}`,
      crbAgentServiceType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbAgentServiceType: PartialUpdateCrbAgentServiceType): Observable<EntityResponseType> {
    return this.http.patch<ICrbAgentServiceType>(
      `${this.resourceUrl}/${this.getCrbAgentServiceTypeIdentifier(crbAgentServiceType)}`,
      crbAgentServiceType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbAgentServiceType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAgentServiceType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAgentServiceType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbAgentServiceTypeIdentifier(crbAgentServiceType: Pick<ICrbAgentServiceType, 'id'>): number {
    return crbAgentServiceType.id;
  }

  compareCrbAgentServiceType(o1: Pick<ICrbAgentServiceType, 'id'> | null, o2: Pick<ICrbAgentServiceType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbAgentServiceTypeIdentifier(o1) === this.getCrbAgentServiceTypeIdentifier(o2) : o1 === o2;
  }

  addCrbAgentServiceTypeToCollectionIfMissing<Type extends Pick<ICrbAgentServiceType, 'id'>>(
    crbAgentServiceTypeCollection: Type[],
    ...crbAgentServiceTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbAgentServiceTypes: Type[] = crbAgentServiceTypesToCheck.filter(isPresent);
    if (crbAgentServiceTypes.length > 0) {
      const crbAgentServiceTypeCollectionIdentifiers = crbAgentServiceTypeCollection.map(
        crbAgentServiceTypeItem => this.getCrbAgentServiceTypeIdentifier(crbAgentServiceTypeItem)!
      );
      const crbAgentServiceTypesToAdd = crbAgentServiceTypes.filter(crbAgentServiceTypeItem => {
        const crbAgentServiceTypeIdentifier = this.getCrbAgentServiceTypeIdentifier(crbAgentServiceTypeItem);
        if (crbAgentServiceTypeCollectionIdentifiers.includes(crbAgentServiceTypeIdentifier)) {
          return false;
        }
        crbAgentServiceTypeCollectionIdentifiers.push(crbAgentServiceTypeIdentifier);
        return true;
      });
      return [...crbAgentServiceTypesToAdd, ...crbAgentServiceTypeCollection];
    }
    return crbAgentServiceTypeCollection;
  }
}
