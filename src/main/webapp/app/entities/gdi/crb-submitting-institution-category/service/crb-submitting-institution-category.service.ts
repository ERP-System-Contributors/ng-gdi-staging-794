import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbSubmittingInstitutionCategory, NewCrbSubmittingInstitutionCategory } from '../crb-submitting-institution-category.model';

export type PartialUpdateCrbSubmittingInstitutionCategory = Partial<ICrbSubmittingInstitutionCategory> &
  Pick<ICrbSubmittingInstitutionCategory, 'id'>;

export type EntityResponseType = HttpResponse<ICrbSubmittingInstitutionCategory>;
export type EntityArrayResponseType = HttpResponse<ICrbSubmittingInstitutionCategory[]>;

@Injectable({ providedIn: 'root' })
export class CrbSubmittingInstitutionCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-submitting-institution-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-submitting-institution-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbSubmittingInstitutionCategory: NewCrbSubmittingInstitutionCategory): Observable<EntityResponseType> {
    return this.http.post<ICrbSubmittingInstitutionCategory>(this.resourceUrl, crbSubmittingInstitutionCategory, { observe: 'response' });
  }

  update(crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory): Observable<EntityResponseType> {
    return this.http.put<ICrbSubmittingInstitutionCategory>(
      `${this.resourceUrl}/${this.getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategory)}`,
      crbSubmittingInstitutionCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(crbSubmittingInstitutionCategory: PartialUpdateCrbSubmittingInstitutionCategory): Observable<EntityResponseType> {
    return this.http.patch<ICrbSubmittingInstitutionCategory>(
      `${this.resourceUrl}/${this.getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategory)}`,
      crbSubmittingInstitutionCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbSubmittingInstitutionCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbSubmittingInstitutionCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbSubmittingInstitutionCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategory: Pick<ICrbSubmittingInstitutionCategory, 'id'>): number {
    return crbSubmittingInstitutionCategory.id;
  }

  compareCrbSubmittingInstitutionCategory(
    o1: Pick<ICrbSubmittingInstitutionCategory, 'id'> | null,
    o2: Pick<ICrbSubmittingInstitutionCategory, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getCrbSubmittingInstitutionCategoryIdentifier(o1) === this.getCrbSubmittingInstitutionCategoryIdentifier(o2)
      : o1 === o2;
  }

  addCrbSubmittingInstitutionCategoryToCollectionIfMissing<Type extends Pick<ICrbSubmittingInstitutionCategory, 'id'>>(
    crbSubmittingInstitutionCategoryCollection: Type[],
    ...crbSubmittingInstitutionCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbSubmittingInstitutionCategories: Type[] = crbSubmittingInstitutionCategoriesToCheck.filter(isPresent);
    if (crbSubmittingInstitutionCategories.length > 0) {
      const crbSubmittingInstitutionCategoryCollectionIdentifiers = crbSubmittingInstitutionCategoryCollection.map(
        crbSubmittingInstitutionCategoryItem => this.getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategoryItem)!
      );
      const crbSubmittingInstitutionCategoriesToAdd = crbSubmittingInstitutionCategories.filter(crbSubmittingInstitutionCategoryItem => {
        const crbSubmittingInstitutionCategoryIdentifier = this.getCrbSubmittingInstitutionCategoryIdentifier(
          crbSubmittingInstitutionCategoryItem
        );
        if (crbSubmittingInstitutionCategoryCollectionIdentifiers.includes(crbSubmittingInstitutionCategoryIdentifier)) {
          return false;
        }
        crbSubmittingInstitutionCategoryCollectionIdentifiers.push(crbSubmittingInstitutionCategoryIdentifier);
        return true;
      });
      return [...crbSubmittingInstitutionCategoriesToAdd, ...crbSubmittingInstitutionCategoryCollection];
    }
    return crbSubmittingInstitutionCategoryCollection;
  }
}
