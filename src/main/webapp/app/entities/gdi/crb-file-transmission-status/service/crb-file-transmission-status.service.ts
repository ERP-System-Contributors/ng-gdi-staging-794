import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbFileTransmissionStatus, NewCrbFileTransmissionStatus } from '../crb-file-transmission-status.model';

export type PartialUpdateCrbFileTransmissionStatus = Partial<ICrbFileTransmissionStatus> & Pick<ICrbFileTransmissionStatus, 'id'>;

export type EntityResponseType = HttpResponse<ICrbFileTransmissionStatus>;
export type EntityArrayResponseType = HttpResponse<ICrbFileTransmissionStatus[]>;

@Injectable({ providedIn: 'root' })
export class CrbFileTransmissionStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-file-transmission-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-file-transmission-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbFileTransmissionStatus: NewCrbFileTransmissionStatus): Observable<EntityResponseType> {
    return this.http.post<ICrbFileTransmissionStatus>(this.resourceUrl, crbFileTransmissionStatus, { observe: 'response' });
  }

  update(crbFileTransmissionStatus: ICrbFileTransmissionStatus): Observable<EntityResponseType> {
    return this.http.put<ICrbFileTransmissionStatus>(
      `${this.resourceUrl}/${this.getCrbFileTransmissionStatusIdentifier(crbFileTransmissionStatus)}`,
      crbFileTransmissionStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(crbFileTransmissionStatus: PartialUpdateCrbFileTransmissionStatus): Observable<EntityResponseType> {
    return this.http.patch<ICrbFileTransmissionStatus>(
      `${this.resourceUrl}/${this.getCrbFileTransmissionStatusIdentifier(crbFileTransmissionStatus)}`,
      crbFileTransmissionStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbFileTransmissionStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbFileTransmissionStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbFileTransmissionStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbFileTransmissionStatusIdentifier(crbFileTransmissionStatus: Pick<ICrbFileTransmissionStatus, 'id'>): number {
    return crbFileTransmissionStatus.id;
  }

  compareCrbFileTransmissionStatus(
    o1: Pick<ICrbFileTransmissionStatus, 'id'> | null,
    o2: Pick<ICrbFileTransmissionStatus, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCrbFileTransmissionStatusIdentifier(o1) === this.getCrbFileTransmissionStatusIdentifier(o2) : o1 === o2;
  }

  addCrbFileTransmissionStatusToCollectionIfMissing<Type extends Pick<ICrbFileTransmissionStatus, 'id'>>(
    crbFileTransmissionStatusCollection: Type[],
    ...crbFileTransmissionStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbFileTransmissionStatuses: Type[] = crbFileTransmissionStatusesToCheck.filter(isPresent);
    if (crbFileTransmissionStatuses.length > 0) {
      const crbFileTransmissionStatusCollectionIdentifiers = crbFileTransmissionStatusCollection.map(
        crbFileTransmissionStatusItem => this.getCrbFileTransmissionStatusIdentifier(crbFileTransmissionStatusItem)!
      );
      const crbFileTransmissionStatusesToAdd = crbFileTransmissionStatuses.filter(crbFileTransmissionStatusItem => {
        const crbFileTransmissionStatusIdentifier = this.getCrbFileTransmissionStatusIdentifier(crbFileTransmissionStatusItem);
        if (crbFileTransmissionStatusCollectionIdentifiers.includes(crbFileTransmissionStatusIdentifier)) {
          return false;
        }
        crbFileTransmissionStatusCollectionIdentifiers.push(crbFileTransmissionStatusIdentifier);
        return true;
      });
      return [...crbFileTransmissionStatusesToAdd, ...crbFileTransmissionStatusCollection];
    }
    return crbFileTransmissionStatusCollection;
  }
}
