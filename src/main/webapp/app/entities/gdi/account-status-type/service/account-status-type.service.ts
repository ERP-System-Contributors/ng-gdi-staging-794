import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAccountStatusType, NewAccountStatusType } from '../account-status-type.model';

export type PartialUpdateAccountStatusType = Partial<IAccountStatusType> & Pick<IAccountStatusType, 'id'>;

export type EntityResponseType = HttpResponse<IAccountStatusType>;
export type EntityArrayResponseType = HttpResponse<IAccountStatusType[]>;

@Injectable({ providedIn: 'root' })
export class AccountStatusTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-status-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/account-status-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountStatusType: NewAccountStatusType): Observable<EntityResponseType> {
    return this.http.post<IAccountStatusType>(this.resourceUrl, accountStatusType, { observe: 'response' });
  }

  update(accountStatusType: IAccountStatusType): Observable<EntityResponseType> {
    return this.http.put<IAccountStatusType>(
      `${this.resourceUrl}/${this.getAccountStatusTypeIdentifier(accountStatusType)}`,
      accountStatusType,
      { observe: 'response' }
    );
  }

  partialUpdate(accountStatusType: PartialUpdateAccountStatusType): Observable<EntityResponseType> {
    return this.http.patch<IAccountStatusType>(
      `${this.resourceUrl}/${this.getAccountStatusTypeIdentifier(accountStatusType)}`,
      accountStatusType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccountStatusType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountStatusType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountStatusType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAccountStatusTypeIdentifier(accountStatusType: Pick<IAccountStatusType, 'id'>): number {
    return accountStatusType.id;
  }

  compareAccountStatusType(o1: Pick<IAccountStatusType, 'id'> | null, o2: Pick<IAccountStatusType, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountStatusTypeIdentifier(o1) === this.getAccountStatusTypeIdentifier(o2) : o1 === o2;
  }

  addAccountStatusTypeToCollectionIfMissing<Type extends Pick<IAccountStatusType, 'id'>>(
    accountStatusTypeCollection: Type[],
    ...accountStatusTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountStatusTypes: Type[] = accountStatusTypesToCheck.filter(isPresent);
    if (accountStatusTypes.length > 0) {
      const accountStatusTypeCollectionIdentifiers = accountStatusTypeCollection.map(
        accountStatusTypeItem => this.getAccountStatusTypeIdentifier(accountStatusTypeItem)!
      );
      const accountStatusTypesToAdd = accountStatusTypes.filter(accountStatusTypeItem => {
        const accountStatusTypeIdentifier = this.getAccountStatusTypeIdentifier(accountStatusTypeItem);
        if (accountStatusTypeCollectionIdentifiers.includes(accountStatusTypeIdentifier)) {
          return false;
        }
        accountStatusTypeCollectionIdentifiers.push(accountStatusTypeIdentifier);
        return true;
      });
      return [...accountStatusTypesToAdd, ...accountStatusTypeCollection];
    }
    return accountStatusTypeCollection;
  }
}
