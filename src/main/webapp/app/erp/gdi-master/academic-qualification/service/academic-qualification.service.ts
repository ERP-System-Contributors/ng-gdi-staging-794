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
import { IAcademicQualification, NewAcademicQualification } from '../academic-qualification.model';

export type PartialUpdateAcademicQualification = Partial<IAcademicQualification> & Pick<IAcademicQualification, 'id'>;

export type EntityResponseType = HttpResponse<IAcademicQualification>;
export type EntityArrayResponseType = HttpResponse<IAcademicQualification[]>;

@Injectable({ providedIn: 'root' })
export class AcademicQualificationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/academic-qualifications');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/academic-qualifications');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(academicQualification: NewAcademicQualification): Observable<EntityResponseType> {
    return this.http.post<IAcademicQualification>(this.resourceUrl, academicQualification, { observe: 'response' });
  }

  update(academicQualification: IAcademicQualification): Observable<EntityResponseType> {
    return this.http.put<IAcademicQualification>(
      `${this.resourceUrl}/${this.getAcademicQualificationIdentifier(academicQualification)}`,
      academicQualification,
      { observe: 'response' }
    );
  }

  partialUpdate(academicQualification: PartialUpdateAcademicQualification): Observable<EntityResponseType> {
    return this.http.patch<IAcademicQualification>(
      `${this.resourceUrl}/${this.getAcademicQualificationIdentifier(academicQualification)}`,
      academicQualification,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAcademicQualification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcademicQualification[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcademicQualification[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAcademicQualificationIdentifier(academicQualification: Pick<IAcademicQualification, 'id'>): number {
    return academicQualification.id;
  }

  compareAcademicQualification(o1: Pick<IAcademicQualification, 'id'> | null, o2: Pick<IAcademicQualification, 'id'> | null): boolean {
    return o1 && o2 ? this.getAcademicQualificationIdentifier(o1) === this.getAcademicQualificationIdentifier(o2) : o1 === o2;
  }

  addAcademicQualificationToCollectionIfMissing<Type extends Pick<IAcademicQualification, 'id'>>(
    academicQualificationCollection: Type[],
    ...academicQualificationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const academicQualifications: Type[] = academicQualificationsToCheck.filter(isPresent);
    if (academicQualifications.length > 0) {
      const academicQualificationCollectionIdentifiers = academicQualificationCollection.map(
        academicQualificationItem => this.getAcademicQualificationIdentifier(academicQualificationItem)!
      );
      const academicQualificationsToAdd = academicQualifications.filter(academicQualificationItem => {
        const academicQualificationIdentifier = this.getAcademicQualificationIdentifier(academicQualificationItem);
        if (academicQualificationCollectionIdentifiers.includes(academicQualificationIdentifier)) {
          return false;
        }
        academicQualificationCollectionIdentifiers.push(academicQualificationIdentifier);
        return true;
      });
      return [...academicQualificationsToAdd, ...academicQualificationCollection];
    }
    return academicQualificationCollection;
  }
}
