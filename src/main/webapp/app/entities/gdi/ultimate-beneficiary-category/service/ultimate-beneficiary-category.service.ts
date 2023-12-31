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
import { IUltimateBeneficiaryCategory, NewUltimateBeneficiaryCategory } from '../ultimate-beneficiary-category.model';

export type PartialUpdateUltimateBeneficiaryCategory = Partial<IUltimateBeneficiaryCategory> & Pick<IUltimateBeneficiaryCategory, 'id'>;

export type EntityResponseType = HttpResponse<IUltimateBeneficiaryCategory>;
export type EntityArrayResponseType = HttpResponse<IUltimateBeneficiaryCategory[]>;

@Injectable({ providedIn: 'root' })
export class UltimateBeneficiaryCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ultimate-beneficiary-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/ultimate-beneficiary-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ultimateBeneficiaryCategory: NewUltimateBeneficiaryCategory): Observable<EntityResponseType> {
    return this.http.post<IUltimateBeneficiaryCategory>(this.resourceUrl, ultimateBeneficiaryCategory, { observe: 'response' });
  }

  update(ultimateBeneficiaryCategory: IUltimateBeneficiaryCategory): Observable<EntityResponseType> {
    return this.http.put<IUltimateBeneficiaryCategory>(
      `${this.resourceUrl}/${this.getUltimateBeneficiaryCategoryIdentifier(ultimateBeneficiaryCategory)}`,
      ultimateBeneficiaryCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(ultimateBeneficiaryCategory: PartialUpdateUltimateBeneficiaryCategory): Observable<EntityResponseType> {
    return this.http.patch<IUltimateBeneficiaryCategory>(
      `${this.resourceUrl}/${this.getUltimateBeneficiaryCategoryIdentifier(ultimateBeneficiaryCategory)}`,
      ultimateBeneficiaryCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUltimateBeneficiaryCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUltimateBeneficiaryCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUltimateBeneficiaryCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getUltimateBeneficiaryCategoryIdentifier(ultimateBeneficiaryCategory: Pick<IUltimateBeneficiaryCategory, 'id'>): number {
    return ultimateBeneficiaryCategory.id;
  }

  compareUltimateBeneficiaryCategory(
    o1: Pick<IUltimateBeneficiaryCategory, 'id'> | null,
    o2: Pick<IUltimateBeneficiaryCategory, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getUltimateBeneficiaryCategoryIdentifier(o1) === this.getUltimateBeneficiaryCategoryIdentifier(o2) : o1 === o2;
  }

  addUltimateBeneficiaryCategoryToCollectionIfMissing<Type extends Pick<IUltimateBeneficiaryCategory, 'id'>>(
    ultimateBeneficiaryCategoryCollection: Type[],
    ...ultimateBeneficiaryCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ultimateBeneficiaryCategories: Type[] = ultimateBeneficiaryCategoriesToCheck.filter(isPresent);
    if (ultimateBeneficiaryCategories.length > 0) {
      const ultimateBeneficiaryCategoryCollectionIdentifiers = ultimateBeneficiaryCategoryCollection.map(
        ultimateBeneficiaryCategoryItem => this.getUltimateBeneficiaryCategoryIdentifier(ultimateBeneficiaryCategoryItem)!
      );
      const ultimateBeneficiaryCategoriesToAdd = ultimateBeneficiaryCategories.filter(ultimateBeneficiaryCategoryItem => {
        const ultimateBeneficiaryCategoryIdentifier = this.getUltimateBeneficiaryCategoryIdentifier(ultimateBeneficiaryCategoryItem);
        if (ultimateBeneficiaryCategoryCollectionIdentifiers.includes(ultimateBeneficiaryCategoryIdentifier)) {
          return false;
        }
        ultimateBeneficiaryCategoryCollectionIdentifiers.push(ultimateBeneficiaryCategoryIdentifier);
        return true;
      });
      return [...ultimateBeneficiaryCategoriesToAdd, ...ultimateBeneficiaryCategoryCollection];
    }
    return ultimateBeneficiaryCategoryCollection;
  }
}
