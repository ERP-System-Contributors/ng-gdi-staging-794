import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISecurityClassificationType, NewSecurityClassificationType } from '../security-classification-type.model';

export type PartialUpdateSecurityClassificationType = Partial<ISecurityClassificationType> & Pick<ISecurityClassificationType, 'id'>;

export type EntityResponseType = HttpResponse<ISecurityClassificationType>;
export type EntityArrayResponseType = HttpResponse<ISecurityClassificationType[]>;

@Injectable({ providedIn: 'root' })
export class SecurityClassificationTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/security-classification-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/security-classification-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(securityClassificationType: NewSecurityClassificationType): Observable<EntityResponseType> {
    return this.http.post<ISecurityClassificationType>(this.resourceUrl, securityClassificationType, { observe: 'response' });
  }

  update(securityClassificationType: ISecurityClassificationType): Observable<EntityResponseType> {
    return this.http.put<ISecurityClassificationType>(
      `${this.resourceUrl}/${this.getSecurityClassificationTypeIdentifier(securityClassificationType)}`,
      securityClassificationType,
      { observe: 'response' }
    );
  }

  partialUpdate(securityClassificationType: PartialUpdateSecurityClassificationType): Observable<EntityResponseType> {
    return this.http.patch<ISecurityClassificationType>(
      `${this.resourceUrl}/${this.getSecurityClassificationTypeIdentifier(securityClassificationType)}`,
      securityClassificationType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISecurityClassificationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityClassificationType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityClassificationType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSecurityClassificationTypeIdentifier(securityClassificationType: Pick<ISecurityClassificationType, 'id'>): number {
    return securityClassificationType.id;
  }

  compareSecurityClassificationType(
    o1: Pick<ISecurityClassificationType, 'id'> | null,
    o2: Pick<ISecurityClassificationType, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getSecurityClassificationTypeIdentifier(o1) === this.getSecurityClassificationTypeIdentifier(o2) : o1 === o2;
  }

  addSecurityClassificationTypeToCollectionIfMissing<Type extends Pick<ISecurityClassificationType, 'id'>>(
    securityClassificationTypeCollection: Type[],
    ...securityClassificationTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const securityClassificationTypes: Type[] = securityClassificationTypesToCheck.filter(isPresent);
    if (securityClassificationTypes.length > 0) {
      const securityClassificationTypeCollectionIdentifiers = securityClassificationTypeCollection.map(
        securityClassificationTypeItem => this.getSecurityClassificationTypeIdentifier(securityClassificationTypeItem)!
      );
      const securityClassificationTypesToAdd = securityClassificationTypes.filter(securityClassificationTypeItem => {
        const securityClassificationTypeIdentifier = this.getSecurityClassificationTypeIdentifier(securityClassificationTypeItem);
        if (securityClassificationTypeCollectionIdentifiers.includes(securityClassificationTypeIdentifier)) {
          return false;
        }
        securityClassificationTypeCollectionIdentifiers.push(securityClassificationTypeIdentifier);
        return true;
      });
      return [...securityClassificationTypesToAdd, ...securityClassificationTypeCollection];
    }
    return securityClassificationTypeCollection;
  }
}
