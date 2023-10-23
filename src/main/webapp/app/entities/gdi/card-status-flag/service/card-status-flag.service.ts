import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICardStatusFlag, NewCardStatusFlag } from '../card-status-flag.model';

export type PartialUpdateCardStatusFlag = Partial<ICardStatusFlag> & Pick<ICardStatusFlag, 'id'>;

export type EntityResponseType = HttpResponse<ICardStatusFlag>;
export type EntityArrayResponseType = HttpResponse<ICardStatusFlag[]>;

@Injectable({ providedIn: 'root' })
export class CardStatusFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-status-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-status-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardStatusFlag: NewCardStatusFlag): Observable<EntityResponseType> {
    return this.http.post<ICardStatusFlag>(this.resourceUrl, cardStatusFlag, { observe: 'response' });
  }

  update(cardStatusFlag: ICardStatusFlag): Observable<EntityResponseType> {
    return this.http.put<ICardStatusFlag>(`${this.resourceUrl}/${this.getCardStatusFlagIdentifier(cardStatusFlag)}`, cardStatusFlag, {
      observe: 'response',
    });
  }

  partialUpdate(cardStatusFlag: PartialUpdateCardStatusFlag): Observable<EntityResponseType> {
    return this.http.patch<ICardStatusFlag>(`${this.resourceUrl}/${this.getCardStatusFlagIdentifier(cardStatusFlag)}`, cardStatusFlag, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardStatusFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardStatusFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardStatusFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardStatusFlagIdentifier(cardStatusFlag: Pick<ICardStatusFlag, 'id'>): number {
    return cardStatusFlag.id;
  }

  compareCardStatusFlag(o1: Pick<ICardStatusFlag, 'id'> | null, o2: Pick<ICardStatusFlag, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardStatusFlagIdentifier(o1) === this.getCardStatusFlagIdentifier(o2) : o1 === o2;
  }

  addCardStatusFlagToCollectionIfMissing<Type extends Pick<ICardStatusFlag, 'id'>>(
    cardStatusFlagCollection: Type[],
    ...cardStatusFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardStatusFlags: Type[] = cardStatusFlagsToCheck.filter(isPresent);
    if (cardStatusFlags.length > 0) {
      const cardStatusFlagCollectionIdentifiers = cardStatusFlagCollection.map(
        cardStatusFlagItem => this.getCardStatusFlagIdentifier(cardStatusFlagItem)!
      );
      const cardStatusFlagsToAdd = cardStatusFlags.filter(cardStatusFlagItem => {
        const cardStatusFlagIdentifier = this.getCardStatusFlagIdentifier(cardStatusFlagItem);
        if (cardStatusFlagCollectionIdentifiers.includes(cardStatusFlagIdentifier)) {
          return false;
        }
        cardStatusFlagCollectionIdentifiers.push(cardStatusFlagIdentifier);
        return true;
      });
      return [...cardStatusFlagsToAdd, ...cardStatusFlagCollection];
    }
    return cardStatusFlagCollection;
  }
}
