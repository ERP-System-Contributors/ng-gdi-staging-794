import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMoratoriumItem, NewMoratoriumItem } from '../moratorium-item.model';

export type PartialUpdateMoratoriumItem = Partial<IMoratoriumItem> & Pick<IMoratoriumItem, 'id'>;

export type EntityResponseType = HttpResponse<IMoratoriumItem>;
export type EntityArrayResponseType = HttpResponse<IMoratoriumItem[]>;

@Injectable({ providedIn: 'root' })
export class MoratoriumItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/moratorium-items');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/moratorium-items');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(moratoriumItem: NewMoratoriumItem): Observable<EntityResponseType> {
    return this.http.post<IMoratoriumItem>(this.resourceUrl, moratoriumItem, { observe: 'response' });
  }

  update(moratoriumItem: IMoratoriumItem): Observable<EntityResponseType> {
    return this.http.put<IMoratoriumItem>(`${this.resourceUrl}/${this.getMoratoriumItemIdentifier(moratoriumItem)}`, moratoriumItem, {
      observe: 'response',
    });
  }

  partialUpdate(moratoriumItem: PartialUpdateMoratoriumItem): Observable<EntityResponseType> {
    return this.http.patch<IMoratoriumItem>(`${this.resourceUrl}/${this.getMoratoriumItemIdentifier(moratoriumItem)}`, moratoriumItem, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMoratoriumItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMoratoriumItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMoratoriumItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getMoratoriumItemIdentifier(moratoriumItem: Pick<IMoratoriumItem, 'id'>): number {
    return moratoriumItem.id;
  }

  compareMoratoriumItem(o1: Pick<IMoratoriumItem, 'id'> | null, o2: Pick<IMoratoriumItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getMoratoriumItemIdentifier(o1) === this.getMoratoriumItemIdentifier(o2) : o1 === o2;
  }

  addMoratoriumItemToCollectionIfMissing<Type extends Pick<IMoratoriumItem, 'id'>>(
    moratoriumItemCollection: Type[],
    ...moratoriumItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const moratoriumItems: Type[] = moratoriumItemsToCheck.filter(isPresent);
    if (moratoriumItems.length > 0) {
      const moratoriumItemCollectionIdentifiers = moratoriumItemCollection.map(
        moratoriumItemItem => this.getMoratoriumItemIdentifier(moratoriumItemItem)!
      );
      const moratoriumItemsToAdd = moratoriumItems.filter(moratoriumItemItem => {
        const moratoriumItemIdentifier = this.getMoratoriumItemIdentifier(moratoriumItemItem);
        if (moratoriumItemCollectionIdentifiers.includes(moratoriumItemIdentifier)) {
          return false;
        }
        moratoriumItemCollectionIdentifiers.push(moratoriumItemIdentifier);
        return true;
      });
      return [...moratoriumItemsToAdd, ...moratoriumItemCollection];
    }
    return moratoriumItemCollection;
  }
}
