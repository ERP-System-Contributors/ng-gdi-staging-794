import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IInstitutionContactDetails, NewInstitutionContactDetails } from '../institution-contact-details.model';

export type PartialUpdateInstitutionContactDetails = Partial<IInstitutionContactDetails> & Pick<IInstitutionContactDetails, 'id'>;

export type EntityResponseType = HttpResponse<IInstitutionContactDetails>;
export type EntityArrayResponseType = HttpResponse<IInstitutionContactDetails[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionContactDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institution-contact-details');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/institution-contact-details');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(institutionContactDetails: NewInstitutionContactDetails): Observable<EntityResponseType> {
    return this.http.post<IInstitutionContactDetails>(this.resourceUrl, institutionContactDetails, { observe: 'response' });
  }

  update(institutionContactDetails: IInstitutionContactDetails): Observable<EntityResponseType> {
    return this.http.put<IInstitutionContactDetails>(
      `${this.resourceUrl}/${this.getInstitutionContactDetailsIdentifier(institutionContactDetails)}`,
      institutionContactDetails,
      { observe: 'response' }
    );
  }

  partialUpdate(institutionContactDetails: PartialUpdateInstitutionContactDetails): Observable<EntityResponseType> {
    return this.http.patch<IInstitutionContactDetails>(
      `${this.resourceUrl}/${this.getInstitutionContactDetailsIdentifier(institutionContactDetails)}`,
      institutionContactDetails,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstitutionContactDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionContactDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionContactDetails[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getInstitutionContactDetailsIdentifier(institutionContactDetails: Pick<IInstitutionContactDetails, 'id'>): number {
    return institutionContactDetails.id;
  }

  compareInstitutionContactDetails(
    o1: Pick<IInstitutionContactDetails, 'id'> | null,
    o2: Pick<IInstitutionContactDetails, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getInstitutionContactDetailsIdentifier(o1) === this.getInstitutionContactDetailsIdentifier(o2) : o1 === o2;
  }

  addInstitutionContactDetailsToCollectionIfMissing<Type extends Pick<IInstitutionContactDetails, 'id'>>(
    institutionContactDetailsCollection: Type[],
    ...institutionContactDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const institutionContactDetails: Type[] = institutionContactDetailsToCheck.filter(isPresent);
    if (institutionContactDetails.length > 0) {
      const institutionContactDetailsCollectionIdentifiers = institutionContactDetailsCollection.map(
        institutionContactDetailsItem => this.getInstitutionContactDetailsIdentifier(institutionContactDetailsItem)!
      );
      const institutionContactDetailsToAdd = institutionContactDetails.filter(institutionContactDetailsItem => {
        const institutionContactDetailsIdentifier = this.getInstitutionContactDetailsIdentifier(institutionContactDetailsItem);
        if (institutionContactDetailsCollectionIdentifiers.includes(institutionContactDetailsIdentifier)) {
          return false;
        }
        institutionContactDetailsCollectionIdentifiers.push(institutionContactDetailsIdentifier);
        return true;
      });
      return [...institutionContactDetailsToAdd, ...institutionContactDetailsCollection];
    }
    return institutionContactDetailsCollection;
  }
}
