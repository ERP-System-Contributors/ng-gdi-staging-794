import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbDataSubmittingInstitutions, NewCrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';

export type PartialUpdateCrbDataSubmittingInstitutions = Partial<ICrbDataSubmittingInstitutions> &
  Pick<ICrbDataSubmittingInstitutions, 'id'>;

export type EntityResponseType = HttpResponse<ICrbDataSubmittingInstitutions>;
export type EntityArrayResponseType = HttpResponse<ICrbDataSubmittingInstitutions[]>;

@Injectable({ providedIn: 'root' })
export class CrbDataSubmittingInstitutionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-data-submitting-institutions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-data-submitting-institutions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbDataSubmittingInstitutions: NewCrbDataSubmittingInstitutions): Observable<EntityResponseType> {
    return this.http.post<ICrbDataSubmittingInstitutions>(this.resourceUrl, crbDataSubmittingInstitutions, { observe: 'response' });
  }

  update(crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions): Observable<EntityResponseType> {
    return this.http.put<ICrbDataSubmittingInstitutions>(
      `${this.resourceUrl}/${this.getCrbDataSubmittingInstitutionsIdentifier(crbDataSubmittingInstitutions)}`,
      crbDataSubmittingInstitutions,
      { observe: 'response' }
    );
  }

  partialUpdate(crbDataSubmittingInstitutions: PartialUpdateCrbDataSubmittingInstitutions): Observable<EntityResponseType> {
    return this.http.patch<ICrbDataSubmittingInstitutions>(
      `${this.resourceUrl}/${this.getCrbDataSubmittingInstitutionsIdentifier(crbDataSubmittingInstitutions)}`,
      crbDataSubmittingInstitutions,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbDataSubmittingInstitutions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbDataSubmittingInstitutions[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbDataSubmittingInstitutions[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbDataSubmittingInstitutionsIdentifier(crbDataSubmittingInstitutions: Pick<ICrbDataSubmittingInstitutions, 'id'>): number {
    return crbDataSubmittingInstitutions.id;
  }

  compareCrbDataSubmittingInstitutions(
    o1: Pick<ICrbDataSubmittingInstitutions, 'id'> | null,
    o2: Pick<ICrbDataSubmittingInstitutions, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getCrbDataSubmittingInstitutionsIdentifier(o1) === this.getCrbDataSubmittingInstitutionsIdentifier(o2)
      : o1 === o2;
  }

  addCrbDataSubmittingInstitutionsToCollectionIfMissing<Type extends Pick<ICrbDataSubmittingInstitutions, 'id'>>(
    crbDataSubmittingInstitutionsCollection: Type[],
    ...crbDataSubmittingInstitutionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbDataSubmittingInstitutions: Type[] = crbDataSubmittingInstitutionsToCheck.filter(isPresent);
    if (crbDataSubmittingInstitutions.length > 0) {
      const crbDataSubmittingInstitutionsCollectionIdentifiers = crbDataSubmittingInstitutionsCollection.map(
        crbDataSubmittingInstitutionsItem => this.getCrbDataSubmittingInstitutionsIdentifier(crbDataSubmittingInstitutionsItem)!
      );
      const crbDataSubmittingInstitutionsToAdd = crbDataSubmittingInstitutions.filter(crbDataSubmittingInstitutionsItem => {
        const crbDataSubmittingInstitutionsIdentifier = this.getCrbDataSubmittingInstitutionsIdentifier(crbDataSubmittingInstitutionsItem);
        if (crbDataSubmittingInstitutionsCollectionIdentifiers.includes(crbDataSubmittingInstitutionsIdentifier)) {
          return false;
        }
        crbDataSubmittingInstitutionsCollectionIdentifiers.push(crbDataSubmittingInstitutionsIdentifier);
        return true;
      });
      return [...crbDataSubmittingInstitutionsToAdd, ...crbDataSubmittingInstitutionsCollection];
    }
    return crbDataSubmittingInstitutionsCollection;
  }
}
