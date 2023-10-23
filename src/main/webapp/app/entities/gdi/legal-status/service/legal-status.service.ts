import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILegalStatus, NewLegalStatus } from '../legal-status.model';

export type PartialUpdateLegalStatus = Partial<ILegalStatus> & Pick<ILegalStatus, 'id'>;

export type EntityResponseType = HttpResponse<ILegalStatus>;
export type EntityArrayResponseType = HttpResponse<ILegalStatus[]>;

@Injectable({ providedIn: 'root' })
export class LegalStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/legal-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/legal-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(legalStatus: NewLegalStatus): Observable<EntityResponseType> {
    return this.http.post<ILegalStatus>(this.resourceUrl, legalStatus, { observe: 'response' });
  }

  update(legalStatus: ILegalStatus): Observable<EntityResponseType> {
    return this.http.put<ILegalStatus>(`${this.resourceUrl}/${this.getLegalStatusIdentifier(legalStatus)}`, legalStatus, {
      observe: 'response',
    });
  }

  partialUpdate(legalStatus: PartialUpdateLegalStatus): Observable<EntityResponseType> {
    return this.http.patch<ILegalStatus>(`${this.resourceUrl}/${this.getLegalStatusIdentifier(legalStatus)}`, legalStatus, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILegalStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILegalStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILegalStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLegalStatusIdentifier(legalStatus: Pick<ILegalStatus, 'id'>): number {
    return legalStatus.id;
  }

  compareLegalStatus(o1: Pick<ILegalStatus, 'id'> | null, o2: Pick<ILegalStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getLegalStatusIdentifier(o1) === this.getLegalStatusIdentifier(o2) : o1 === o2;
  }

  addLegalStatusToCollectionIfMissing<Type extends Pick<ILegalStatus, 'id'>>(
    legalStatusCollection: Type[],
    ...legalStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const legalStatuses: Type[] = legalStatusesToCheck.filter(isPresent);
    if (legalStatuses.length > 0) {
      const legalStatusCollectionIdentifiers = legalStatusCollection.map(
        legalStatusItem => this.getLegalStatusIdentifier(legalStatusItem)!
      );
      const legalStatusesToAdd = legalStatuses.filter(legalStatusItem => {
        const legalStatusIdentifier = this.getLegalStatusIdentifier(legalStatusItem);
        if (legalStatusCollectionIdentifiers.includes(legalStatusIdentifier)) {
          return false;
        }
        legalStatusCollectionIdentifiers.push(legalStatusIdentifier);
        return true;
      });
      return [...legalStatusesToAdd, ...legalStatusCollection];
    }
    return legalStatusCollection;
  }
}
