import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IStaffCurrentEmploymentStatus, NewStaffCurrentEmploymentStatus } from '../staff-current-employment-status.model';

export type PartialUpdateStaffCurrentEmploymentStatus = Partial<IStaffCurrentEmploymentStatus> & Pick<IStaffCurrentEmploymentStatus, 'id'>;

export type EntityResponseType = HttpResponse<IStaffCurrentEmploymentStatus>;
export type EntityArrayResponseType = HttpResponse<IStaffCurrentEmploymentStatus[]>;

@Injectable({ providedIn: 'root' })
export class StaffCurrentEmploymentStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/staff-current-employment-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/staff-current-employment-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(staffCurrentEmploymentStatus: NewStaffCurrentEmploymentStatus): Observable<EntityResponseType> {
    return this.http.post<IStaffCurrentEmploymentStatus>(this.resourceUrl, staffCurrentEmploymentStatus, { observe: 'response' });
  }

  update(staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus): Observable<EntityResponseType> {
    return this.http.put<IStaffCurrentEmploymentStatus>(
      `${this.resourceUrl}/${this.getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatus)}`,
      staffCurrentEmploymentStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(staffCurrentEmploymentStatus: PartialUpdateStaffCurrentEmploymentStatus): Observable<EntityResponseType> {
    return this.http.patch<IStaffCurrentEmploymentStatus>(
      `${this.resourceUrl}/${this.getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatus)}`,
      staffCurrentEmploymentStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStaffCurrentEmploymentStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffCurrentEmploymentStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffCurrentEmploymentStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatus: Pick<IStaffCurrentEmploymentStatus, 'id'>): number {
    return staffCurrentEmploymentStatus.id;
  }

  compareStaffCurrentEmploymentStatus(
    o1: Pick<IStaffCurrentEmploymentStatus, 'id'> | null,
    o2: Pick<IStaffCurrentEmploymentStatus, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getStaffCurrentEmploymentStatusIdentifier(o1) === this.getStaffCurrentEmploymentStatusIdentifier(o2) : o1 === o2;
  }

  addStaffCurrentEmploymentStatusToCollectionIfMissing<Type extends Pick<IStaffCurrentEmploymentStatus, 'id'>>(
    staffCurrentEmploymentStatusCollection: Type[],
    ...staffCurrentEmploymentStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const staffCurrentEmploymentStatuses: Type[] = staffCurrentEmploymentStatusesToCheck.filter(isPresent);
    if (staffCurrentEmploymentStatuses.length > 0) {
      const staffCurrentEmploymentStatusCollectionIdentifiers = staffCurrentEmploymentStatusCollection.map(
        staffCurrentEmploymentStatusItem => this.getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatusItem)!
      );
      const staffCurrentEmploymentStatusesToAdd = staffCurrentEmploymentStatuses.filter(staffCurrentEmploymentStatusItem => {
        const staffCurrentEmploymentStatusIdentifier = this.getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatusItem);
        if (staffCurrentEmploymentStatusCollectionIdentifiers.includes(staffCurrentEmploymentStatusIdentifier)) {
          return false;
        }
        staffCurrentEmploymentStatusCollectionIdentifiers.push(staffCurrentEmploymentStatusIdentifier);
        return true;
      });
      return [...staffCurrentEmploymentStatusesToAdd, ...staffCurrentEmploymentStatusCollection];
    }
    return staffCurrentEmploymentStatusCollection;
  }
}
