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
import { IProcessStatus, NewProcessStatus } from '../process-status.model';

export type PartialUpdateProcessStatus = Partial<IProcessStatus> & Pick<IProcessStatus, 'id'>;

export type EntityResponseType = HttpResponse<IProcessStatus>;
export type EntityArrayResponseType = HttpResponse<IProcessStatus[]>;

@Injectable({ providedIn: 'root' })
export class ProcessStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/process-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/process-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(processStatus: NewProcessStatus): Observable<EntityResponseType> {
    return this.http.post<IProcessStatus>(this.resourceUrl, processStatus, { observe: 'response' });
  }

  update(processStatus: IProcessStatus): Observable<EntityResponseType> {
    return this.http.put<IProcessStatus>(`${this.resourceUrl}/${this.getProcessStatusIdentifier(processStatus)}`, processStatus, {
      observe: 'response',
    });
  }

  partialUpdate(processStatus: PartialUpdateProcessStatus): Observable<EntityResponseType> {
    return this.http.patch<IProcessStatus>(`${this.resourceUrl}/${this.getProcessStatusIdentifier(processStatus)}`, processStatus, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcessStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcessStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcessStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getProcessStatusIdentifier(processStatus: Pick<IProcessStatus, 'id'>): number {
    return processStatus.id;
  }

  compareProcessStatus(o1: Pick<IProcessStatus, 'id'> | null, o2: Pick<IProcessStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getProcessStatusIdentifier(o1) === this.getProcessStatusIdentifier(o2) : o1 === o2;
  }

  addProcessStatusToCollectionIfMissing<Type extends Pick<IProcessStatus, 'id'>>(
    processStatusCollection: Type[],
    ...processStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const processStatuses: Type[] = processStatusesToCheck.filter(isPresent);
    if (processStatuses.length > 0) {
      const processStatusCollectionIdentifiers = processStatusCollection.map(
        processStatusItem => this.getProcessStatusIdentifier(processStatusItem)!
      );
      const processStatusesToAdd = processStatuses.filter(processStatusItem => {
        const processStatusIdentifier = this.getProcessStatusIdentifier(processStatusItem);
        if (processStatusCollectionIdentifiers.includes(processStatusIdentifier)) {
          return false;
        }
        processStatusCollectionIdentifiers.push(processStatusIdentifier);
        return true;
      });
      return [...processStatusesToAdd, ...processStatusCollection];
    }
    return processStatusCollection;
  }
}
