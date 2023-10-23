import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbReportRequestReasons, NewCrbReportRequestReasons } from '../crb-report-request-reasons.model';

export type PartialUpdateCrbReportRequestReasons = Partial<ICrbReportRequestReasons> & Pick<ICrbReportRequestReasons, 'id'>;

export type EntityResponseType = HttpResponse<ICrbReportRequestReasons>;
export type EntityArrayResponseType = HttpResponse<ICrbReportRequestReasons[]>;

@Injectable({ providedIn: 'root' })
export class CrbReportRequestReasonsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-report-request-reasons');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-report-request-reasons');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbReportRequestReasons: NewCrbReportRequestReasons): Observable<EntityResponseType> {
    return this.http.post<ICrbReportRequestReasons>(this.resourceUrl, crbReportRequestReasons, { observe: 'response' });
  }

  update(crbReportRequestReasons: ICrbReportRequestReasons): Observable<EntityResponseType> {
    return this.http.put<ICrbReportRequestReasons>(
      `${this.resourceUrl}/${this.getCrbReportRequestReasonsIdentifier(crbReportRequestReasons)}`,
      crbReportRequestReasons,
      { observe: 'response' }
    );
  }

  partialUpdate(crbReportRequestReasons: PartialUpdateCrbReportRequestReasons): Observable<EntityResponseType> {
    return this.http.patch<ICrbReportRequestReasons>(
      `${this.resourceUrl}/${this.getCrbReportRequestReasonsIdentifier(crbReportRequestReasons)}`,
      crbReportRequestReasons,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbReportRequestReasons>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbReportRequestReasons[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbReportRequestReasons[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbReportRequestReasonsIdentifier(crbReportRequestReasons: Pick<ICrbReportRequestReasons, 'id'>): number {
    return crbReportRequestReasons.id;
  }

  compareCrbReportRequestReasons(
    o1: Pick<ICrbReportRequestReasons, 'id'> | null,
    o2: Pick<ICrbReportRequestReasons, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCrbReportRequestReasonsIdentifier(o1) === this.getCrbReportRequestReasonsIdentifier(o2) : o1 === o2;
  }

  addCrbReportRequestReasonsToCollectionIfMissing<Type extends Pick<ICrbReportRequestReasons, 'id'>>(
    crbReportRequestReasonsCollection: Type[],
    ...crbReportRequestReasonsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbReportRequestReasons: Type[] = crbReportRequestReasonsToCheck.filter(isPresent);
    if (crbReportRequestReasons.length > 0) {
      const crbReportRequestReasonsCollectionIdentifiers = crbReportRequestReasonsCollection.map(
        crbReportRequestReasonsItem => this.getCrbReportRequestReasonsIdentifier(crbReportRequestReasonsItem)!
      );
      const crbReportRequestReasonsToAdd = crbReportRequestReasons.filter(crbReportRequestReasonsItem => {
        const crbReportRequestReasonsIdentifier = this.getCrbReportRequestReasonsIdentifier(crbReportRequestReasonsItem);
        if (crbReportRequestReasonsCollectionIdentifiers.includes(crbReportRequestReasonsIdentifier)) {
          return false;
        }
        crbReportRequestReasonsCollectionIdentifiers.push(crbReportRequestReasonsIdentifier);
        return true;
      });
      return [...crbReportRequestReasonsToAdd, ...crbReportRequestReasonsCollection];
    }
    return crbReportRequestReasonsCollection;
  }
}
