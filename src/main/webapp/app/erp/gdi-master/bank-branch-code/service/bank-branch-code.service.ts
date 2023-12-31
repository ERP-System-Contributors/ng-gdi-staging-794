///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IBankBranchCode, NewBankBranchCode } from '../bank-branch-code.model';

export type PartialUpdateBankBranchCode = Partial<IBankBranchCode> & Pick<IBankBranchCode, 'id'>;

export type EntityResponseType = HttpResponse<IBankBranchCode>;
export type EntityArrayResponseType = HttpResponse<IBankBranchCode[]>;

@Injectable({ providedIn: 'root' })
export class BankBranchCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bank-branch-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/bank-branch-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(bankBranchCode: NewBankBranchCode): Observable<EntityResponseType> {
    return this.http.post<IBankBranchCode>(this.resourceUrl, bankBranchCode, { observe: 'response' });
  }

  update(bankBranchCode: IBankBranchCode): Observable<EntityResponseType> {
    return this.http.put<IBankBranchCode>(`${this.resourceUrl}/${this.getBankBranchCodeIdentifier(bankBranchCode)}`, bankBranchCode, {
      observe: 'response',
    });
  }

  partialUpdate(bankBranchCode: PartialUpdateBankBranchCode): Observable<EntityResponseType> {
    return this.http.patch<IBankBranchCode>(`${this.resourceUrl}/${this.getBankBranchCodeIdentifier(bankBranchCode)}`, bankBranchCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBankBranchCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBankBranchCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBankBranchCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getBankBranchCodeIdentifier(bankBranchCode: Pick<IBankBranchCode, 'id'>): number {
    return bankBranchCode.id;
  }

  compareBankBranchCode(o1: Pick<IBankBranchCode, 'id'> | null, o2: Pick<IBankBranchCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getBankBranchCodeIdentifier(o1) === this.getBankBranchCodeIdentifier(o2) : o1 === o2;
  }

  addBankBranchCodeToCollectionIfMissing<Type extends Pick<IBankBranchCode, 'id'>>(
    bankBranchCodeCollection: Type[],
    ...bankBranchCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bankBranchCodes: Type[] = bankBranchCodesToCheck.filter(isPresent);
    if (bankBranchCodes.length > 0) {
      const bankBranchCodeCollectionIdentifiers = bankBranchCodeCollection.map(
        bankBranchCodeItem => this.getBankBranchCodeIdentifier(bankBranchCodeItem)!
      );
      const bankBranchCodesToAdd = bankBranchCodes.filter(bankBranchCodeItem => {
        const bankBranchCodeIdentifier = this.getBankBranchCodeIdentifier(bankBranchCodeItem);
        if (bankBranchCodeCollectionIdentifiers.includes(bankBranchCodeIdentifier)) {
          return false;
        }
        bankBranchCodeCollectionIdentifiers.push(bankBranchCodeIdentifier);
        return true;
      });
      return [...bankBranchCodesToAdd, ...bankBranchCodeCollection];
    }
    return bankBranchCodeCollection;
  }
}
