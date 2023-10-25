///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IBouncedChequeCategories, NewBouncedChequeCategories } from '../bounced-cheque-categories.model';

export type PartialUpdateBouncedChequeCategories = Partial<IBouncedChequeCategories> & Pick<IBouncedChequeCategories, 'id'>;

export type EntityResponseType = HttpResponse<IBouncedChequeCategories>;
export type EntityArrayResponseType = HttpResponse<IBouncedChequeCategories[]>;

@Injectable({ providedIn: 'root' })
export class BouncedChequeCategoriesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bounced-cheque-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/bounced-cheque-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(bouncedChequeCategories: NewBouncedChequeCategories): Observable<EntityResponseType> {
    return this.http.post<IBouncedChequeCategories>(this.resourceUrl, bouncedChequeCategories, { observe: 'response' });
  }

  update(bouncedChequeCategories: IBouncedChequeCategories): Observable<EntityResponseType> {
    return this.http.put<IBouncedChequeCategories>(
      `${this.resourceUrl}/${this.getBouncedChequeCategoriesIdentifier(bouncedChequeCategories)}`,
      bouncedChequeCategories,
      { observe: 'response' }
    );
  }

  partialUpdate(bouncedChequeCategories: PartialUpdateBouncedChequeCategories): Observable<EntityResponseType> {
    return this.http.patch<IBouncedChequeCategories>(
      `${this.resourceUrl}/${this.getBouncedChequeCategoriesIdentifier(bouncedChequeCategories)}`,
      bouncedChequeCategories,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBouncedChequeCategories>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBouncedChequeCategories[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBouncedChequeCategories[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getBouncedChequeCategoriesIdentifier(bouncedChequeCategories: Pick<IBouncedChequeCategories, 'id'>): number {
    return bouncedChequeCategories.id;
  }

  compareBouncedChequeCategories(
    o1: Pick<IBouncedChequeCategories, 'id'> | null,
    o2: Pick<IBouncedChequeCategories, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getBouncedChequeCategoriesIdentifier(o1) === this.getBouncedChequeCategoriesIdentifier(o2) : o1 === o2;
  }

  addBouncedChequeCategoriesToCollectionIfMissing<Type extends Pick<IBouncedChequeCategories, 'id'>>(
    bouncedChequeCategoriesCollection: Type[],
    ...bouncedChequeCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bouncedChequeCategories: Type[] = bouncedChequeCategoriesToCheck.filter(isPresent);
    if (bouncedChequeCategories.length > 0) {
      const bouncedChequeCategoriesCollectionIdentifiers = bouncedChequeCategoriesCollection.map(
        bouncedChequeCategoriesItem => this.getBouncedChequeCategoriesIdentifier(bouncedChequeCategoriesItem)!
      );
      const bouncedChequeCategoriesToAdd = bouncedChequeCategories.filter(bouncedChequeCategoriesItem => {
        const bouncedChequeCategoriesIdentifier = this.getBouncedChequeCategoriesIdentifier(bouncedChequeCategoriesItem);
        if (bouncedChequeCategoriesCollectionIdentifiers.includes(bouncedChequeCategoriesIdentifier)) {
          return false;
        }
        bouncedChequeCategoriesCollectionIdentifiers.push(bouncedChequeCategoriesIdentifier);
        return true;
      });
      return [...bouncedChequeCategoriesToAdd, ...bouncedChequeCategoriesCollection];
    }
    return bouncedChequeCategoriesCollection;
  }
}
