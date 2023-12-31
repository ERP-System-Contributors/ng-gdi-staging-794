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
import { ISystemModule, NewSystemModule } from '../system-module.model';

export type PartialUpdateSystemModule = Partial<ISystemModule> & Pick<ISystemModule, 'id'>;

export type EntityResponseType = HttpResponse<ISystemModule>;
export type EntityArrayResponseType = HttpResponse<ISystemModule[]>;

@Injectable({ providedIn: 'root' })
export class SystemModuleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/system-modules');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/system-modules');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(systemModule: NewSystemModule): Observable<EntityResponseType> {
    return this.http.post<ISystemModule>(this.resourceUrl, systemModule, { observe: 'response' });
  }

  update(systemModule: ISystemModule): Observable<EntityResponseType> {
    return this.http.put<ISystemModule>(`${this.resourceUrl}/${this.getSystemModuleIdentifier(systemModule)}`, systemModule, {
      observe: 'response',
    });
  }

  partialUpdate(systemModule: PartialUpdateSystemModule): Observable<EntityResponseType> {
    return this.http.patch<ISystemModule>(`${this.resourceUrl}/${this.getSystemModuleIdentifier(systemModule)}`, systemModule, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISystemModule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISystemModule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISystemModule[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSystemModuleIdentifier(systemModule: Pick<ISystemModule, 'id'>): number {
    return systemModule.id;
  }

  compareSystemModule(o1: Pick<ISystemModule, 'id'> | null, o2: Pick<ISystemModule, 'id'> | null): boolean {
    return o1 && o2 ? this.getSystemModuleIdentifier(o1) === this.getSystemModuleIdentifier(o2) : o1 === o2;
  }

  addSystemModuleToCollectionIfMissing<Type extends Pick<ISystemModule, 'id'>>(
    systemModuleCollection: Type[],
    ...systemModulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const systemModules: Type[] = systemModulesToCheck.filter(isPresent);
    if (systemModules.length > 0) {
      const systemModuleCollectionIdentifiers = systemModuleCollection.map(
        systemModuleItem => this.getSystemModuleIdentifier(systemModuleItem)!
      );
      const systemModulesToAdd = systemModules.filter(systemModuleItem => {
        const systemModuleIdentifier = this.getSystemModuleIdentifier(systemModuleItem);
        if (systemModuleCollectionIdentifiers.includes(systemModuleIdentifier)) {
          return false;
        }
        systemModuleCollectionIdentifiers.push(systemModuleIdentifier);
        return true;
      });
      return [...systemModulesToAdd, ...systemModuleCollection];
    }
    return systemModuleCollection;
  }
}
