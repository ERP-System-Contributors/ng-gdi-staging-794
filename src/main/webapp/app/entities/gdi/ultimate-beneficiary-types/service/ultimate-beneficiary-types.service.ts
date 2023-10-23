import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IUltimateBeneficiaryTypes, NewUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';

export type PartialUpdateUltimateBeneficiaryTypes = Partial<IUltimateBeneficiaryTypes> & Pick<IUltimateBeneficiaryTypes, 'id'>;

export type EntityResponseType = HttpResponse<IUltimateBeneficiaryTypes>;
export type EntityArrayResponseType = HttpResponse<IUltimateBeneficiaryTypes[]>;

@Injectable({ providedIn: 'root' })
export class UltimateBeneficiaryTypesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ultimate-beneficiary-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/ultimate-beneficiary-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ultimateBeneficiaryTypes: NewUltimateBeneficiaryTypes): Observable<EntityResponseType> {
    return this.http.post<IUltimateBeneficiaryTypes>(this.resourceUrl, ultimateBeneficiaryTypes, { observe: 'response' });
  }

  update(ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes): Observable<EntityResponseType> {
    return this.http.put<IUltimateBeneficiaryTypes>(
      `${this.resourceUrl}/${this.getUltimateBeneficiaryTypesIdentifier(ultimateBeneficiaryTypes)}`,
      ultimateBeneficiaryTypes,
      { observe: 'response' }
    );
  }

  partialUpdate(ultimateBeneficiaryTypes: PartialUpdateUltimateBeneficiaryTypes): Observable<EntityResponseType> {
    return this.http.patch<IUltimateBeneficiaryTypes>(
      `${this.resourceUrl}/${this.getUltimateBeneficiaryTypesIdentifier(ultimateBeneficiaryTypes)}`,
      ultimateBeneficiaryTypes,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUltimateBeneficiaryTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUltimateBeneficiaryTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUltimateBeneficiaryTypes[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getUltimateBeneficiaryTypesIdentifier(ultimateBeneficiaryTypes: Pick<IUltimateBeneficiaryTypes, 'id'>): number {
    return ultimateBeneficiaryTypes.id;
  }

  compareUltimateBeneficiaryTypes(
    o1: Pick<IUltimateBeneficiaryTypes, 'id'> | null,
    o2: Pick<IUltimateBeneficiaryTypes, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getUltimateBeneficiaryTypesIdentifier(o1) === this.getUltimateBeneficiaryTypesIdentifier(o2) : o1 === o2;
  }

  addUltimateBeneficiaryTypesToCollectionIfMissing<Type extends Pick<IUltimateBeneficiaryTypes, 'id'>>(
    ultimateBeneficiaryTypesCollection: Type[],
    ...ultimateBeneficiaryTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ultimateBeneficiaryTypes: Type[] = ultimateBeneficiaryTypesToCheck.filter(isPresent);
    if (ultimateBeneficiaryTypes.length > 0) {
      const ultimateBeneficiaryTypesCollectionIdentifiers = ultimateBeneficiaryTypesCollection.map(
        ultimateBeneficiaryTypesItem => this.getUltimateBeneficiaryTypesIdentifier(ultimateBeneficiaryTypesItem)!
      );
      const ultimateBeneficiaryTypesToAdd = ultimateBeneficiaryTypes.filter(ultimateBeneficiaryTypesItem => {
        const ultimateBeneficiaryTypesIdentifier = this.getUltimateBeneficiaryTypesIdentifier(ultimateBeneficiaryTypesItem);
        if (ultimateBeneficiaryTypesCollectionIdentifiers.includes(ultimateBeneficiaryTypesIdentifier)) {
          return false;
        }
        ultimateBeneficiaryTypesCollectionIdentifiers.push(ultimateBeneficiaryTypesIdentifier);
        return true;
      });
      return [...ultimateBeneficiaryTypesToAdd, ...ultimateBeneficiaryTypesCollection];
    }
    return ultimateBeneficiaryTypesCollection;
  }
}
