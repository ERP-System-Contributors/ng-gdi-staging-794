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
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITerminalsAndPOS, NewTerminalsAndPOS } from '../terminals-and-pos.model';

export type PartialUpdateTerminalsAndPOS = Partial<ITerminalsAndPOS> & Pick<ITerminalsAndPOS, 'id'>;

type RestOf<T extends ITerminalsAndPOS | NewTerminalsAndPOS> = Omit<T, 'reportingDate' | 'terminalOpeningDate' | 'terminalClosureDate'> & {
  reportingDate?: string | null;
  terminalOpeningDate?: string | null;
  terminalClosureDate?: string | null;
};

export type RestTerminalsAndPOS = RestOf<ITerminalsAndPOS>;

export type NewRestTerminalsAndPOS = RestOf<NewTerminalsAndPOS>;

export type PartialUpdateRestTerminalsAndPOS = RestOf<PartialUpdateTerminalsAndPOS>;

export type EntityResponseType = HttpResponse<ITerminalsAndPOS>;
export type EntityArrayResponseType = HttpResponse<ITerminalsAndPOS[]>;

@Injectable({ providedIn: 'root' })
export class TerminalsAndPOSService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terminals-and-pos');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/terminals-and-pos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(terminalsAndPOS: NewTerminalsAndPOS): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(terminalsAndPOS);
    return this.http
      .post<RestTerminalsAndPOS>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(terminalsAndPOS: ITerminalsAndPOS): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(terminalsAndPOS);
    return this.http
      .put<RestTerminalsAndPOS>(`${this.resourceUrl}/${this.getTerminalsAndPOSIdentifier(terminalsAndPOS)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(terminalsAndPOS: PartialUpdateTerminalsAndPOS): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(terminalsAndPOS);
    return this.http
      .patch<RestTerminalsAndPOS>(`${this.resourceUrl}/${this.getTerminalsAndPOSIdentifier(terminalsAndPOS)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTerminalsAndPOS>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTerminalsAndPOS[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTerminalsAndPOS[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getTerminalsAndPOSIdentifier(terminalsAndPOS: Pick<ITerminalsAndPOS, 'id'>): number {
    return terminalsAndPOS.id;
  }

  compareTerminalsAndPOS(o1: Pick<ITerminalsAndPOS, 'id'> | null, o2: Pick<ITerminalsAndPOS, 'id'> | null): boolean {
    return o1 && o2 ? this.getTerminalsAndPOSIdentifier(o1) === this.getTerminalsAndPOSIdentifier(o2) : o1 === o2;
  }

  addTerminalsAndPOSToCollectionIfMissing<Type extends Pick<ITerminalsAndPOS, 'id'>>(
    terminalsAndPOSCollection: Type[],
    ...terminalsAndPOSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const terminalsAndPOS: Type[] = terminalsAndPOSToCheck.filter(isPresent);
    if (terminalsAndPOS.length > 0) {
      const terminalsAndPOSCollectionIdentifiers = terminalsAndPOSCollection.map(
        terminalsAndPOSItem => this.getTerminalsAndPOSIdentifier(terminalsAndPOSItem)!
      );
      const terminalsAndPOSToAdd = terminalsAndPOS.filter(terminalsAndPOSItem => {
        const terminalsAndPOSIdentifier = this.getTerminalsAndPOSIdentifier(terminalsAndPOSItem);
        if (terminalsAndPOSCollectionIdentifiers.includes(terminalsAndPOSIdentifier)) {
          return false;
        }
        terminalsAndPOSCollectionIdentifiers.push(terminalsAndPOSIdentifier);
        return true;
      });
      return [...terminalsAndPOSToAdd, ...terminalsAndPOSCollection];
    }
    return terminalsAndPOSCollection;
  }

  protected convertDateFromClient<T extends ITerminalsAndPOS | NewTerminalsAndPOS | PartialUpdateTerminalsAndPOS>(
    terminalsAndPOS: T
  ): RestOf<T> {
    return {
      ...terminalsAndPOS,
      reportingDate: terminalsAndPOS.reportingDate?.format(DATE_FORMAT) ?? null,
      terminalOpeningDate: terminalsAndPOS.terminalOpeningDate?.format(DATE_FORMAT) ?? null,
      terminalClosureDate: terminalsAndPOS.terminalClosureDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTerminalsAndPOS: RestTerminalsAndPOS): ITerminalsAndPOS {
    return {
      ...restTerminalsAndPOS,
      reportingDate: restTerminalsAndPOS.reportingDate ? dayjs(restTerminalsAndPOS.reportingDate) : undefined,
      terminalOpeningDate: restTerminalsAndPOS.terminalOpeningDate ? dayjs(restTerminalsAndPOS.terminalOpeningDate) : undefined,
      terminalClosureDate: restTerminalsAndPOS.terminalClosureDate ? dayjs(restTerminalsAndPOS.terminalClosureDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTerminalsAndPOS>): HttpResponse<ITerminalsAndPOS> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTerminalsAndPOS[]>): HttpResponse<ITerminalsAndPOS[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
