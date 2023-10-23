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
import { IRelatedPartyRelationship, NewRelatedPartyRelationship } from '../related-party-relationship.model';

export type PartialUpdateRelatedPartyRelationship = Partial<IRelatedPartyRelationship> & Pick<IRelatedPartyRelationship, 'id'>;

type RestOf<T extends IRelatedPartyRelationship | NewRelatedPartyRelationship> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestRelatedPartyRelationship = RestOf<IRelatedPartyRelationship>;

export type NewRestRelatedPartyRelationship = RestOf<NewRelatedPartyRelationship>;

export type PartialUpdateRestRelatedPartyRelationship = RestOf<PartialUpdateRelatedPartyRelationship>;

export type EntityResponseType = HttpResponse<IRelatedPartyRelationship>;
export type EntityArrayResponseType = HttpResponse<IRelatedPartyRelationship[]>;

@Injectable({ providedIn: 'root' })
export class RelatedPartyRelationshipService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/related-party-relationships');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/related-party-relationships');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(relatedPartyRelationship: NewRelatedPartyRelationship): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(relatedPartyRelationship);
    return this.http
      .post<RestRelatedPartyRelationship>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(relatedPartyRelationship: IRelatedPartyRelationship): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(relatedPartyRelationship);
    return this.http
      .put<RestRelatedPartyRelationship>(
        `${this.resourceUrl}/${this.getRelatedPartyRelationshipIdentifier(relatedPartyRelationship)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(relatedPartyRelationship: PartialUpdateRelatedPartyRelationship): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(relatedPartyRelationship);
    return this.http
      .patch<RestRelatedPartyRelationship>(
        `${this.resourceUrl}/${this.getRelatedPartyRelationshipIdentifier(relatedPartyRelationship)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRelatedPartyRelationship>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRelatedPartyRelationship[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRelatedPartyRelationship[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getRelatedPartyRelationshipIdentifier(relatedPartyRelationship: Pick<IRelatedPartyRelationship, 'id'>): number {
    return relatedPartyRelationship.id;
  }

  compareRelatedPartyRelationship(
    o1: Pick<IRelatedPartyRelationship, 'id'> | null,
    o2: Pick<IRelatedPartyRelationship, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getRelatedPartyRelationshipIdentifier(o1) === this.getRelatedPartyRelationshipIdentifier(o2) : o1 === o2;
  }

  addRelatedPartyRelationshipToCollectionIfMissing<Type extends Pick<IRelatedPartyRelationship, 'id'>>(
    relatedPartyRelationshipCollection: Type[],
    ...relatedPartyRelationshipsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const relatedPartyRelationships: Type[] = relatedPartyRelationshipsToCheck.filter(isPresent);
    if (relatedPartyRelationships.length > 0) {
      const relatedPartyRelationshipCollectionIdentifiers = relatedPartyRelationshipCollection.map(
        relatedPartyRelationshipItem => this.getRelatedPartyRelationshipIdentifier(relatedPartyRelationshipItem)!
      );
      const relatedPartyRelationshipsToAdd = relatedPartyRelationships.filter(relatedPartyRelationshipItem => {
        const relatedPartyRelationshipIdentifier = this.getRelatedPartyRelationshipIdentifier(relatedPartyRelationshipItem);
        if (relatedPartyRelationshipCollectionIdentifiers.includes(relatedPartyRelationshipIdentifier)) {
          return false;
        }
        relatedPartyRelationshipCollectionIdentifiers.push(relatedPartyRelationshipIdentifier);
        return true;
      });
      return [...relatedPartyRelationshipsToAdd, ...relatedPartyRelationshipCollection];
    }
    return relatedPartyRelationshipCollection;
  }

  protected convertDateFromClient<
    T extends IRelatedPartyRelationship | NewRelatedPartyRelationship | PartialUpdateRelatedPartyRelationship
  >(relatedPartyRelationship: T): RestOf<T> {
    return {
      ...relatedPartyRelationship,
      reportingDate: relatedPartyRelationship.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restRelatedPartyRelationship: RestRelatedPartyRelationship): IRelatedPartyRelationship {
    return {
      ...restRelatedPartyRelationship,
      reportingDate: restRelatedPartyRelationship.reportingDate ? dayjs(restRelatedPartyRelationship.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRelatedPartyRelationship>): HttpResponse<IRelatedPartyRelationship> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRelatedPartyRelationship[]>): HttpResponse<IRelatedPartyRelationship[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
