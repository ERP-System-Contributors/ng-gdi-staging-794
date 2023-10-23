import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICommitteeType, NewCommitteeType } from '../committee-type.model';

export type PartialUpdateCommitteeType = Partial<ICommitteeType> & Pick<ICommitteeType, 'id'>;

export type EntityResponseType = HttpResponse<ICommitteeType>;
export type EntityArrayResponseType = HttpResponse<ICommitteeType[]>;

@Injectable({ providedIn: 'root' })
export class CommitteeTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/committee-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/committee-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(committeeType: NewCommitteeType): Observable<EntityResponseType> {
    return this.http.post<ICommitteeType>(this.resourceUrl, committeeType, { observe: 'response' });
  }

  update(committeeType: ICommitteeType): Observable<EntityResponseType> {
    return this.http.put<ICommitteeType>(`${this.resourceUrl}/${this.getCommitteeTypeIdentifier(committeeType)}`, committeeType, {
      observe: 'response',
    });
  }

  partialUpdate(committeeType: PartialUpdateCommitteeType): Observable<EntityResponseType> {
    return this.http.patch<ICommitteeType>(`${this.resourceUrl}/${this.getCommitteeTypeIdentifier(committeeType)}`, committeeType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommitteeType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommitteeType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommitteeType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCommitteeTypeIdentifier(committeeType: Pick<ICommitteeType, 'id'>): number {
    return committeeType.id;
  }

  compareCommitteeType(o1: Pick<ICommitteeType, 'id'> | null, o2: Pick<ICommitteeType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommitteeTypeIdentifier(o1) === this.getCommitteeTypeIdentifier(o2) : o1 === o2;
  }

  addCommitteeTypeToCollectionIfMissing<Type extends Pick<ICommitteeType, 'id'>>(
    committeeTypeCollection: Type[],
    ...committeeTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const committeeTypes: Type[] = committeeTypesToCheck.filter(isPresent);
    if (committeeTypes.length > 0) {
      const committeeTypeCollectionIdentifiers = committeeTypeCollection.map(
        committeeTypeItem => this.getCommitteeTypeIdentifier(committeeTypeItem)!
      );
      const committeeTypesToAdd = committeeTypes.filter(committeeTypeItem => {
        const committeeTypeIdentifier = this.getCommitteeTypeIdentifier(committeeTypeItem);
        if (committeeTypeCollectionIdentifiers.includes(committeeTypeIdentifier)) {
          return false;
        }
        committeeTypeCollectionIdentifiers.push(committeeTypeIdentifier);
        return true;
      });
      return [...committeeTypesToAdd, ...committeeTypeCollection];
    }
    return committeeTypeCollection;
  }
}
