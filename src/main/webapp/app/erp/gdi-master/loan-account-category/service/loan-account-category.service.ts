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
import { ILoanAccountCategory, NewLoanAccountCategory } from '../loan-account-category.model';

export type PartialUpdateLoanAccountCategory = Partial<ILoanAccountCategory> & Pick<ILoanAccountCategory, 'id'>;

export type EntityResponseType = HttpResponse<ILoanAccountCategory>;
export type EntityArrayResponseType = HttpResponse<ILoanAccountCategory[]>;

@Injectable({ providedIn: 'root' })
export class LoanAccountCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-account-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-account-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanAccountCategory: NewLoanAccountCategory): Observable<EntityResponseType> {
    return this.http.post<ILoanAccountCategory>(this.resourceUrl, loanAccountCategory, { observe: 'response' });
  }

  update(loanAccountCategory: ILoanAccountCategory): Observable<EntityResponseType> {
    return this.http.put<ILoanAccountCategory>(
      `${this.resourceUrl}/${this.getLoanAccountCategoryIdentifier(loanAccountCategory)}`,
      loanAccountCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(loanAccountCategory: PartialUpdateLoanAccountCategory): Observable<EntityResponseType> {
    return this.http.patch<ILoanAccountCategory>(
      `${this.resourceUrl}/${this.getLoanAccountCategoryIdentifier(loanAccountCategory)}`,
      loanAccountCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanAccountCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanAccountCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanAccountCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanAccountCategoryIdentifier(loanAccountCategory: Pick<ILoanAccountCategory, 'id'>): number {
    return loanAccountCategory.id;
  }

  compareLoanAccountCategory(o1: Pick<ILoanAccountCategory, 'id'> | null, o2: Pick<ILoanAccountCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanAccountCategoryIdentifier(o1) === this.getLoanAccountCategoryIdentifier(o2) : o1 === o2;
  }

  addLoanAccountCategoryToCollectionIfMissing<Type extends Pick<ILoanAccountCategory, 'id'>>(
    loanAccountCategoryCollection: Type[],
    ...loanAccountCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanAccountCategories: Type[] = loanAccountCategoriesToCheck.filter(isPresent);
    if (loanAccountCategories.length > 0) {
      const loanAccountCategoryCollectionIdentifiers = loanAccountCategoryCollection.map(
        loanAccountCategoryItem => this.getLoanAccountCategoryIdentifier(loanAccountCategoryItem)!
      );
      const loanAccountCategoriesToAdd = loanAccountCategories.filter(loanAccountCategoryItem => {
        const loanAccountCategoryIdentifier = this.getLoanAccountCategoryIdentifier(loanAccountCategoryItem);
        if (loanAccountCategoryCollectionIdentifiers.includes(loanAccountCategoryIdentifier)) {
          return false;
        }
        loanAccountCategoryCollectionIdentifiers.push(loanAccountCategoryIdentifier);
        return true;
      });
      return [...loanAccountCategoriesToAdd, ...loanAccountCategoryCollection];
    }
    return loanAccountCategoryCollection;
  }
}
