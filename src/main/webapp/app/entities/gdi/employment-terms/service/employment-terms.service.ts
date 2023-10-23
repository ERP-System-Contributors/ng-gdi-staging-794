import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IEmploymentTerms, NewEmploymentTerms } from '../employment-terms.model';

export type PartialUpdateEmploymentTerms = Partial<IEmploymentTerms> & Pick<IEmploymentTerms, 'id'>;

export type EntityResponseType = HttpResponse<IEmploymentTerms>;
export type EntityArrayResponseType = HttpResponse<IEmploymentTerms[]>;

@Injectable({ providedIn: 'root' })
export class EmploymentTermsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employment-terms');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/employment-terms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employmentTerms: NewEmploymentTerms): Observable<EntityResponseType> {
    return this.http.post<IEmploymentTerms>(this.resourceUrl, employmentTerms, { observe: 'response' });
  }

  update(employmentTerms: IEmploymentTerms): Observable<EntityResponseType> {
    return this.http.put<IEmploymentTerms>(`${this.resourceUrl}/${this.getEmploymentTermsIdentifier(employmentTerms)}`, employmentTerms, {
      observe: 'response',
    });
  }

  partialUpdate(employmentTerms: PartialUpdateEmploymentTerms): Observable<EntityResponseType> {
    return this.http.patch<IEmploymentTerms>(`${this.resourceUrl}/${this.getEmploymentTermsIdentifier(employmentTerms)}`, employmentTerms, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmploymentTerms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmploymentTerms[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmploymentTerms[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getEmploymentTermsIdentifier(employmentTerms: Pick<IEmploymentTerms, 'id'>): number {
    return employmentTerms.id;
  }

  compareEmploymentTerms(o1: Pick<IEmploymentTerms, 'id'> | null, o2: Pick<IEmploymentTerms, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmploymentTermsIdentifier(o1) === this.getEmploymentTermsIdentifier(o2) : o1 === o2;
  }

  addEmploymentTermsToCollectionIfMissing<Type extends Pick<IEmploymentTerms, 'id'>>(
    employmentTermsCollection: Type[],
    ...employmentTermsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employmentTerms: Type[] = employmentTermsToCheck.filter(isPresent);
    if (employmentTerms.length > 0) {
      const employmentTermsCollectionIdentifiers = employmentTermsCollection.map(
        employmentTermsItem => this.getEmploymentTermsIdentifier(employmentTermsItem)!
      );
      const employmentTermsToAdd = employmentTerms.filter(employmentTermsItem => {
        const employmentTermsIdentifier = this.getEmploymentTermsIdentifier(employmentTermsItem);
        if (employmentTermsCollectionIdentifiers.includes(employmentTermsIdentifier)) {
          return false;
        }
        employmentTermsCollectionIdentifiers.push(employmentTermsIdentifier);
        return true;
      });
      return [...employmentTermsToAdd, ...employmentTermsCollection];
    }
    return employmentTermsCollection;
  }
}
