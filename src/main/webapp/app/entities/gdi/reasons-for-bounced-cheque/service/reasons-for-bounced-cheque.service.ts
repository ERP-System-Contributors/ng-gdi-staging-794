import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IReasonsForBouncedCheque, NewReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';

export type PartialUpdateReasonsForBouncedCheque = Partial<IReasonsForBouncedCheque> & Pick<IReasonsForBouncedCheque, 'id'>;

export type EntityResponseType = HttpResponse<IReasonsForBouncedCheque>;
export type EntityArrayResponseType = HttpResponse<IReasonsForBouncedCheque[]>;

@Injectable({ providedIn: 'root' })
export class ReasonsForBouncedChequeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reasons-for-bounced-cheques');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/reasons-for-bounced-cheques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reasonsForBouncedCheque: NewReasonsForBouncedCheque): Observable<EntityResponseType> {
    return this.http.post<IReasonsForBouncedCheque>(this.resourceUrl, reasonsForBouncedCheque, { observe: 'response' });
  }

  update(reasonsForBouncedCheque: IReasonsForBouncedCheque): Observable<EntityResponseType> {
    return this.http.put<IReasonsForBouncedCheque>(
      `${this.resourceUrl}/${this.getReasonsForBouncedChequeIdentifier(reasonsForBouncedCheque)}`,
      reasonsForBouncedCheque,
      { observe: 'response' }
    );
  }

  partialUpdate(reasonsForBouncedCheque: PartialUpdateReasonsForBouncedCheque): Observable<EntityResponseType> {
    return this.http.patch<IReasonsForBouncedCheque>(
      `${this.resourceUrl}/${this.getReasonsForBouncedChequeIdentifier(reasonsForBouncedCheque)}`,
      reasonsForBouncedCheque,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReasonsForBouncedCheque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReasonsForBouncedCheque[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReasonsForBouncedCheque[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getReasonsForBouncedChequeIdentifier(reasonsForBouncedCheque: Pick<IReasonsForBouncedCheque, 'id'>): number {
    return reasonsForBouncedCheque.id;
  }

  compareReasonsForBouncedCheque(
    o1: Pick<IReasonsForBouncedCheque, 'id'> | null,
    o2: Pick<IReasonsForBouncedCheque, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getReasonsForBouncedChequeIdentifier(o1) === this.getReasonsForBouncedChequeIdentifier(o2) : o1 === o2;
  }

  addReasonsForBouncedChequeToCollectionIfMissing<Type extends Pick<IReasonsForBouncedCheque, 'id'>>(
    reasonsForBouncedChequeCollection: Type[],
    ...reasonsForBouncedChequesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reasonsForBouncedCheques: Type[] = reasonsForBouncedChequesToCheck.filter(isPresent);
    if (reasonsForBouncedCheques.length > 0) {
      const reasonsForBouncedChequeCollectionIdentifiers = reasonsForBouncedChequeCollection.map(
        reasonsForBouncedChequeItem => this.getReasonsForBouncedChequeIdentifier(reasonsForBouncedChequeItem)!
      );
      const reasonsForBouncedChequesToAdd = reasonsForBouncedCheques.filter(reasonsForBouncedChequeItem => {
        const reasonsForBouncedChequeIdentifier = this.getReasonsForBouncedChequeIdentifier(reasonsForBouncedChequeItem);
        if (reasonsForBouncedChequeCollectionIdentifiers.includes(reasonsForBouncedChequeIdentifier)) {
          return false;
        }
        reasonsForBouncedChequeCollectionIdentifiers.push(reasonsForBouncedChequeIdentifier);
        return true;
      });
      return [...reasonsForBouncedChequesToAdd, ...reasonsForBouncedChequeCollection];
    }
    return reasonsForBouncedChequeCollection;
  }
}
