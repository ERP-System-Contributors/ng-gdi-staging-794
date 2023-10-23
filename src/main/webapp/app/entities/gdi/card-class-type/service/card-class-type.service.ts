import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICardClassType, NewCardClassType } from '../card-class-type.model';

export type PartialUpdateCardClassType = Partial<ICardClassType> & Pick<ICardClassType, 'id'>;

export type EntityResponseType = HttpResponse<ICardClassType>;
export type EntityArrayResponseType = HttpResponse<ICardClassType[]>;

@Injectable({ providedIn: 'root' })
export class CardClassTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-class-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-class-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardClassType: NewCardClassType): Observable<EntityResponseType> {
    return this.http.post<ICardClassType>(this.resourceUrl, cardClassType, { observe: 'response' });
  }

  update(cardClassType: ICardClassType): Observable<EntityResponseType> {
    return this.http.put<ICardClassType>(`${this.resourceUrl}/${this.getCardClassTypeIdentifier(cardClassType)}`, cardClassType, {
      observe: 'response',
    });
  }

  partialUpdate(cardClassType: PartialUpdateCardClassType): Observable<EntityResponseType> {
    return this.http.patch<ICardClassType>(`${this.resourceUrl}/${this.getCardClassTypeIdentifier(cardClassType)}`, cardClassType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardClassType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardClassType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardClassType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardClassTypeIdentifier(cardClassType: Pick<ICardClassType, 'id'>): number {
    return cardClassType.id;
  }

  compareCardClassType(o1: Pick<ICardClassType, 'id'> | null, o2: Pick<ICardClassType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardClassTypeIdentifier(o1) === this.getCardClassTypeIdentifier(o2) : o1 === o2;
  }

  addCardClassTypeToCollectionIfMissing<Type extends Pick<ICardClassType, 'id'>>(
    cardClassTypeCollection: Type[],
    ...cardClassTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardClassTypes: Type[] = cardClassTypesToCheck.filter(isPresent);
    if (cardClassTypes.length > 0) {
      const cardClassTypeCollectionIdentifiers = cardClassTypeCollection.map(
        cardClassTypeItem => this.getCardClassTypeIdentifier(cardClassTypeItem)!
      );
      const cardClassTypesToAdd = cardClassTypes.filter(cardClassTypeItem => {
        const cardClassTypeIdentifier = this.getCardClassTypeIdentifier(cardClassTypeItem);
        if (cardClassTypeCollectionIdentifiers.includes(cardClassTypeIdentifier)) {
          return false;
        }
        cardClassTypeCollectionIdentifiers.push(cardClassTypeIdentifier);
        return true;
      });
      return [...cardClassTypesToAdd, ...cardClassTypeCollection];
    }
    return cardClassTypeCollection;
  }
}
