import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDepartmentType, NewDepartmentType } from '../department-type.model';

export type PartialUpdateDepartmentType = Partial<IDepartmentType> & Pick<IDepartmentType, 'id'>;

export type EntityResponseType = HttpResponse<IDepartmentType>;
export type EntityArrayResponseType = HttpResponse<IDepartmentType[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/department-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/department-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(departmentType: NewDepartmentType): Observable<EntityResponseType> {
    return this.http.post<IDepartmentType>(this.resourceUrl, departmentType, { observe: 'response' });
  }

  update(departmentType: IDepartmentType): Observable<EntityResponseType> {
    return this.http.put<IDepartmentType>(`${this.resourceUrl}/${this.getDepartmentTypeIdentifier(departmentType)}`, departmentType, {
      observe: 'response',
    });
  }

  partialUpdate(departmentType: PartialUpdateDepartmentType): Observable<EntityResponseType> {
    return this.http.patch<IDepartmentType>(`${this.resourceUrl}/${this.getDepartmentTypeIdentifier(departmentType)}`, departmentType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getDepartmentTypeIdentifier(departmentType: Pick<IDepartmentType, 'id'>): number {
    return departmentType.id;
  }

  compareDepartmentType(o1: Pick<IDepartmentType, 'id'> | null, o2: Pick<IDepartmentType, 'id'> | null): boolean {
    return o1 && o2 ? this.getDepartmentTypeIdentifier(o1) === this.getDepartmentTypeIdentifier(o2) : o1 === o2;
  }

  addDepartmentTypeToCollectionIfMissing<Type extends Pick<IDepartmentType, 'id'>>(
    departmentTypeCollection: Type[],
    ...departmentTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const departmentTypes: Type[] = departmentTypesToCheck.filter(isPresent);
    if (departmentTypes.length > 0) {
      const departmentTypeCollectionIdentifiers = departmentTypeCollection.map(
        departmentTypeItem => this.getDepartmentTypeIdentifier(departmentTypeItem)!
      );
      const departmentTypesToAdd = departmentTypes.filter(departmentTypeItem => {
        const departmentTypeIdentifier = this.getDepartmentTypeIdentifier(departmentTypeItem);
        if (departmentTypeCollectionIdentifiers.includes(departmentTypeIdentifier)) {
          return false;
        }
        departmentTypeCollectionIdentifiers.push(departmentTypeIdentifier);
        return true;
      });
      return [...departmentTypesToAdd, ...departmentTypeCollection];
    }
    return departmentTypeCollection;
  }
}
