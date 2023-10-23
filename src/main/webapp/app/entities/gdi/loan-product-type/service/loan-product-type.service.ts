import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILoanProductType, NewLoanProductType } from '../loan-product-type.model';

export type PartialUpdateLoanProductType = Partial<ILoanProductType> & Pick<ILoanProductType, 'id'>;

export type EntityResponseType = HttpResponse<ILoanProductType>;
export type EntityArrayResponseType = HttpResponse<ILoanProductType[]>;

@Injectable({ providedIn: 'root' })
export class LoanProductTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-product-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-product-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanProductType: NewLoanProductType): Observable<EntityResponseType> {
    return this.http.post<ILoanProductType>(this.resourceUrl, loanProductType, { observe: 'response' });
  }

  update(loanProductType: ILoanProductType): Observable<EntityResponseType> {
    return this.http.put<ILoanProductType>(`${this.resourceUrl}/${this.getLoanProductTypeIdentifier(loanProductType)}`, loanProductType, {
      observe: 'response',
    });
  }

  partialUpdate(loanProductType: PartialUpdateLoanProductType): Observable<EntityResponseType> {
    return this.http.patch<ILoanProductType>(`${this.resourceUrl}/${this.getLoanProductTypeIdentifier(loanProductType)}`, loanProductType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanProductType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanProductType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanProductType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanProductTypeIdentifier(loanProductType: Pick<ILoanProductType, 'id'>): number {
    return loanProductType.id;
  }

  compareLoanProductType(o1: Pick<ILoanProductType, 'id'> | null, o2: Pick<ILoanProductType, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanProductTypeIdentifier(o1) === this.getLoanProductTypeIdentifier(o2) : o1 === o2;
  }

  addLoanProductTypeToCollectionIfMissing<Type extends Pick<ILoanProductType, 'id'>>(
    loanProductTypeCollection: Type[],
    ...loanProductTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanProductTypes: Type[] = loanProductTypesToCheck.filter(isPresent);
    if (loanProductTypes.length > 0) {
      const loanProductTypeCollectionIdentifiers = loanProductTypeCollection.map(
        loanProductTypeItem => this.getLoanProductTypeIdentifier(loanProductTypeItem)!
      );
      const loanProductTypesToAdd = loanProductTypes.filter(loanProductTypeItem => {
        const loanProductTypeIdentifier = this.getLoanProductTypeIdentifier(loanProductTypeItem);
        if (loanProductTypeCollectionIdentifiers.includes(loanProductTypeIdentifier)) {
          return false;
        }
        loanProductTypeCollectionIdentifiers.push(loanProductTypeIdentifier);
        return true;
      });
      return [...loanProductTypesToAdd, ...loanProductTypeCollection];
    }
    return loanProductTypeCollection;
  }
}
