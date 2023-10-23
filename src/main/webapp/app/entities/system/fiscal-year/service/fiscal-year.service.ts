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
import { IFiscalYear, NewFiscalYear } from '../fiscal-year.model';

export type PartialUpdateFiscalYear = Partial<IFiscalYear> & Pick<IFiscalYear, 'id'>;

type RestOf<T extends IFiscalYear | NewFiscalYear> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestFiscalYear = RestOf<IFiscalYear>;

export type NewRestFiscalYear = RestOf<NewFiscalYear>;

export type PartialUpdateRestFiscalYear = RestOf<PartialUpdateFiscalYear>;

export type EntityResponseType = HttpResponse<IFiscalYear>;
export type EntityArrayResponseType = HttpResponse<IFiscalYear[]>;

@Injectable({ providedIn: 'root' })
export class FiscalYearService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fiscal-years');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fiscal-years');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fiscalYear: NewFiscalYear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalYear);
    return this.http
      .post<RestFiscalYear>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fiscalYear: IFiscalYear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalYear);
    return this.http
      .put<RestFiscalYear>(`${this.resourceUrl}/${this.getFiscalYearIdentifier(fiscalYear)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fiscalYear: PartialUpdateFiscalYear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalYear);
    return this.http
      .patch<RestFiscalYear>(`${this.resourceUrl}/${this.getFiscalYearIdentifier(fiscalYear)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFiscalYear>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFiscalYear[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFiscalYear[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFiscalYearIdentifier(fiscalYear: Pick<IFiscalYear, 'id'>): number {
    return fiscalYear.id;
  }

  compareFiscalYear(o1: Pick<IFiscalYear, 'id'> | null, o2: Pick<IFiscalYear, 'id'> | null): boolean {
    return o1 && o2 ? this.getFiscalYearIdentifier(o1) === this.getFiscalYearIdentifier(o2) : o1 === o2;
  }

  addFiscalYearToCollectionIfMissing<Type extends Pick<IFiscalYear, 'id'>>(
    fiscalYearCollection: Type[],
    ...fiscalYearsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fiscalYears: Type[] = fiscalYearsToCheck.filter(isPresent);
    if (fiscalYears.length > 0) {
      const fiscalYearCollectionIdentifiers = fiscalYearCollection.map(fiscalYearItem => this.getFiscalYearIdentifier(fiscalYearItem)!);
      const fiscalYearsToAdd = fiscalYears.filter(fiscalYearItem => {
        const fiscalYearIdentifier = this.getFiscalYearIdentifier(fiscalYearItem);
        if (fiscalYearCollectionIdentifiers.includes(fiscalYearIdentifier)) {
          return false;
        }
        fiscalYearCollectionIdentifiers.push(fiscalYearIdentifier);
        return true;
      });
      return [...fiscalYearsToAdd, ...fiscalYearCollection];
    }
    return fiscalYearCollection;
  }

  protected convertDateFromClient<T extends IFiscalYear | NewFiscalYear | PartialUpdateFiscalYear>(fiscalYear: T): RestOf<T> {
    return {
      ...fiscalYear,
      startDate: fiscalYear.startDate?.format(DATE_FORMAT) ?? null,
      endDate: fiscalYear.endDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFiscalYear: RestFiscalYear): IFiscalYear {
    return {
      ...restFiscalYear,
      startDate: restFiscalYear.startDate ? dayjs(restFiscalYear.startDate) : undefined,
      endDate: restFiscalYear.endDate ? dayjs(restFiscalYear.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFiscalYear>): HttpResponse<IFiscalYear> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFiscalYear[]>): HttpResponse<IFiscalYear[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
