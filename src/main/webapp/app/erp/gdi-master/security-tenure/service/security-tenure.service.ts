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
import { ISecurityTenure, NewSecurityTenure } from '../security-tenure.model';

export type PartialUpdateSecurityTenure = Partial<ISecurityTenure> & Pick<ISecurityTenure, 'id'>;

export type EntityResponseType = HttpResponse<ISecurityTenure>;
export type EntityArrayResponseType = HttpResponse<ISecurityTenure[]>;

@Injectable({ providedIn: 'root' })
export class SecurityTenureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/security-tenures');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/security-tenures');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(securityTenure: NewSecurityTenure): Observable<EntityResponseType> {
    return this.http.post<ISecurityTenure>(this.resourceUrl, securityTenure, { observe: 'response' });
  }

  update(securityTenure: ISecurityTenure): Observable<EntityResponseType> {
    return this.http.put<ISecurityTenure>(`${this.resourceUrl}/${this.getSecurityTenureIdentifier(securityTenure)}`, securityTenure, {
      observe: 'response',
    });
  }

  partialUpdate(securityTenure: PartialUpdateSecurityTenure): Observable<EntityResponseType> {
    return this.http.patch<ISecurityTenure>(`${this.resourceUrl}/${this.getSecurityTenureIdentifier(securityTenure)}`, securityTenure, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISecurityTenure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityTenure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityTenure[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSecurityTenureIdentifier(securityTenure: Pick<ISecurityTenure, 'id'>): number {
    return securityTenure.id;
  }

  compareSecurityTenure(o1: Pick<ISecurityTenure, 'id'> | null, o2: Pick<ISecurityTenure, 'id'> | null): boolean {
    return o1 && o2 ? this.getSecurityTenureIdentifier(o1) === this.getSecurityTenureIdentifier(o2) : o1 === o2;
  }

  addSecurityTenureToCollectionIfMissing<Type extends Pick<ISecurityTenure, 'id'>>(
    securityTenureCollection: Type[],
    ...securityTenuresToCheck: (Type | null | undefined)[]
  ): Type[] {
    const securityTenures: Type[] = securityTenuresToCheck.filter(isPresent);
    if (securityTenures.length > 0) {
      const securityTenureCollectionIdentifiers = securityTenureCollection.map(
        securityTenureItem => this.getSecurityTenureIdentifier(securityTenureItem)!
      );
      const securityTenuresToAdd = securityTenures.filter(securityTenureItem => {
        const securityTenureIdentifier = this.getSecurityTenureIdentifier(securityTenureItem);
        if (securityTenureCollectionIdentifiers.includes(securityTenureIdentifier)) {
          return false;
        }
        securityTenureCollectionIdentifiers.push(securityTenureIdentifier);
        return true;
      });
      return [...securityTenuresToAdd, ...securityTenureCollection];
    }
    return securityTenureCollection;
  }
}
