import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICounterPartyDealType, NewCounterPartyDealType } from '../counter-party-deal-type.model';

export type PartialUpdateCounterPartyDealType = Partial<ICounterPartyDealType> & Pick<ICounterPartyDealType, 'id'>;

export type EntityResponseType = HttpResponse<ICounterPartyDealType>;
export type EntityArrayResponseType = HttpResponse<ICounterPartyDealType[]>;

@Injectable({ providedIn: 'root' })
export class CounterPartyDealTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/counter-party-deal-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/counter-party-deal-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(counterPartyDealType: NewCounterPartyDealType): Observable<EntityResponseType> {
    return this.http.post<ICounterPartyDealType>(this.resourceUrl, counterPartyDealType, { observe: 'response' });
  }

  update(counterPartyDealType: ICounterPartyDealType): Observable<EntityResponseType> {
    return this.http.put<ICounterPartyDealType>(
      `${this.resourceUrl}/${this.getCounterPartyDealTypeIdentifier(counterPartyDealType)}`,
      counterPartyDealType,
      { observe: 'response' }
    );
  }

  partialUpdate(counterPartyDealType: PartialUpdateCounterPartyDealType): Observable<EntityResponseType> {
    return this.http.patch<ICounterPartyDealType>(
      `${this.resourceUrl}/${this.getCounterPartyDealTypeIdentifier(counterPartyDealType)}`,
      counterPartyDealType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICounterPartyDealType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounterPartyDealType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounterPartyDealType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCounterPartyDealTypeIdentifier(counterPartyDealType: Pick<ICounterPartyDealType, 'id'>): number {
    return counterPartyDealType.id;
  }

  compareCounterPartyDealType(o1: Pick<ICounterPartyDealType, 'id'> | null, o2: Pick<ICounterPartyDealType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCounterPartyDealTypeIdentifier(o1) === this.getCounterPartyDealTypeIdentifier(o2) : o1 === o2;
  }

  addCounterPartyDealTypeToCollectionIfMissing<Type extends Pick<ICounterPartyDealType, 'id'>>(
    counterPartyDealTypeCollection: Type[],
    ...counterPartyDealTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const counterPartyDealTypes: Type[] = counterPartyDealTypesToCheck.filter(isPresent);
    if (counterPartyDealTypes.length > 0) {
      const counterPartyDealTypeCollectionIdentifiers = counterPartyDealTypeCollection.map(
        counterPartyDealTypeItem => this.getCounterPartyDealTypeIdentifier(counterPartyDealTypeItem)!
      );
      const counterPartyDealTypesToAdd = counterPartyDealTypes.filter(counterPartyDealTypeItem => {
        const counterPartyDealTypeIdentifier = this.getCounterPartyDealTypeIdentifier(counterPartyDealTypeItem);
        if (counterPartyDealTypeCollectionIdentifiers.includes(counterPartyDealTypeIdentifier)) {
          return false;
        }
        counterPartyDealTypeCollectionIdentifiers.push(counterPartyDealTypeIdentifier);
        return true;
      });
      return [...counterPartyDealTypesToAdd, ...counterPartyDealTypeCollection];
    }
    return counterPartyDealTypeCollection;
  }
}
