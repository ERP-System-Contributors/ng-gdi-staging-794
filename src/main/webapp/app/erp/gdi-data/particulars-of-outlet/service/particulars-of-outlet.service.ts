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
import { IParticularsOfOutlet, NewParticularsOfOutlet } from '../particulars-of-outlet.model';

export type PartialUpdateParticularsOfOutlet = Partial<IParticularsOfOutlet> & Pick<IParticularsOfOutlet, 'id'>;

type RestOf<T extends IParticularsOfOutlet | NewParticularsOfOutlet> = Omit<
  T,
  'businessReportingDate' | 'cbkApprovalDate' | 'outletOpeningDate' | 'outletClosureDate'
> & {
  businessReportingDate?: string | null;
  cbkApprovalDate?: string | null;
  outletOpeningDate?: string | null;
  outletClosureDate?: string | null;
};

export type RestParticularsOfOutlet = RestOf<IParticularsOfOutlet>;

export type NewRestParticularsOfOutlet = RestOf<NewParticularsOfOutlet>;

export type PartialUpdateRestParticularsOfOutlet = RestOf<PartialUpdateParticularsOfOutlet>;

export type EntityResponseType = HttpResponse<IParticularsOfOutlet>;
export type EntityArrayResponseType = HttpResponse<IParticularsOfOutlet[]>;

@Injectable({ providedIn: 'root' })
export class ParticularsOfOutletService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/particulars-of-outlets');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/particulars-of-outlets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(particularsOfOutlet: NewParticularsOfOutlet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(particularsOfOutlet);
    return this.http
      .post<RestParticularsOfOutlet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(particularsOfOutlet: IParticularsOfOutlet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(particularsOfOutlet);
    return this.http
      .put<RestParticularsOfOutlet>(`${this.resourceUrl}/${this.getParticularsOfOutletIdentifier(particularsOfOutlet)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(particularsOfOutlet: PartialUpdateParticularsOfOutlet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(particularsOfOutlet);
    return this.http
      .patch<RestParticularsOfOutlet>(`${this.resourceUrl}/${this.getParticularsOfOutletIdentifier(particularsOfOutlet)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestParticularsOfOutlet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestParticularsOfOutlet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestParticularsOfOutlet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getParticularsOfOutletIdentifier(particularsOfOutlet: Pick<IParticularsOfOutlet, 'id'>): number {
    return particularsOfOutlet.id;
  }

  compareParticularsOfOutlet(o1: Pick<IParticularsOfOutlet, 'id'> | null, o2: Pick<IParticularsOfOutlet, 'id'> | null): boolean {
    return o1 && o2 ? this.getParticularsOfOutletIdentifier(o1) === this.getParticularsOfOutletIdentifier(o2) : o1 === o2;
  }

  addParticularsOfOutletToCollectionIfMissing<Type extends Pick<IParticularsOfOutlet, 'id'>>(
    particularsOfOutletCollection: Type[],
    ...particularsOfOutletsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const particularsOfOutlets: Type[] = particularsOfOutletsToCheck.filter(isPresent);
    if (particularsOfOutlets.length > 0) {
      const particularsOfOutletCollectionIdentifiers = particularsOfOutletCollection.map(
        particularsOfOutletItem => this.getParticularsOfOutletIdentifier(particularsOfOutletItem)!
      );
      const particularsOfOutletsToAdd = particularsOfOutlets.filter(particularsOfOutletItem => {
        const particularsOfOutletIdentifier = this.getParticularsOfOutletIdentifier(particularsOfOutletItem);
        if (particularsOfOutletCollectionIdentifiers.includes(particularsOfOutletIdentifier)) {
          return false;
        }
        particularsOfOutletCollectionIdentifiers.push(particularsOfOutletIdentifier);
        return true;
      });
      return [...particularsOfOutletsToAdd, ...particularsOfOutletCollection];
    }
    return particularsOfOutletCollection;
  }

  protected convertDateFromClient<T extends IParticularsOfOutlet | NewParticularsOfOutlet | PartialUpdateParticularsOfOutlet>(
    particularsOfOutlet: T
  ): RestOf<T> {
    return {
      ...particularsOfOutlet,
      businessReportingDate: particularsOfOutlet.businessReportingDate?.format(DATE_FORMAT) ?? null,
      cbkApprovalDate: particularsOfOutlet.cbkApprovalDate?.format(DATE_FORMAT) ?? null,
      outletOpeningDate: particularsOfOutlet.outletOpeningDate?.format(DATE_FORMAT) ?? null,
      outletClosureDate: particularsOfOutlet.outletClosureDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restParticularsOfOutlet: RestParticularsOfOutlet): IParticularsOfOutlet {
    return {
      ...restParticularsOfOutlet,
      businessReportingDate: restParticularsOfOutlet.businessReportingDate
        ? dayjs(restParticularsOfOutlet.businessReportingDate)
        : undefined,
      cbkApprovalDate: restParticularsOfOutlet.cbkApprovalDate ? dayjs(restParticularsOfOutlet.cbkApprovalDate) : undefined,
      outletOpeningDate: restParticularsOfOutlet.outletOpeningDate ? dayjs(restParticularsOfOutlet.outletOpeningDate) : undefined,
      outletClosureDate: restParticularsOfOutlet.outletClosureDate ? dayjs(restParticularsOfOutlet.outletClosureDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestParticularsOfOutlet>): HttpResponse<IParticularsOfOutlet> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestParticularsOfOutlet[]>): HttpResponse<IParticularsOfOutlet[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
