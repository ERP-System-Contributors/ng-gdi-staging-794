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
import { IInstitutionStatusType, NewInstitutionStatusType } from '../institution-status-type.model';

export type PartialUpdateInstitutionStatusType = Partial<IInstitutionStatusType> & Pick<IInstitutionStatusType, 'id'>;

export type EntityResponseType = HttpResponse<IInstitutionStatusType>;
export type EntityArrayResponseType = HttpResponse<IInstitutionStatusType[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionStatusTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institution-status-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/institution-status-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(institutionStatusType: NewInstitutionStatusType): Observable<EntityResponseType> {
    return this.http.post<IInstitutionStatusType>(this.resourceUrl, institutionStatusType, { observe: 'response' });
  }

  update(institutionStatusType: IInstitutionStatusType): Observable<EntityResponseType> {
    return this.http.put<IInstitutionStatusType>(
      `${this.resourceUrl}/${this.getInstitutionStatusTypeIdentifier(institutionStatusType)}`,
      institutionStatusType,
      { observe: 'response' }
    );
  }

  partialUpdate(institutionStatusType: PartialUpdateInstitutionStatusType): Observable<EntityResponseType> {
    return this.http.patch<IInstitutionStatusType>(
      `${this.resourceUrl}/${this.getInstitutionStatusTypeIdentifier(institutionStatusType)}`,
      institutionStatusType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstitutionStatusType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionStatusType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionStatusType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getInstitutionStatusTypeIdentifier(institutionStatusType: Pick<IInstitutionStatusType, 'id'>): number {
    return institutionStatusType.id;
  }

  compareInstitutionStatusType(o1: Pick<IInstitutionStatusType, 'id'> | null, o2: Pick<IInstitutionStatusType, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstitutionStatusTypeIdentifier(o1) === this.getInstitutionStatusTypeIdentifier(o2) : o1 === o2;
  }

  addInstitutionStatusTypeToCollectionIfMissing<Type extends Pick<IInstitutionStatusType, 'id'>>(
    institutionStatusTypeCollection: Type[],
    ...institutionStatusTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const institutionStatusTypes: Type[] = institutionStatusTypesToCheck.filter(isPresent);
    if (institutionStatusTypes.length > 0) {
      const institutionStatusTypeCollectionIdentifiers = institutionStatusTypeCollection.map(
        institutionStatusTypeItem => this.getInstitutionStatusTypeIdentifier(institutionStatusTypeItem)!
      );
      const institutionStatusTypesToAdd = institutionStatusTypes.filter(institutionStatusTypeItem => {
        const institutionStatusTypeIdentifier = this.getInstitutionStatusTypeIdentifier(institutionStatusTypeItem);
        if (institutionStatusTypeCollectionIdentifiers.includes(institutionStatusTypeIdentifier)) {
          return false;
        }
        institutionStatusTypeCollectionIdentifiers.push(institutionStatusTypeIdentifier);
        return true;
      });
      return [...institutionStatusTypesToAdd, ...institutionStatusTypeCollection];
    }
    return institutionStatusTypeCollection;
  }
}
