import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IKenyanCurrencyDenomination, NewKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';

export type PartialUpdateKenyanCurrencyDenomination = Partial<IKenyanCurrencyDenomination> & Pick<IKenyanCurrencyDenomination, 'id'>;

export type EntityResponseType = HttpResponse<IKenyanCurrencyDenomination>;
export type EntityArrayResponseType = HttpResponse<IKenyanCurrencyDenomination[]>;

@Injectable({ providedIn: 'root' })
export class KenyanCurrencyDenominationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/kenyan-currency-denominations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/kenyan-currency-denominations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(kenyanCurrencyDenomination: NewKenyanCurrencyDenomination): Observable<EntityResponseType> {
    return this.http.post<IKenyanCurrencyDenomination>(this.resourceUrl, kenyanCurrencyDenomination, { observe: 'response' });
  }

  update(kenyanCurrencyDenomination: IKenyanCurrencyDenomination): Observable<EntityResponseType> {
    return this.http.put<IKenyanCurrencyDenomination>(
      `${this.resourceUrl}/${this.getKenyanCurrencyDenominationIdentifier(kenyanCurrencyDenomination)}`,
      kenyanCurrencyDenomination,
      { observe: 'response' }
    );
  }

  partialUpdate(kenyanCurrencyDenomination: PartialUpdateKenyanCurrencyDenomination): Observable<EntityResponseType> {
    return this.http.patch<IKenyanCurrencyDenomination>(
      `${this.resourceUrl}/${this.getKenyanCurrencyDenominationIdentifier(kenyanCurrencyDenomination)}`,
      kenyanCurrencyDenomination,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKenyanCurrencyDenomination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKenyanCurrencyDenomination[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKenyanCurrencyDenomination[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getKenyanCurrencyDenominationIdentifier(kenyanCurrencyDenomination: Pick<IKenyanCurrencyDenomination, 'id'>): number {
    return kenyanCurrencyDenomination.id;
  }

  compareKenyanCurrencyDenomination(
    o1: Pick<IKenyanCurrencyDenomination, 'id'> | null,
    o2: Pick<IKenyanCurrencyDenomination, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getKenyanCurrencyDenominationIdentifier(o1) === this.getKenyanCurrencyDenominationIdentifier(o2) : o1 === o2;
  }

  addKenyanCurrencyDenominationToCollectionIfMissing<Type extends Pick<IKenyanCurrencyDenomination, 'id'>>(
    kenyanCurrencyDenominationCollection: Type[],
    ...kenyanCurrencyDenominationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const kenyanCurrencyDenominations: Type[] = kenyanCurrencyDenominationsToCheck.filter(isPresent);
    if (kenyanCurrencyDenominations.length > 0) {
      const kenyanCurrencyDenominationCollectionIdentifiers = kenyanCurrencyDenominationCollection.map(
        kenyanCurrencyDenominationItem => this.getKenyanCurrencyDenominationIdentifier(kenyanCurrencyDenominationItem)!
      );
      const kenyanCurrencyDenominationsToAdd = kenyanCurrencyDenominations.filter(kenyanCurrencyDenominationItem => {
        const kenyanCurrencyDenominationIdentifier = this.getKenyanCurrencyDenominationIdentifier(kenyanCurrencyDenominationItem);
        if (kenyanCurrencyDenominationCollectionIdentifiers.includes(kenyanCurrencyDenominationIdentifier)) {
          return false;
        }
        kenyanCurrencyDenominationCollectionIdentifiers.push(kenyanCurrencyDenominationIdentifier);
        return true;
      });
      return [...kenyanCurrencyDenominationsToAdd, ...kenyanCurrencyDenominationCollection];
    }
    return kenyanCurrencyDenominationCollection;
  }
}
