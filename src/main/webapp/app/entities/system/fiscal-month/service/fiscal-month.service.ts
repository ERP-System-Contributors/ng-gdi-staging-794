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
import { IFiscalMonth, NewFiscalMonth } from '../fiscal-month.model';

export type PartialUpdateFiscalMonth = Partial<IFiscalMonth> & Pick<IFiscalMonth, 'id'>;

type RestOf<T extends IFiscalMonth | NewFiscalMonth> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestFiscalMonth = RestOf<IFiscalMonth>;

export type NewRestFiscalMonth = RestOf<NewFiscalMonth>;

export type PartialUpdateRestFiscalMonth = RestOf<PartialUpdateFiscalMonth>;

export type EntityResponseType = HttpResponse<IFiscalMonth>;
export type EntityArrayResponseType = HttpResponse<IFiscalMonth[]>;

@Injectable({ providedIn: 'root' })
export class FiscalMonthService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fiscal-months');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fiscal-months');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fiscalMonth: NewFiscalMonth): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalMonth);
    return this.http
      .post<RestFiscalMonth>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fiscalMonth: IFiscalMonth): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalMonth);
    return this.http
      .put<RestFiscalMonth>(`${this.resourceUrl}/${this.getFiscalMonthIdentifier(fiscalMonth)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fiscalMonth: PartialUpdateFiscalMonth): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalMonth);
    return this.http
      .patch<RestFiscalMonth>(`${this.resourceUrl}/${this.getFiscalMonthIdentifier(fiscalMonth)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFiscalMonth>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFiscalMonth[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFiscalMonth[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFiscalMonthIdentifier(fiscalMonth: Pick<IFiscalMonth, 'id'>): number {
    return fiscalMonth.id;
  }

  compareFiscalMonth(o1: Pick<IFiscalMonth, 'id'> | null, o2: Pick<IFiscalMonth, 'id'> | null): boolean {
    return o1 && o2 ? this.getFiscalMonthIdentifier(o1) === this.getFiscalMonthIdentifier(o2) : o1 === o2;
  }

  addFiscalMonthToCollectionIfMissing<Type extends Pick<IFiscalMonth, 'id'>>(
    fiscalMonthCollection: Type[],
    ...fiscalMonthsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fiscalMonths: Type[] = fiscalMonthsToCheck.filter(isPresent);
    if (fiscalMonths.length > 0) {
      const fiscalMonthCollectionIdentifiers = fiscalMonthCollection.map(
        fiscalMonthItem => this.getFiscalMonthIdentifier(fiscalMonthItem)!
      );
      const fiscalMonthsToAdd = fiscalMonths.filter(fiscalMonthItem => {
        const fiscalMonthIdentifier = this.getFiscalMonthIdentifier(fiscalMonthItem);
        if (fiscalMonthCollectionIdentifiers.includes(fiscalMonthIdentifier)) {
          return false;
        }
        fiscalMonthCollectionIdentifiers.push(fiscalMonthIdentifier);
        return true;
      });
      return [...fiscalMonthsToAdd, ...fiscalMonthCollection];
    }
    return fiscalMonthCollection;
  }

  protected convertDateFromClient<T extends IFiscalMonth | NewFiscalMonth | PartialUpdateFiscalMonth>(fiscalMonth: T): RestOf<T> {
    return {
      ...fiscalMonth,
      startDate: fiscalMonth.startDate?.format(DATE_FORMAT) ?? null,
      endDate: fiscalMonth.endDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFiscalMonth: RestFiscalMonth): IFiscalMonth {
    return {
      ...restFiscalMonth,
      startDate: restFiscalMonth.startDate ? dayjs(restFiscalMonth.startDate) : undefined,
      endDate: restFiscalMonth.endDate ? dayjs(restFiscalMonth.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFiscalMonth>): HttpResponse<IFiscalMonth> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFiscalMonth[]>): HttpResponse<IFiscalMonth[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
