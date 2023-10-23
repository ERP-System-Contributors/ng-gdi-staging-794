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
import { IFiscalQuarter, NewFiscalQuarter } from '../fiscal-quarter.model';

export type PartialUpdateFiscalQuarter = Partial<IFiscalQuarter> & Pick<IFiscalQuarter, 'id'>;

type RestOf<T extends IFiscalQuarter | NewFiscalQuarter> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestFiscalQuarter = RestOf<IFiscalQuarter>;

export type NewRestFiscalQuarter = RestOf<NewFiscalQuarter>;

export type PartialUpdateRestFiscalQuarter = RestOf<PartialUpdateFiscalQuarter>;

export type EntityResponseType = HttpResponse<IFiscalQuarter>;
export type EntityArrayResponseType = HttpResponse<IFiscalQuarter[]>;

@Injectable({ providedIn: 'root' })
export class FiscalQuarterService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fiscal-quarters');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fiscal-quarters');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fiscalQuarter: NewFiscalQuarter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalQuarter);
    return this.http
      .post<RestFiscalQuarter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fiscalQuarter: IFiscalQuarter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalQuarter);
    return this.http
      .put<RestFiscalQuarter>(`${this.resourceUrl}/${this.getFiscalQuarterIdentifier(fiscalQuarter)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fiscalQuarter: PartialUpdateFiscalQuarter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fiscalQuarter);
    return this.http
      .patch<RestFiscalQuarter>(`${this.resourceUrl}/${this.getFiscalQuarterIdentifier(fiscalQuarter)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFiscalQuarter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFiscalQuarter[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFiscalQuarter[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFiscalQuarterIdentifier(fiscalQuarter: Pick<IFiscalQuarter, 'id'>): number {
    return fiscalQuarter.id;
  }

  compareFiscalQuarter(o1: Pick<IFiscalQuarter, 'id'> | null, o2: Pick<IFiscalQuarter, 'id'> | null): boolean {
    return o1 && o2 ? this.getFiscalQuarterIdentifier(o1) === this.getFiscalQuarterIdentifier(o2) : o1 === o2;
  }

  addFiscalQuarterToCollectionIfMissing<Type extends Pick<IFiscalQuarter, 'id'>>(
    fiscalQuarterCollection: Type[],
    ...fiscalQuartersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fiscalQuarters: Type[] = fiscalQuartersToCheck.filter(isPresent);
    if (fiscalQuarters.length > 0) {
      const fiscalQuarterCollectionIdentifiers = fiscalQuarterCollection.map(
        fiscalQuarterItem => this.getFiscalQuarterIdentifier(fiscalQuarterItem)!
      );
      const fiscalQuartersToAdd = fiscalQuarters.filter(fiscalQuarterItem => {
        const fiscalQuarterIdentifier = this.getFiscalQuarterIdentifier(fiscalQuarterItem);
        if (fiscalQuarterCollectionIdentifiers.includes(fiscalQuarterIdentifier)) {
          return false;
        }
        fiscalQuarterCollectionIdentifiers.push(fiscalQuarterIdentifier);
        return true;
      });
      return [...fiscalQuartersToAdd, ...fiscalQuarterCollection];
    }
    return fiscalQuarterCollection;
  }

  protected convertDateFromClient<T extends IFiscalQuarter | NewFiscalQuarter | PartialUpdateFiscalQuarter>(fiscalQuarter: T): RestOf<T> {
    return {
      ...fiscalQuarter,
      startDate: fiscalQuarter.startDate?.format(DATE_FORMAT) ?? null,
      endDate: fiscalQuarter.endDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFiscalQuarter: RestFiscalQuarter): IFiscalQuarter {
    return {
      ...restFiscalQuarter,
      startDate: restFiscalQuarter.startDate ? dayjs(restFiscalQuarter.startDate) : undefined,
      endDate: restFiscalQuarter.endDate ? dayjs(restFiscalQuarter.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFiscalQuarter>): HttpResponse<IFiscalQuarter> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFiscalQuarter[]>): HttpResponse<IFiscalQuarter[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
