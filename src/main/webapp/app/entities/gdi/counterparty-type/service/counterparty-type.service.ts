import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICounterpartyType, NewCounterpartyType } from '../counterparty-type.model';

export type PartialUpdateCounterpartyType = Partial<ICounterpartyType> & Pick<ICounterpartyType, 'id'>;

export type EntityResponseType = HttpResponse<ICounterpartyType>;
export type EntityArrayResponseType = HttpResponse<ICounterpartyType[]>;

@Injectable({ providedIn: 'root' })
export class CounterpartyTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/counterparty-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/counterparty-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(counterpartyType: NewCounterpartyType): Observable<EntityResponseType> {
    return this.http.post<ICounterpartyType>(this.resourceUrl, counterpartyType, { observe: 'response' });
  }

  update(counterpartyType: ICounterpartyType): Observable<EntityResponseType> {
    return this.http.put<ICounterpartyType>(
      `${this.resourceUrl}/${this.getCounterpartyTypeIdentifier(counterpartyType)}`,
      counterpartyType,
      { observe: 'response' }
    );
  }

  partialUpdate(counterpartyType: PartialUpdateCounterpartyType): Observable<EntityResponseType> {
    return this.http.patch<ICounterpartyType>(
      `${this.resourceUrl}/${this.getCounterpartyTypeIdentifier(counterpartyType)}`,
      counterpartyType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICounterpartyType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounterpartyType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounterpartyType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCounterpartyTypeIdentifier(counterpartyType: Pick<ICounterpartyType, 'id'>): number {
    return counterpartyType.id;
  }

  compareCounterpartyType(o1: Pick<ICounterpartyType, 'id'> | null, o2: Pick<ICounterpartyType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCounterpartyTypeIdentifier(o1) === this.getCounterpartyTypeIdentifier(o2) : o1 === o2;
  }

  addCounterpartyTypeToCollectionIfMissing<Type extends Pick<ICounterpartyType, 'id'>>(
    counterpartyTypeCollection: Type[],
    ...counterpartyTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const counterpartyTypes: Type[] = counterpartyTypesToCheck.filter(isPresent);
    if (counterpartyTypes.length > 0) {
      const counterpartyTypeCollectionIdentifiers = counterpartyTypeCollection.map(
        counterpartyTypeItem => this.getCounterpartyTypeIdentifier(counterpartyTypeItem)!
      );
      const counterpartyTypesToAdd = counterpartyTypes.filter(counterpartyTypeItem => {
        const counterpartyTypeIdentifier = this.getCounterpartyTypeIdentifier(counterpartyTypeItem);
        if (counterpartyTypeCollectionIdentifiers.includes(counterpartyTypeIdentifier)) {
          return false;
        }
        counterpartyTypeCollectionIdentifiers.push(counterpartyTypeIdentifier);
        return true;
      });
      return [...counterpartyTypesToAdd, ...counterpartyTypeCollection];
    }
    return counterpartyTypeCollection;
  }
}
