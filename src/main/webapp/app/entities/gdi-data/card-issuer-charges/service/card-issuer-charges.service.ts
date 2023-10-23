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
import { ICardIssuerCharges, NewCardIssuerCharges } from '../card-issuer-charges.model';

export type PartialUpdateCardIssuerCharges = Partial<ICardIssuerCharges> & Pick<ICardIssuerCharges, 'id'>;

type RestOf<T extends ICardIssuerCharges | NewCardIssuerCharges> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestCardIssuerCharges = RestOf<ICardIssuerCharges>;

export type NewRestCardIssuerCharges = RestOf<NewCardIssuerCharges>;

export type PartialUpdateRestCardIssuerCharges = RestOf<PartialUpdateCardIssuerCharges>;

export type EntityResponseType = HttpResponse<ICardIssuerCharges>;
export type EntityArrayResponseType = HttpResponse<ICardIssuerCharges[]>;

@Injectable({ providedIn: 'root' })
export class CardIssuerChargesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-issuer-charges');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-issuer-charges');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardIssuerCharges: NewCardIssuerCharges): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardIssuerCharges);
    return this.http
      .post<RestCardIssuerCharges>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cardIssuerCharges: ICardIssuerCharges): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardIssuerCharges);
    return this.http
      .put<RestCardIssuerCharges>(`${this.resourceUrl}/${this.getCardIssuerChargesIdentifier(cardIssuerCharges)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cardIssuerCharges: PartialUpdateCardIssuerCharges): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardIssuerCharges);
    return this.http
      .patch<RestCardIssuerCharges>(`${this.resourceUrl}/${this.getCardIssuerChargesIdentifier(cardIssuerCharges)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCardIssuerCharges>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardIssuerCharges[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardIssuerCharges[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCardIssuerChargesIdentifier(cardIssuerCharges: Pick<ICardIssuerCharges, 'id'>): number {
    return cardIssuerCharges.id;
  }

  compareCardIssuerCharges(o1: Pick<ICardIssuerCharges, 'id'> | null, o2: Pick<ICardIssuerCharges, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardIssuerChargesIdentifier(o1) === this.getCardIssuerChargesIdentifier(o2) : o1 === o2;
  }

  addCardIssuerChargesToCollectionIfMissing<Type extends Pick<ICardIssuerCharges, 'id'>>(
    cardIssuerChargesCollection: Type[],
    ...cardIssuerChargesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardIssuerCharges: Type[] = cardIssuerChargesToCheck.filter(isPresent);
    if (cardIssuerCharges.length > 0) {
      const cardIssuerChargesCollectionIdentifiers = cardIssuerChargesCollection.map(
        cardIssuerChargesItem => this.getCardIssuerChargesIdentifier(cardIssuerChargesItem)!
      );
      const cardIssuerChargesToAdd = cardIssuerCharges.filter(cardIssuerChargesItem => {
        const cardIssuerChargesIdentifier = this.getCardIssuerChargesIdentifier(cardIssuerChargesItem);
        if (cardIssuerChargesCollectionIdentifiers.includes(cardIssuerChargesIdentifier)) {
          return false;
        }
        cardIssuerChargesCollectionIdentifiers.push(cardIssuerChargesIdentifier);
        return true;
      });
      return [...cardIssuerChargesToAdd, ...cardIssuerChargesCollection];
    }
    return cardIssuerChargesCollection;
  }

  protected convertDateFromClient<T extends ICardIssuerCharges | NewCardIssuerCharges | PartialUpdateCardIssuerCharges>(
    cardIssuerCharges: T
  ): RestOf<T> {
    return {
      ...cardIssuerCharges,
      reportingDate: cardIssuerCharges.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCardIssuerCharges: RestCardIssuerCharges): ICardIssuerCharges {
    return {
      ...restCardIssuerCharges,
      reportingDate: restCardIssuerCharges.reportingDate ? dayjs(restCardIssuerCharges.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCardIssuerCharges>): HttpResponse<ICardIssuerCharges> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCardIssuerCharges[]>): HttpResponse<ICardIssuerCharges[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
