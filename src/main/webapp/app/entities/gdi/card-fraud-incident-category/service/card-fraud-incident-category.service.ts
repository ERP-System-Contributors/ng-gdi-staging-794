import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICardFraudIncidentCategory, NewCardFraudIncidentCategory } from '../card-fraud-incident-category.model';

export type PartialUpdateCardFraudIncidentCategory = Partial<ICardFraudIncidentCategory> & Pick<ICardFraudIncidentCategory, 'id'>;

export type EntityResponseType = HttpResponse<ICardFraudIncidentCategory>;
export type EntityArrayResponseType = HttpResponse<ICardFraudIncidentCategory[]>;

@Injectable({ providedIn: 'root' })
export class CardFraudIncidentCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-fraud-incident-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-fraud-incident-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardFraudIncidentCategory: NewCardFraudIncidentCategory): Observable<EntityResponseType> {
    return this.http.post<ICardFraudIncidentCategory>(this.resourceUrl, cardFraudIncidentCategory, { observe: 'response' });
  }

  update(cardFraudIncidentCategory: ICardFraudIncidentCategory): Observable<EntityResponseType> {
    return this.http.put<ICardFraudIncidentCategory>(
      `${this.resourceUrl}/${this.getCardFraudIncidentCategoryIdentifier(cardFraudIncidentCategory)}`,
      cardFraudIncidentCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(cardFraudIncidentCategory: PartialUpdateCardFraudIncidentCategory): Observable<EntityResponseType> {
    return this.http.patch<ICardFraudIncidentCategory>(
      `${this.resourceUrl}/${this.getCardFraudIncidentCategoryIdentifier(cardFraudIncidentCategory)}`,
      cardFraudIncidentCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardFraudIncidentCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardFraudIncidentCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardFraudIncidentCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardFraudIncidentCategoryIdentifier(cardFraudIncidentCategory: Pick<ICardFraudIncidentCategory, 'id'>): number {
    return cardFraudIncidentCategory.id;
  }

  compareCardFraudIncidentCategory(
    o1: Pick<ICardFraudIncidentCategory, 'id'> | null,
    o2: Pick<ICardFraudIncidentCategory, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCardFraudIncidentCategoryIdentifier(o1) === this.getCardFraudIncidentCategoryIdentifier(o2) : o1 === o2;
  }

  addCardFraudIncidentCategoryToCollectionIfMissing<Type extends Pick<ICardFraudIncidentCategory, 'id'>>(
    cardFraudIncidentCategoryCollection: Type[],
    ...cardFraudIncidentCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardFraudIncidentCategories: Type[] = cardFraudIncidentCategoriesToCheck.filter(isPresent);
    if (cardFraudIncidentCategories.length > 0) {
      const cardFraudIncidentCategoryCollectionIdentifiers = cardFraudIncidentCategoryCollection.map(
        cardFraudIncidentCategoryItem => this.getCardFraudIncidentCategoryIdentifier(cardFraudIncidentCategoryItem)!
      );
      const cardFraudIncidentCategoriesToAdd = cardFraudIncidentCategories.filter(cardFraudIncidentCategoryItem => {
        const cardFraudIncidentCategoryIdentifier = this.getCardFraudIncidentCategoryIdentifier(cardFraudIncidentCategoryItem);
        if (cardFraudIncidentCategoryCollectionIdentifiers.includes(cardFraudIncidentCategoryIdentifier)) {
          return false;
        }
        cardFraudIncidentCategoryCollectionIdentifiers.push(cardFraudIncidentCategoryIdentifier);
        return true;
      });
      return [...cardFraudIncidentCategoriesToAdd, ...cardFraudIncidentCategoryCollection];
    }
    return cardFraudIncidentCategoryCollection;
  }
}
