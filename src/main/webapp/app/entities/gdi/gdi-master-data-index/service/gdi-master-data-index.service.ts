import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IGdiMasterDataIndex, NewGdiMasterDataIndex } from '../gdi-master-data-index.model';

export type PartialUpdateGdiMasterDataIndex = Partial<IGdiMasterDataIndex> & Pick<IGdiMasterDataIndex, 'id'>;

export type EntityResponseType = HttpResponse<IGdiMasterDataIndex>;
export type EntityArrayResponseType = HttpResponse<IGdiMasterDataIndex[]>;

@Injectable({ providedIn: 'root' })
export class GdiMasterDataIndexService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/gdi-master-data-indices');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/gdi-master-data-indices');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(gdiMasterDataIndex: NewGdiMasterDataIndex): Observable<EntityResponseType> {
    return this.http.post<IGdiMasterDataIndex>(this.resourceUrl, gdiMasterDataIndex, { observe: 'response' });
  }

  update(gdiMasterDataIndex: IGdiMasterDataIndex): Observable<EntityResponseType> {
    return this.http.put<IGdiMasterDataIndex>(
      `${this.resourceUrl}/${this.getGdiMasterDataIndexIdentifier(gdiMasterDataIndex)}`,
      gdiMasterDataIndex,
      { observe: 'response' }
    );
  }

  partialUpdate(gdiMasterDataIndex: PartialUpdateGdiMasterDataIndex): Observable<EntityResponseType> {
    return this.http.patch<IGdiMasterDataIndex>(
      `${this.resourceUrl}/${this.getGdiMasterDataIndexIdentifier(gdiMasterDataIndex)}`,
      gdiMasterDataIndex,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGdiMasterDataIndex>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGdiMasterDataIndex[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGdiMasterDataIndex[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getGdiMasterDataIndexIdentifier(gdiMasterDataIndex: Pick<IGdiMasterDataIndex, 'id'>): number {
    return gdiMasterDataIndex.id;
  }

  compareGdiMasterDataIndex(o1: Pick<IGdiMasterDataIndex, 'id'> | null, o2: Pick<IGdiMasterDataIndex, 'id'> | null): boolean {
    return o1 && o2 ? this.getGdiMasterDataIndexIdentifier(o1) === this.getGdiMasterDataIndexIdentifier(o2) : o1 === o2;
  }

  addGdiMasterDataIndexToCollectionIfMissing<Type extends Pick<IGdiMasterDataIndex, 'id'>>(
    gdiMasterDataIndexCollection: Type[],
    ...gdiMasterDataIndicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const gdiMasterDataIndices: Type[] = gdiMasterDataIndicesToCheck.filter(isPresent);
    if (gdiMasterDataIndices.length > 0) {
      const gdiMasterDataIndexCollectionIdentifiers = gdiMasterDataIndexCollection.map(
        gdiMasterDataIndexItem => this.getGdiMasterDataIndexIdentifier(gdiMasterDataIndexItem)!
      );
      const gdiMasterDataIndicesToAdd = gdiMasterDataIndices.filter(gdiMasterDataIndexItem => {
        const gdiMasterDataIndexIdentifier = this.getGdiMasterDataIndexIdentifier(gdiMasterDataIndexItem);
        if (gdiMasterDataIndexCollectionIdentifiers.includes(gdiMasterDataIndexIdentifier)) {
          return false;
        }
        gdiMasterDataIndexCollectionIdentifiers.push(gdiMasterDataIndexIdentifier);
        return true;
      });
      return [...gdiMasterDataIndicesToAdd, ...gdiMasterDataIndexCollection];
    }
    return gdiMasterDataIndexCollection;
  }
}
