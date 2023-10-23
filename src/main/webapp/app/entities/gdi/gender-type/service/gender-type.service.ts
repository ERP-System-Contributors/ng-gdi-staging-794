import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IGenderType, NewGenderType } from '../gender-type.model';

export type PartialUpdateGenderType = Partial<IGenderType> & Pick<IGenderType, 'id'>;

export type EntityResponseType = HttpResponse<IGenderType>;
export type EntityArrayResponseType = HttpResponse<IGenderType[]>;

@Injectable({ providedIn: 'root' })
export class GenderTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/gender-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/gender-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(genderType: NewGenderType): Observable<EntityResponseType> {
    return this.http.post<IGenderType>(this.resourceUrl, genderType, { observe: 'response' });
  }

  update(genderType: IGenderType): Observable<EntityResponseType> {
    return this.http.put<IGenderType>(`${this.resourceUrl}/${this.getGenderTypeIdentifier(genderType)}`, genderType, {
      observe: 'response',
    });
  }

  partialUpdate(genderType: PartialUpdateGenderType): Observable<EntityResponseType> {
    return this.http.patch<IGenderType>(`${this.resourceUrl}/${this.getGenderTypeIdentifier(genderType)}`, genderType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenderType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenderType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenderType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getGenderTypeIdentifier(genderType: Pick<IGenderType, 'id'>): number {
    return genderType.id;
  }

  compareGenderType(o1: Pick<IGenderType, 'id'> | null, o2: Pick<IGenderType, 'id'> | null): boolean {
    return o1 && o2 ? this.getGenderTypeIdentifier(o1) === this.getGenderTypeIdentifier(o2) : o1 === o2;
  }

  addGenderTypeToCollectionIfMissing<Type extends Pick<IGenderType, 'id'>>(
    genderTypeCollection: Type[],
    ...genderTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const genderTypes: Type[] = genderTypesToCheck.filter(isPresent);
    if (genderTypes.length > 0) {
      const genderTypeCollectionIdentifiers = genderTypeCollection.map(genderTypeItem => this.getGenderTypeIdentifier(genderTypeItem)!);
      const genderTypesToAdd = genderTypes.filter(genderTypeItem => {
        const genderTypeIdentifier = this.getGenderTypeIdentifier(genderTypeItem);
        if (genderTypeCollectionIdentifiers.includes(genderTypeIdentifier)) {
          return false;
        }
        genderTypeCollectionIdentifiers.push(genderTypeIdentifier);
        return true;
      });
      return [...genderTypesToAdd, ...genderTypeCollection];
    }
    return genderTypeCollection;
  }
}
