import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAccountType, NewAccountType } from '../account-type.model';

export type PartialUpdateAccountType = Partial<IAccountType> & Pick<IAccountType, 'id'>;

export type EntityResponseType = HttpResponse<IAccountType>;
export type EntityArrayResponseType = HttpResponse<IAccountType[]>;

@Injectable({ providedIn: 'root' })
export class AccountTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/account-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountType: NewAccountType): Observable<EntityResponseType> {
    return this.http.post<IAccountType>(this.resourceUrl, accountType, { observe: 'response' });
  }

  update(accountType: IAccountType): Observable<EntityResponseType> {
    return this.http.put<IAccountType>(`${this.resourceUrl}/${this.getAccountTypeIdentifier(accountType)}`, accountType, {
      observe: 'response',
    });
  }

  partialUpdate(accountType: PartialUpdateAccountType): Observable<EntityResponseType> {
    return this.http.patch<IAccountType>(`${this.resourceUrl}/${this.getAccountTypeIdentifier(accountType)}`, accountType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccountType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAccountTypeIdentifier(accountType: Pick<IAccountType, 'id'>): number {
    return accountType.id;
  }

  compareAccountType(o1: Pick<IAccountType, 'id'> | null, o2: Pick<IAccountType, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountTypeIdentifier(o1) === this.getAccountTypeIdentifier(o2) : o1 === o2;
  }

  addAccountTypeToCollectionIfMissing<Type extends Pick<IAccountType, 'id'>>(
    accountTypeCollection: Type[],
    ...accountTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountTypes: Type[] = accountTypesToCheck.filter(isPresent);
    if (accountTypes.length > 0) {
      const accountTypeCollectionIdentifiers = accountTypeCollection.map(
        accountTypeItem => this.getAccountTypeIdentifier(accountTypeItem)!
      );
      const accountTypesToAdd = accountTypes.filter(accountTypeItem => {
        const accountTypeIdentifier = this.getAccountTypeIdentifier(accountTypeItem);
        if (accountTypeCollectionIdentifiers.includes(accountTypeIdentifier)) {
          return false;
        }
        accountTypeCollectionIdentifiers.push(accountTypeIdentifier);
        return true;
      });
      return [...accountTypesToAdd, ...accountTypeCollection];
    }
    return accountTypeCollection;
  }
}
