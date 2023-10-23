import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IStaffRoleType, NewStaffRoleType } from '../staff-role-type.model';

export type PartialUpdateStaffRoleType = Partial<IStaffRoleType> & Pick<IStaffRoleType, 'id'>;

export type EntityResponseType = HttpResponse<IStaffRoleType>;
export type EntityArrayResponseType = HttpResponse<IStaffRoleType[]>;

@Injectable({ providedIn: 'root' })
export class StaffRoleTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/staff-role-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/staff-role-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(staffRoleType: NewStaffRoleType): Observable<EntityResponseType> {
    return this.http.post<IStaffRoleType>(this.resourceUrl, staffRoleType, { observe: 'response' });
  }

  update(staffRoleType: IStaffRoleType): Observable<EntityResponseType> {
    return this.http.put<IStaffRoleType>(`${this.resourceUrl}/${this.getStaffRoleTypeIdentifier(staffRoleType)}`, staffRoleType, {
      observe: 'response',
    });
  }

  partialUpdate(staffRoleType: PartialUpdateStaffRoleType): Observable<EntityResponseType> {
    return this.http.patch<IStaffRoleType>(`${this.resourceUrl}/${this.getStaffRoleTypeIdentifier(staffRoleType)}`, staffRoleType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStaffRoleType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffRoleType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffRoleType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getStaffRoleTypeIdentifier(staffRoleType: Pick<IStaffRoleType, 'id'>): number {
    return staffRoleType.id;
  }

  compareStaffRoleType(o1: Pick<IStaffRoleType, 'id'> | null, o2: Pick<IStaffRoleType, 'id'> | null): boolean {
    return o1 && o2 ? this.getStaffRoleTypeIdentifier(o1) === this.getStaffRoleTypeIdentifier(o2) : o1 === o2;
  }

  addStaffRoleTypeToCollectionIfMissing<Type extends Pick<IStaffRoleType, 'id'>>(
    staffRoleTypeCollection: Type[],
    ...staffRoleTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const staffRoleTypes: Type[] = staffRoleTypesToCheck.filter(isPresent);
    if (staffRoleTypes.length > 0) {
      const staffRoleTypeCollectionIdentifiers = staffRoleTypeCollection.map(
        staffRoleTypeItem => this.getStaffRoleTypeIdentifier(staffRoleTypeItem)!
      );
      const staffRoleTypesToAdd = staffRoleTypes.filter(staffRoleTypeItem => {
        const staffRoleTypeIdentifier = this.getStaffRoleTypeIdentifier(staffRoleTypeItem);
        if (staffRoleTypeCollectionIdentifiers.includes(staffRoleTypeIdentifier)) {
          return false;
        }
        staffRoleTypeCollectionIdentifiers.push(staffRoleTypeIdentifier);
        return true;
      });
      return [...staffRoleTypesToAdd, ...staffRoleTypeCollection];
    }
    return staffRoleTypeCollection;
  }
}
