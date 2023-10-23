import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICurrencyAuthenticityFlag, NewCurrencyAuthenticityFlag } from '../currency-authenticity-flag.model';

export type PartialUpdateCurrencyAuthenticityFlag = Partial<ICurrencyAuthenticityFlag> & Pick<ICurrencyAuthenticityFlag, 'id'>;

export type EntityResponseType = HttpResponse<ICurrencyAuthenticityFlag>;
export type EntityArrayResponseType = HttpResponse<ICurrencyAuthenticityFlag[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyAuthenticityFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/currency-authenticity-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/currency-authenticity-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(currencyAuthenticityFlag: NewCurrencyAuthenticityFlag): Observable<EntityResponseType> {
    return this.http.post<ICurrencyAuthenticityFlag>(this.resourceUrl, currencyAuthenticityFlag, { observe: 'response' });
  }

  update(currencyAuthenticityFlag: ICurrencyAuthenticityFlag): Observable<EntityResponseType> {
    return this.http.put<ICurrencyAuthenticityFlag>(
      `${this.resourceUrl}/${this.getCurrencyAuthenticityFlagIdentifier(currencyAuthenticityFlag)}`,
      currencyAuthenticityFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(currencyAuthenticityFlag: PartialUpdateCurrencyAuthenticityFlag): Observable<EntityResponseType> {
    return this.http.patch<ICurrencyAuthenticityFlag>(
      `${this.resourceUrl}/${this.getCurrencyAuthenticityFlagIdentifier(currencyAuthenticityFlag)}`,
      currencyAuthenticityFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICurrencyAuthenticityFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrencyAuthenticityFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrencyAuthenticityFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCurrencyAuthenticityFlagIdentifier(currencyAuthenticityFlag: Pick<ICurrencyAuthenticityFlag, 'id'>): number {
    return currencyAuthenticityFlag.id;
  }

  compareCurrencyAuthenticityFlag(
    o1: Pick<ICurrencyAuthenticityFlag, 'id'> | null,
    o2: Pick<ICurrencyAuthenticityFlag, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCurrencyAuthenticityFlagIdentifier(o1) === this.getCurrencyAuthenticityFlagIdentifier(o2) : o1 === o2;
  }

  addCurrencyAuthenticityFlagToCollectionIfMissing<Type extends Pick<ICurrencyAuthenticityFlag, 'id'>>(
    currencyAuthenticityFlagCollection: Type[],
    ...currencyAuthenticityFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const currencyAuthenticityFlags: Type[] = currencyAuthenticityFlagsToCheck.filter(isPresent);
    if (currencyAuthenticityFlags.length > 0) {
      const currencyAuthenticityFlagCollectionIdentifiers = currencyAuthenticityFlagCollection.map(
        currencyAuthenticityFlagItem => this.getCurrencyAuthenticityFlagIdentifier(currencyAuthenticityFlagItem)!
      );
      const currencyAuthenticityFlagsToAdd = currencyAuthenticityFlags.filter(currencyAuthenticityFlagItem => {
        const currencyAuthenticityFlagIdentifier = this.getCurrencyAuthenticityFlagIdentifier(currencyAuthenticityFlagItem);
        if (currencyAuthenticityFlagCollectionIdentifiers.includes(currencyAuthenticityFlagIdentifier)) {
          return false;
        }
        currencyAuthenticityFlagCollectionIdentifiers.push(currencyAuthenticityFlagIdentifier);
        return true;
      });
      return [...currencyAuthenticityFlagsToAdd, ...currencyAuthenticityFlagCollection];
    }
    return currencyAuthenticityFlagCollection;
  }
}
