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
import { IAccountAttribute, NewAccountAttribute } from '../account-attribute.model';

export type PartialUpdateAccountAttribute = Partial<IAccountAttribute> & Pick<IAccountAttribute, 'id'>;

type RestOf<T extends IAccountAttribute | NewAccountAttribute> = Omit<
  T,
  'reportingDate' | 'accountOpeningDate' | 'accountClosingDate' | 'accountStatusChangeDate' | 'expiryDate'
> & {
  reportingDate?: string | null;
  accountOpeningDate?: string | null;
  accountClosingDate?: string | null;
  accountStatusChangeDate?: string | null;
  expiryDate?: string | null;
};

export type RestAccountAttribute = RestOf<IAccountAttribute>;

export type NewRestAccountAttribute = RestOf<NewAccountAttribute>;

export type PartialUpdateRestAccountAttribute = RestOf<PartialUpdateAccountAttribute>;

export type EntityResponseType = HttpResponse<IAccountAttribute>;
export type EntityArrayResponseType = HttpResponse<IAccountAttribute[]>;

@Injectable({ providedIn: 'root' })
export class AccountAttributeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-attributes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/account-attributes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountAttribute: NewAccountAttribute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountAttribute);
    return this.http
      .post<RestAccountAttribute>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(accountAttribute: IAccountAttribute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountAttribute);
    return this.http
      .put<RestAccountAttribute>(`${this.resourceUrl}/${this.getAccountAttributeIdentifier(accountAttribute)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(accountAttribute: PartialUpdateAccountAttribute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountAttribute);
    return this.http
      .patch<RestAccountAttribute>(`${this.resourceUrl}/${this.getAccountAttributeIdentifier(accountAttribute)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAccountAttribute>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountAttribute[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountAttribute[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAccountAttributeIdentifier(accountAttribute: Pick<IAccountAttribute, 'id'>): number {
    return accountAttribute.id;
  }

  compareAccountAttribute(o1: Pick<IAccountAttribute, 'id'> | null, o2: Pick<IAccountAttribute, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountAttributeIdentifier(o1) === this.getAccountAttributeIdentifier(o2) : o1 === o2;
  }

  addAccountAttributeToCollectionIfMissing<Type extends Pick<IAccountAttribute, 'id'>>(
    accountAttributeCollection: Type[],
    ...accountAttributesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountAttributes: Type[] = accountAttributesToCheck.filter(isPresent);
    if (accountAttributes.length > 0) {
      const accountAttributeCollectionIdentifiers = accountAttributeCollection.map(
        accountAttributeItem => this.getAccountAttributeIdentifier(accountAttributeItem)!
      );
      const accountAttributesToAdd = accountAttributes.filter(accountAttributeItem => {
        const accountAttributeIdentifier = this.getAccountAttributeIdentifier(accountAttributeItem);
        if (accountAttributeCollectionIdentifiers.includes(accountAttributeIdentifier)) {
          return false;
        }
        accountAttributeCollectionIdentifiers.push(accountAttributeIdentifier);
        return true;
      });
      return [...accountAttributesToAdd, ...accountAttributeCollection];
    }
    return accountAttributeCollection;
  }

  protected convertDateFromClient<T extends IAccountAttribute | NewAccountAttribute | PartialUpdateAccountAttribute>(
    accountAttribute: T
  ): RestOf<T> {
    return {
      ...accountAttribute,
      reportingDate: accountAttribute.reportingDate?.format(DATE_FORMAT) ?? null,
      accountOpeningDate: accountAttribute.accountOpeningDate?.format(DATE_FORMAT) ?? null,
      accountClosingDate: accountAttribute.accountClosingDate?.format(DATE_FORMAT) ?? null,
      accountStatusChangeDate: accountAttribute.accountStatusChangeDate?.format(DATE_FORMAT) ?? null,
      expiryDate: accountAttribute.expiryDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAccountAttribute: RestAccountAttribute): IAccountAttribute {
    return {
      ...restAccountAttribute,
      reportingDate: restAccountAttribute.reportingDate ? dayjs(restAccountAttribute.reportingDate) : undefined,
      accountOpeningDate: restAccountAttribute.accountOpeningDate ? dayjs(restAccountAttribute.accountOpeningDate) : undefined,
      accountClosingDate: restAccountAttribute.accountClosingDate ? dayjs(restAccountAttribute.accountClosingDate) : undefined,
      accountStatusChangeDate: restAccountAttribute.accountStatusChangeDate
        ? dayjs(restAccountAttribute.accountStatusChangeDate)
        : undefined,
      expiryDate: restAccountAttribute.expiryDate ? dayjs(restAccountAttribute.expiryDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAccountAttribute>): HttpResponse<IAccountAttribute> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAccountAttribute[]>): HttpResponse<IAccountAttribute[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
