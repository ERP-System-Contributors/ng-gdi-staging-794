import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICardCategoryType, NewCardCategoryType } from '../card-category-type.model';

export type PartialUpdateCardCategoryType = Partial<ICardCategoryType> & Pick<ICardCategoryType, 'id'>;

export type EntityResponseType = HttpResponse<ICardCategoryType>;
export type EntityArrayResponseType = HttpResponse<ICardCategoryType[]>;

@Injectable({ providedIn: 'root' })
export class CardCategoryTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-category-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-category-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardCategoryType: NewCardCategoryType): Observable<EntityResponseType> {
    return this.http.post<ICardCategoryType>(this.resourceUrl, cardCategoryType, { observe: 'response' });
  }

  update(cardCategoryType: ICardCategoryType): Observable<EntityResponseType> {
    return this.http.put<ICardCategoryType>(
      `${this.resourceUrl}/${this.getCardCategoryTypeIdentifier(cardCategoryType)}`,
      cardCategoryType,
      { observe: 'response' }
    );
  }

  partialUpdate(cardCategoryType: PartialUpdateCardCategoryType): Observable<EntityResponseType> {
    return this.http.patch<ICardCategoryType>(
      `${this.resourceUrl}/${this.getCardCategoryTypeIdentifier(cardCategoryType)}`,
      cardCategoryType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardCategoryType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardCategoryType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardCategoryType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardCategoryTypeIdentifier(cardCategoryType: Pick<ICardCategoryType, 'id'>): number {
    return cardCategoryType.id;
  }

  compareCardCategoryType(o1: Pick<ICardCategoryType, 'id'> | null, o2: Pick<ICardCategoryType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardCategoryTypeIdentifier(o1) === this.getCardCategoryTypeIdentifier(o2) : o1 === o2;
  }

  addCardCategoryTypeToCollectionIfMissing<Type extends Pick<ICardCategoryType, 'id'>>(
    cardCategoryTypeCollection: Type[],
    ...cardCategoryTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardCategoryTypes: Type[] = cardCategoryTypesToCheck.filter(isPresent);
    if (cardCategoryTypes.length > 0) {
      const cardCategoryTypeCollectionIdentifiers = cardCategoryTypeCollection.map(
        cardCategoryTypeItem => this.getCardCategoryTypeIdentifier(cardCategoryTypeItem)!
      );
      const cardCategoryTypesToAdd = cardCategoryTypes.filter(cardCategoryTypeItem => {
        const cardCategoryTypeIdentifier = this.getCardCategoryTypeIdentifier(cardCategoryTypeItem);
        if (cardCategoryTypeCollectionIdentifiers.includes(cardCategoryTypeIdentifier)) {
          return false;
        }
        cardCategoryTypeCollectionIdentifiers.push(cardCategoryTypeIdentifier);
        return true;
      });
      return [...cardCategoryTypesToAdd, ...cardCategoryTypeCollection];
    }
    return cardCategoryTypeCollection;
  }
}
