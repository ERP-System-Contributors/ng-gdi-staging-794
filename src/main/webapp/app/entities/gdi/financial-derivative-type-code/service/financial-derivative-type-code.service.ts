import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFinancialDerivativeTypeCode, NewFinancialDerivativeTypeCode } from '../financial-derivative-type-code.model';

export type PartialUpdateFinancialDerivativeTypeCode = Partial<IFinancialDerivativeTypeCode> & Pick<IFinancialDerivativeTypeCode, 'id'>;

export type EntityResponseType = HttpResponse<IFinancialDerivativeTypeCode>;
export type EntityArrayResponseType = HttpResponse<IFinancialDerivativeTypeCode[]>;

@Injectable({ providedIn: 'root' })
export class FinancialDerivativeTypeCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/financial-derivative-type-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/financial-derivative-type-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(financialDerivativeTypeCode: NewFinancialDerivativeTypeCode): Observable<EntityResponseType> {
    return this.http.post<IFinancialDerivativeTypeCode>(this.resourceUrl, financialDerivativeTypeCode, { observe: 'response' });
  }

  update(financialDerivativeTypeCode: IFinancialDerivativeTypeCode): Observable<EntityResponseType> {
    return this.http.put<IFinancialDerivativeTypeCode>(
      `${this.resourceUrl}/${this.getFinancialDerivativeTypeCodeIdentifier(financialDerivativeTypeCode)}`,
      financialDerivativeTypeCode,
      { observe: 'response' }
    );
  }

  partialUpdate(financialDerivativeTypeCode: PartialUpdateFinancialDerivativeTypeCode): Observable<EntityResponseType> {
    return this.http.patch<IFinancialDerivativeTypeCode>(
      `${this.resourceUrl}/${this.getFinancialDerivativeTypeCodeIdentifier(financialDerivativeTypeCode)}`,
      financialDerivativeTypeCode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFinancialDerivativeTypeCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFinancialDerivativeTypeCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFinancialDerivativeTypeCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFinancialDerivativeTypeCodeIdentifier(financialDerivativeTypeCode: Pick<IFinancialDerivativeTypeCode, 'id'>): number {
    return financialDerivativeTypeCode.id;
  }

  compareFinancialDerivativeTypeCode(
    o1: Pick<IFinancialDerivativeTypeCode, 'id'> | null,
    o2: Pick<IFinancialDerivativeTypeCode, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getFinancialDerivativeTypeCodeIdentifier(o1) === this.getFinancialDerivativeTypeCodeIdentifier(o2) : o1 === o2;
  }

  addFinancialDerivativeTypeCodeToCollectionIfMissing<Type extends Pick<IFinancialDerivativeTypeCode, 'id'>>(
    financialDerivativeTypeCodeCollection: Type[],
    ...financialDerivativeTypeCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const financialDerivativeTypeCodes: Type[] = financialDerivativeTypeCodesToCheck.filter(isPresent);
    if (financialDerivativeTypeCodes.length > 0) {
      const financialDerivativeTypeCodeCollectionIdentifiers = financialDerivativeTypeCodeCollection.map(
        financialDerivativeTypeCodeItem => this.getFinancialDerivativeTypeCodeIdentifier(financialDerivativeTypeCodeItem)!
      );
      const financialDerivativeTypeCodesToAdd = financialDerivativeTypeCodes.filter(financialDerivativeTypeCodeItem => {
        const financialDerivativeTypeCodeIdentifier = this.getFinancialDerivativeTypeCodeIdentifier(financialDerivativeTypeCodeItem);
        if (financialDerivativeTypeCodeCollectionIdentifiers.includes(financialDerivativeTypeCodeIdentifier)) {
          return false;
        }
        financialDerivativeTypeCodeCollectionIdentifiers.push(financialDerivativeTypeCodeIdentifier);
        return true;
      });
      return [...financialDerivativeTypeCodesToAdd, ...financialDerivativeTypeCodeCollection];
    }
    return financialDerivativeTypeCodeCollection;
  }
}
