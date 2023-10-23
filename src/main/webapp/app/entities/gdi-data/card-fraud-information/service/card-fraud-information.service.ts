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
import { ICardFraudInformation, NewCardFraudInformation } from '../card-fraud-information.model';

export type PartialUpdateCardFraudInformation = Partial<ICardFraudInformation> & Pick<ICardFraudInformation, 'id'>;

type RestOf<T extends ICardFraudInformation | NewCardFraudInformation> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestCardFraudInformation = RestOf<ICardFraudInformation>;

export type NewRestCardFraudInformation = RestOf<NewCardFraudInformation>;

export type PartialUpdateRestCardFraudInformation = RestOf<PartialUpdateCardFraudInformation>;

export type EntityResponseType = HttpResponse<ICardFraudInformation>;
export type EntityArrayResponseType = HttpResponse<ICardFraudInformation[]>;

@Injectable({ providedIn: 'root' })
export class CardFraudInformationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-fraud-informations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-fraud-informations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardFraudInformation: NewCardFraudInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardFraudInformation);
    return this.http
      .post<RestCardFraudInformation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cardFraudInformation: ICardFraudInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardFraudInformation);
    return this.http
      .put<RestCardFraudInformation>(`${this.resourceUrl}/${this.getCardFraudInformationIdentifier(cardFraudInformation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cardFraudInformation: PartialUpdateCardFraudInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardFraudInformation);
    return this.http
      .patch<RestCardFraudInformation>(`${this.resourceUrl}/${this.getCardFraudInformationIdentifier(cardFraudInformation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCardFraudInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardFraudInformation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardFraudInformation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCardFraudInformationIdentifier(cardFraudInformation: Pick<ICardFraudInformation, 'id'>): number {
    return cardFraudInformation.id;
  }

  compareCardFraudInformation(o1: Pick<ICardFraudInformation, 'id'> | null, o2: Pick<ICardFraudInformation, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardFraudInformationIdentifier(o1) === this.getCardFraudInformationIdentifier(o2) : o1 === o2;
  }

  addCardFraudInformationToCollectionIfMissing<Type extends Pick<ICardFraudInformation, 'id'>>(
    cardFraudInformationCollection: Type[],
    ...cardFraudInformationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardFraudInformations: Type[] = cardFraudInformationsToCheck.filter(isPresent);
    if (cardFraudInformations.length > 0) {
      const cardFraudInformationCollectionIdentifiers = cardFraudInformationCollection.map(
        cardFraudInformationItem => this.getCardFraudInformationIdentifier(cardFraudInformationItem)!
      );
      const cardFraudInformationsToAdd = cardFraudInformations.filter(cardFraudInformationItem => {
        const cardFraudInformationIdentifier = this.getCardFraudInformationIdentifier(cardFraudInformationItem);
        if (cardFraudInformationCollectionIdentifiers.includes(cardFraudInformationIdentifier)) {
          return false;
        }
        cardFraudInformationCollectionIdentifiers.push(cardFraudInformationIdentifier);
        return true;
      });
      return [...cardFraudInformationsToAdd, ...cardFraudInformationCollection];
    }
    return cardFraudInformationCollection;
  }

  protected convertDateFromClient<T extends ICardFraudInformation | NewCardFraudInformation | PartialUpdateCardFraudInformation>(
    cardFraudInformation: T
  ): RestOf<T> {
    return {
      ...cardFraudInformation,
      reportingDate: cardFraudInformation.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCardFraudInformation: RestCardFraudInformation): ICardFraudInformation {
    return {
      ...restCardFraudInformation,
      reportingDate: restCardFraudInformation.reportingDate ? dayjs(restCardFraudInformation.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCardFraudInformation>): HttpResponse<ICardFraudInformation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCardFraudInformation[]>): HttpResponse<ICardFraudInformation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
