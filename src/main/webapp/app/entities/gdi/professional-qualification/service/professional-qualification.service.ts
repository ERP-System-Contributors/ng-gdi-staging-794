import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IProfessionalQualification, NewProfessionalQualification } from '../professional-qualification.model';

export type PartialUpdateProfessionalQualification = Partial<IProfessionalQualification> & Pick<IProfessionalQualification, 'id'>;

export type EntityResponseType = HttpResponse<IProfessionalQualification>;
export type EntityArrayResponseType = HttpResponse<IProfessionalQualification[]>;

@Injectable({ providedIn: 'root' })
export class ProfessionalQualificationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/professional-qualifications');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/professional-qualifications');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(professionalQualification: NewProfessionalQualification): Observable<EntityResponseType> {
    return this.http.post<IProfessionalQualification>(this.resourceUrl, professionalQualification, { observe: 'response' });
  }

  update(professionalQualification: IProfessionalQualification): Observable<EntityResponseType> {
    return this.http.put<IProfessionalQualification>(
      `${this.resourceUrl}/${this.getProfessionalQualificationIdentifier(professionalQualification)}`,
      professionalQualification,
      { observe: 'response' }
    );
  }

  partialUpdate(professionalQualification: PartialUpdateProfessionalQualification): Observable<EntityResponseType> {
    return this.http.patch<IProfessionalQualification>(
      `${this.resourceUrl}/${this.getProfessionalQualificationIdentifier(professionalQualification)}`,
      professionalQualification,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfessionalQualification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfessionalQualification[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfessionalQualification[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getProfessionalQualificationIdentifier(professionalQualification: Pick<IProfessionalQualification, 'id'>): number {
    return professionalQualification.id;
  }

  compareProfessionalQualification(
    o1: Pick<IProfessionalQualification, 'id'> | null,
    o2: Pick<IProfessionalQualification, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getProfessionalQualificationIdentifier(o1) === this.getProfessionalQualificationIdentifier(o2) : o1 === o2;
  }

  addProfessionalQualificationToCollectionIfMissing<Type extends Pick<IProfessionalQualification, 'id'>>(
    professionalQualificationCollection: Type[],
    ...professionalQualificationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const professionalQualifications: Type[] = professionalQualificationsToCheck.filter(isPresent);
    if (professionalQualifications.length > 0) {
      const professionalQualificationCollectionIdentifiers = professionalQualificationCollection.map(
        professionalQualificationItem => this.getProfessionalQualificationIdentifier(professionalQualificationItem)!
      );
      const professionalQualificationsToAdd = professionalQualifications.filter(professionalQualificationItem => {
        const professionalQualificationIdentifier = this.getProfessionalQualificationIdentifier(professionalQualificationItem);
        if (professionalQualificationCollectionIdentifiers.includes(professionalQualificationIdentifier)) {
          return false;
        }
        professionalQualificationCollectionIdentifiers.push(professionalQualificationIdentifier);
        return true;
      });
      return [...professionalQualificationsToAdd, ...professionalQualificationCollection];
    }
    return professionalQualificationCollection;
  }
}
