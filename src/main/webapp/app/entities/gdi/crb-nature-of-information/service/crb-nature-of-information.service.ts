import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbNatureOfInformation, NewCrbNatureOfInformation } from '../crb-nature-of-information.model';

export type PartialUpdateCrbNatureOfInformation = Partial<ICrbNatureOfInformation> & Pick<ICrbNatureOfInformation, 'id'>;

export type EntityResponseType = HttpResponse<ICrbNatureOfInformation>;
export type EntityArrayResponseType = HttpResponse<ICrbNatureOfInformation[]>;

@Injectable({ providedIn: 'root' })
export class CrbNatureOfInformationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-nature-of-informations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-nature-of-informations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbNatureOfInformation: NewCrbNatureOfInformation): Observable<EntityResponseType> {
    return this.http.post<ICrbNatureOfInformation>(this.resourceUrl, crbNatureOfInformation, { observe: 'response' });
  }

  update(crbNatureOfInformation: ICrbNatureOfInformation): Observable<EntityResponseType> {
    return this.http.put<ICrbNatureOfInformation>(
      `${this.resourceUrl}/${this.getCrbNatureOfInformationIdentifier(crbNatureOfInformation)}`,
      crbNatureOfInformation,
      { observe: 'response' }
    );
  }

  partialUpdate(crbNatureOfInformation: PartialUpdateCrbNatureOfInformation): Observable<EntityResponseType> {
    return this.http.patch<ICrbNatureOfInformation>(
      `${this.resourceUrl}/${this.getCrbNatureOfInformationIdentifier(crbNatureOfInformation)}`,
      crbNatureOfInformation,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbNatureOfInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbNatureOfInformation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbNatureOfInformation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbNatureOfInformationIdentifier(crbNatureOfInformation: Pick<ICrbNatureOfInformation, 'id'>): number {
    return crbNatureOfInformation.id;
  }

  compareCrbNatureOfInformation(o1: Pick<ICrbNatureOfInformation, 'id'> | null, o2: Pick<ICrbNatureOfInformation, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbNatureOfInformationIdentifier(o1) === this.getCrbNatureOfInformationIdentifier(o2) : o1 === o2;
  }

  addCrbNatureOfInformationToCollectionIfMissing<Type extends Pick<ICrbNatureOfInformation, 'id'>>(
    crbNatureOfInformationCollection: Type[],
    ...crbNatureOfInformationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbNatureOfInformations: Type[] = crbNatureOfInformationsToCheck.filter(isPresent);
    if (crbNatureOfInformations.length > 0) {
      const crbNatureOfInformationCollectionIdentifiers = crbNatureOfInformationCollection.map(
        crbNatureOfInformationItem => this.getCrbNatureOfInformationIdentifier(crbNatureOfInformationItem)!
      );
      const crbNatureOfInformationsToAdd = crbNatureOfInformations.filter(crbNatureOfInformationItem => {
        const crbNatureOfInformationIdentifier = this.getCrbNatureOfInformationIdentifier(crbNatureOfInformationItem);
        if (crbNatureOfInformationCollectionIdentifiers.includes(crbNatureOfInformationIdentifier)) {
          return false;
        }
        crbNatureOfInformationCollectionIdentifiers.push(crbNatureOfInformationIdentifier);
        return true;
      });
      return [...crbNatureOfInformationsToAdd, ...crbNatureOfInformationCollection];
    }
    return crbNatureOfInformationCollection;
  }
}
