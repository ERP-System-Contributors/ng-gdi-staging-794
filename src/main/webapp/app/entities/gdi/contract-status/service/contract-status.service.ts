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
import { IContractStatus, NewContractStatus } from '../contract-status.model';

export type PartialUpdateContractStatus = Partial<IContractStatus> & Pick<IContractStatus, 'id'>;

export type EntityResponseType = HttpResponse<IContractStatus>;
export type EntityArrayResponseType = HttpResponse<IContractStatus[]>;

@Injectable({ providedIn: 'root' })
export class ContractStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contract-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/contract-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contractStatus: NewContractStatus): Observable<EntityResponseType> {
    return this.http.post<IContractStatus>(this.resourceUrl, contractStatus, { observe: 'response' });
  }

  update(contractStatus: IContractStatus): Observable<EntityResponseType> {
    return this.http.put<IContractStatus>(`${this.resourceUrl}/${this.getContractStatusIdentifier(contractStatus)}`, contractStatus, {
      observe: 'response',
    });
  }

  partialUpdate(contractStatus: PartialUpdateContractStatus): Observable<EntityResponseType> {
    return this.http.patch<IContractStatus>(`${this.resourceUrl}/${this.getContractStatusIdentifier(contractStatus)}`, contractStatus, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContractStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContractStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContractStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getContractStatusIdentifier(contractStatus: Pick<IContractStatus, 'id'>): number {
    return contractStatus.id;
  }

  compareContractStatus(o1: Pick<IContractStatus, 'id'> | null, o2: Pick<IContractStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getContractStatusIdentifier(o1) === this.getContractStatusIdentifier(o2) : o1 === o2;
  }

  addContractStatusToCollectionIfMissing<Type extends Pick<IContractStatus, 'id'>>(
    contractStatusCollection: Type[],
    ...contractStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contractStatuses: Type[] = contractStatusesToCheck.filter(isPresent);
    if (contractStatuses.length > 0) {
      const contractStatusCollectionIdentifiers = contractStatusCollection.map(
        contractStatusItem => this.getContractStatusIdentifier(contractStatusItem)!
      );
      const contractStatusesToAdd = contractStatuses.filter(contractStatusItem => {
        const contractStatusIdentifier = this.getContractStatusIdentifier(contractStatusItem);
        if (contractStatusCollectionIdentifiers.includes(contractStatusIdentifier)) {
          return false;
        }
        contractStatusCollectionIdentifiers.push(contractStatusIdentifier);
        return true;
      });
      return [...contractStatusesToAdd, ...contractStatusCollection];
    }
    return contractStatusCollection;
  }
}
