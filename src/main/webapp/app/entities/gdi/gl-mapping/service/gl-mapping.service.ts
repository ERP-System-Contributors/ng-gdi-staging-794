import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IGlMapping, NewGlMapping } from '../gl-mapping.model';

export type PartialUpdateGlMapping = Partial<IGlMapping> & Pick<IGlMapping, 'id'>;

export type EntityResponseType = HttpResponse<IGlMapping>;
export type EntityArrayResponseType = HttpResponse<IGlMapping[]>;

@Injectable({ providedIn: 'root' })
export class GlMappingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/gl-mappings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/gl-mappings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(glMapping: NewGlMapping): Observable<EntityResponseType> {
    return this.http.post<IGlMapping>(this.resourceUrl, glMapping, { observe: 'response' });
  }

  update(glMapping: IGlMapping): Observable<EntityResponseType> {
    return this.http.put<IGlMapping>(`${this.resourceUrl}/${this.getGlMappingIdentifier(glMapping)}`, glMapping, { observe: 'response' });
  }

  partialUpdate(glMapping: PartialUpdateGlMapping): Observable<EntityResponseType> {
    return this.http.patch<IGlMapping>(`${this.resourceUrl}/${this.getGlMappingIdentifier(glMapping)}`, glMapping, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGlMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGlMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGlMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getGlMappingIdentifier(glMapping: Pick<IGlMapping, 'id'>): number {
    return glMapping.id;
  }

  compareGlMapping(o1: Pick<IGlMapping, 'id'> | null, o2: Pick<IGlMapping, 'id'> | null): boolean {
    return o1 && o2 ? this.getGlMappingIdentifier(o1) === this.getGlMappingIdentifier(o2) : o1 === o2;
  }

  addGlMappingToCollectionIfMissing<Type extends Pick<IGlMapping, 'id'>>(
    glMappingCollection: Type[],
    ...glMappingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const glMappings: Type[] = glMappingsToCheck.filter(isPresent);
    if (glMappings.length > 0) {
      const glMappingCollectionIdentifiers = glMappingCollection.map(glMappingItem => this.getGlMappingIdentifier(glMappingItem)!);
      const glMappingsToAdd = glMappings.filter(glMappingItem => {
        const glMappingIdentifier = this.getGlMappingIdentifier(glMappingItem);
        if (glMappingCollectionIdentifiers.includes(glMappingIdentifier)) {
          return false;
        }
        glMappingCollectionIdentifiers.push(glMappingIdentifier);
        return true;
      });
      return [...glMappingsToAdd, ...glMappingCollection];
    }
    return glMappingCollection;
  }
}
