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
import { IPerformanceOfForeignSubsidiaries, NewPerformanceOfForeignSubsidiaries } from '../performance-of-foreign-subsidiaries.model';

export type PartialUpdatePerformanceOfForeignSubsidiaries = Partial<IPerformanceOfForeignSubsidiaries> &
  Pick<IPerformanceOfForeignSubsidiaries, 'id'>;

type RestOf<T extends IPerformanceOfForeignSubsidiaries | NewPerformanceOfForeignSubsidiaries> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestPerformanceOfForeignSubsidiaries = RestOf<IPerformanceOfForeignSubsidiaries>;

export type NewRestPerformanceOfForeignSubsidiaries = RestOf<NewPerformanceOfForeignSubsidiaries>;

export type PartialUpdateRestPerformanceOfForeignSubsidiaries = RestOf<PartialUpdatePerformanceOfForeignSubsidiaries>;

export type EntityResponseType = HttpResponse<IPerformanceOfForeignSubsidiaries>;
export type EntityArrayResponseType = HttpResponse<IPerformanceOfForeignSubsidiaries[]>;

@Injectable({ providedIn: 'root' })
export class PerformanceOfForeignSubsidiariesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/performance-of-foreign-subsidiaries');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/performance-of-foreign-subsidiaries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(performanceOfForeignSubsidiaries: NewPerformanceOfForeignSubsidiaries): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceOfForeignSubsidiaries);
    return this.http
      .post<RestPerformanceOfForeignSubsidiaries>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceOfForeignSubsidiaries);
    return this.http
      .put<RestPerformanceOfForeignSubsidiaries>(
        `${this.resourceUrl}/${this.getPerformanceOfForeignSubsidiariesIdentifier(performanceOfForeignSubsidiaries)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(performanceOfForeignSubsidiaries: PartialUpdatePerformanceOfForeignSubsidiaries): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceOfForeignSubsidiaries);
    return this.http
      .patch<RestPerformanceOfForeignSubsidiaries>(
        `${this.resourceUrl}/${this.getPerformanceOfForeignSubsidiariesIdentifier(performanceOfForeignSubsidiaries)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPerformanceOfForeignSubsidiaries>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPerformanceOfForeignSubsidiaries[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPerformanceOfForeignSubsidiaries[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPerformanceOfForeignSubsidiariesIdentifier(performanceOfForeignSubsidiaries: Pick<IPerformanceOfForeignSubsidiaries, 'id'>): number {
    return performanceOfForeignSubsidiaries.id;
  }

  comparePerformanceOfForeignSubsidiaries(
    o1: Pick<IPerformanceOfForeignSubsidiaries, 'id'> | null,
    o2: Pick<IPerformanceOfForeignSubsidiaries, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getPerformanceOfForeignSubsidiariesIdentifier(o1) === this.getPerformanceOfForeignSubsidiariesIdentifier(o2)
      : o1 === o2;
  }

  addPerformanceOfForeignSubsidiariesToCollectionIfMissing<Type extends Pick<IPerformanceOfForeignSubsidiaries, 'id'>>(
    performanceOfForeignSubsidiariesCollection: Type[],
    ...performanceOfForeignSubsidiariesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const performanceOfForeignSubsidiaries: Type[] = performanceOfForeignSubsidiariesToCheck.filter(isPresent);
    if (performanceOfForeignSubsidiaries.length > 0) {
      const performanceOfForeignSubsidiariesCollectionIdentifiers = performanceOfForeignSubsidiariesCollection.map(
        performanceOfForeignSubsidiariesItem => this.getPerformanceOfForeignSubsidiariesIdentifier(performanceOfForeignSubsidiariesItem)!
      );
      const performanceOfForeignSubsidiariesToAdd = performanceOfForeignSubsidiaries.filter(performanceOfForeignSubsidiariesItem => {
        const performanceOfForeignSubsidiariesIdentifier = this.getPerformanceOfForeignSubsidiariesIdentifier(
          performanceOfForeignSubsidiariesItem
        );
        if (performanceOfForeignSubsidiariesCollectionIdentifiers.includes(performanceOfForeignSubsidiariesIdentifier)) {
          return false;
        }
        performanceOfForeignSubsidiariesCollectionIdentifiers.push(performanceOfForeignSubsidiariesIdentifier);
        return true;
      });
      return [...performanceOfForeignSubsidiariesToAdd, ...performanceOfForeignSubsidiariesCollection];
    }
    return performanceOfForeignSubsidiariesCollection;
  }

  protected convertDateFromClient<
    T extends IPerformanceOfForeignSubsidiaries | NewPerformanceOfForeignSubsidiaries | PartialUpdatePerformanceOfForeignSubsidiaries
  >(performanceOfForeignSubsidiaries: T): RestOf<T> {
    return {
      ...performanceOfForeignSubsidiaries,
      reportingDate: performanceOfForeignSubsidiaries.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(
    restPerformanceOfForeignSubsidiaries: RestPerformanceOfForeignSubsidiaries
  ): IPerformanceOfForeignSubsidiaries {
    return {
      ...restPerformanceOfForeignSubsidiaries,
      reportingDate: restPerformanceOfForeignSubsidiaries.reportingDate
        ? dayjs(restPerformanceOfForeignSubsidiaries.reportingDate)
        : undefined,
    };
  }

  protected convertResponseFromServer(
    res: HttpResponse<RestPerformanceOfForeignSubsidiaries>
  ): HttpResponse<IPerformanceOfForeignSubsidiaries> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestPerformanceOfForeignSubsidiaries[]>
  ): HttpResponse<IPerformanceOfForeignSubsidiaries[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
