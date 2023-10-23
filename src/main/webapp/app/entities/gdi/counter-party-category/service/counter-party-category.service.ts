import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICounterPartyCategory, NewCounterPartyCategory } from '../counter-party-category.model';

export type PartialUpdateCounterPartyCategory = Partial<ICounterPartyCategory> & Pick<ICounterPartyCategory, 'id'>;

export type EntityResponseType = HttpResponse<ICounterPartyCategory>;
export type EntityArrayResponseType = HttpResponse<ICounterPartyCategory[]>;

@Injectable({ providedIn: 'root' })
export class CounterPartyCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/counter-party-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/counter-party-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(counterPartyCategory: NewCounterPartyCategory): Observable<EntityResponseType> {
    return this.http.post<ICounterPartyCategory>(this.resourceUrl, counterPartyCategory, { observe: 'response' });
  }

  update(counterPartyCategory: ICounterPartyCategory): Observable<EntityResponseType> {
    return this.http.put<ICounterPartyCategory>(
      `${this.resourceUrl}/${this.getCounterPartyCategoryIdentifier(counterPartyCategory)}`,
      counterPartyCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(counterPartyCategory: PartialUpdateCounterPartyCategory): Observable<EntityResponseType> {
    return this.http.patch<ICounterPartyCategory>(
      `${this.resourceUrl}/${this.getCounterPartyCategoryIdentifier(counterPartyCategory)}`,
      counterPartyCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICounterPartyCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounterPartyCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounterPartyCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCounterPartyCategoryIdentifier(counterPartyCategory: Pick<ICounterPartyCategory, 'id'>): number {
    return counterPartyCategory.id;
  }

  compareCounterPartyCategory(o1: Pick<ICounterPartyCategory, 'id'> | null, o2: Pick<ICounterPartyCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getCounterPartyCategoryIdentifier(o1) === this.getCounterPartyCategoryIdentifier(o2) : o1 === o2;
  }

  addCounterPartyCategoryToCollectionIfMissing<Type extends Pick<ICounterPartyCategory, 'id'>>(
    counterPartyCategoryCollection: Type[],
    ...counterPartyCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const counterPartyCategories: Type[] = counterPartyCategoriesToCheck.filter(isPresent);
    if (counterPartyCategories.length > 0) {
      const counterPartyCategoryCollectionIdentifiers = counterPartyCategoryCollection.map(
        counterPartyCategoryItem => this.getCounterPartyCategoryIdentifier(counterPartyCategoryItem)!
      );
      const counterPartyCategoriesToAdd = counterPartyCategories.filter(counterPartyCategoryItem => {
        const counterPartyCategoryIdentifier = this.getCounterPartyCategoryIdentifier(counterPartyCategoryItem);
        if (counterPartyCategoryCollectionIdentifiers.includes(counterPartyCategoryIdentifier)) {
          return false;
        }
        counterPartyCategoryCollectionIdentifiers.push(counterPartyCategoryIdentifier);
        return true;
      });
      return [...counterPartyCategoriesToAdd, ...counterPartyCategoryCollection];
    }
    return counterPartyCategoryCollection;
  }
}
