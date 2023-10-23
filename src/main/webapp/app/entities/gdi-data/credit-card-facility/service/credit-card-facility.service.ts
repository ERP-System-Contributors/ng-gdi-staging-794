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
import { ICreditCardFacility, NewCreditCardFacility } from '../credit-card-facility.model';

export type PartialUpdateCreditCardFacility = Partial<ICreditCardFacility> & Pick<ICreditCardFacility, 'id'>;

type RestOf<T extends ICreditCardFacility | NewCreditCardFacility> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestCreditCardFacility = RestOf<ICreditCardFacility>;

export type NewRestCreditCardFacility = RestOf<NewCreditCardFacility>;

export type PartialUpdateRestCreditCardFacility = RestOf<PartialUpdateCreditCardFacility>;

export type EntityResponseType = HttpResponse<ICreditCardFacility>;
export type EntityArrayResponseType = HttpResponse<ICreditCardFacility[]>;

@Injectable({ providedIn: 'root' })
export class CreditCardFacilityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/credit-card-facilities');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/credit-card-facilities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(creditCardFacility: NewCreditCardFacility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditCardFacility);
    return this.http
      .post<RestCreditCardFacility>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(creditCardFacility: ICreditCardFacility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditCardFacility);
    return this.http
      .put<RestCreditCardFacility>(`${this.resourceUrl}/${this.getCreditCardFacilityIdentifier(creditCardFacility)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(creditCardFacility: PartialUpdateCreditCardFacility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditCardFacility);
    return this.http
      .patch<RestCreditCardFacility>(`${this.resourceUrl}/${this.getCreditCardFacilityIdentifier(creditCardFacility)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCreditCardFacility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCreditCardFacility[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCreditCardFacility[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCreditCardFacilityIdentifier(creditCardFacility: Pick<ICreditCardFacility, 'id'>): number {
    return creditCardFacility.id;
  }

  compareCreditCardFacility(o1: Pick<ICreditCardFacility, 'id'> | null, o2: Pick<ICreditCardFacility, 'id'> | null): boolean {
    return o1 && o2 ? this.getCreditCardFacilityIdentifier(o1) === this.getCreditCardFacilityIdentifier(o2) : o1 === o2;
  }

  addCreditCardFacilityToCollectionIfMissing<Type extends Pick<ICreditCardFacility, 'id'>>(
    creditCardFacilityCollection: Type[],
    ...creditCardFacilitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const creditCardFacilities: Type[] = creditCardFacilitiesToCheck.filter(isPresent);
    if (creditCardFacilities.length > 0) {
      const creditCardFacilityCollectionIdentifiers = creditCardFacilityCollection.map(
        creditCardFacilityItem => this.getCreditCardFacilityIdentifier(creditCardFacilityItem)!
      );
      const creditCardFacilitiesToAdd = creditCardFacilities.filter(creditCardFacilityItem => {
        const creditCardFacilityIdentifier = this.getCreditCardFacilityIdentifier(creditCardFacilityItem);
        if (creditCardFacilityCollectionIdentifiers.includes(creditCardFacilityIdentifier)) {
          return false;
        }
        creditCardFacilityCollectionIdentifiers.push(creditCardFacilityIdentifier);
        return true;
      });
      return [...creditCardFacilitiesToAdd, ...creditCardFacilityCollection];
    }
    return creditCardFacilityCollection;
  }

  protected convertDateFromClient<T extends ICreditCardFacility | NewCreditCardFacility | PartialUpdateCreditCardFacility>(
    creditCardFacility: T
  ): RestOf<T> {
    return {
      ...creditCardFacility,
      reportingDate: creditCardFacility.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCreditCardFacility: RestCreditCardFacility): ICreditCardFacility {
    return {
      ...restCreditCardFacility,
      reportingDate: restCreditCardFacility.reportingDate ? dayjs(restCreditCardFacility.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCreditCardFacility>): HttpResponse<ICreditCardFacility> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCreditCardFacility[]>): HttpResponse<ICreditCardFacility[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
