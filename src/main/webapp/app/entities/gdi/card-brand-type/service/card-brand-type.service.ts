import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICardBrandType, NewCardBrandType } from '../card-brand-type.model';

export type PartialUpdateCardBrandType = Partial<ICardBrandType> & Pick<ICardBrandType, 'id'>;

export type EntityResponseType = HttpResponse<ICardBrandType>;
export type EntityArrayResponseType = HttpResponse<ICardBrandType[]>;

@Injectable({ providedIn: 'root' })
export class CardBrandTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-brand-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-brand-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardBrandType: NewCardBrandType): Observable<EntityResponseType> {
    return this.http.post<ICardBrandType>(this.resourceUrl, cardBrandType, { observe: 'response' });
  }

  update(cardBrandType: ICardBrandType): Observable<EntityResponseType> {
    return this.http.put<ICardBrandType>(`${this.resourceUrl}/${this.getCardBrandTypeIdentifier(cardBrandType)}`, cardBrandType, {
      observe: 'response',
    });
  }

  partialUpdate(cardBrandType: PartialUpdateCardBrandType): Observable<EntityResponseType> {
    return this.http.patch<ICardBrandType>(`${this.resourceUrl}/${this.getCardBrandTypeIdentifier(cardBrandType)}`, cardBrandType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardBrandType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardBrandType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardBrandType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardBrandTypeIdentifier(cardBrandType: Pick<ICardBrandType, 'id'>): number {
    return cardBrandType.id;
  }

  compareCardBrandType(o1: Pick<ICardBrandType, 'id'> | null, o2: Pick<ICardBrandType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardBrandTypeIdentifier(o1) === this.getCardBrandTypeIdentifier(o2) : o1 === o2;
  }

  addCardBrandTypeToCollectionIfMissing<Type extends Pick<ICardBrandType, 'id'>>(
    cardBrandTypeCollection: Type[],
    ...cardBrandTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardBrandTypes: Type[] = cardBrandTypesToCheck.filter(isPresent);
    if (cardBrandTypes.length > 0) {
      const cardBrandTypeCollectionIdentifiers = cardBrandTypeCollection.map(
        cardBrandTypeItem => this.getCardBrandTypeIdentifier(cardBrandTypeItem)!
      );
      const cardBrandTypesToAdd = cardBrandTypes.filter(cardBrandTypeItem => {
        const cardBrandTypeIdentifier = this.getCardBrandTypeIdentifier(cardBrandTypeItem);
        if (cardBrandTypeCollectionIdentifiers.includes(cardBrandTypeIdentifier)) {
          return false;
        }
        cardBrandTypeCollectionIdentifiers.push(cardBrandTypeIdentifier);
        return true;
      });
      return [...cardBrandTypesToAdd, ...cardBrandTypeCollection];
    }
    return cardBrandTypeCollection;
  }
}
