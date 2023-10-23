import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IGdiTransactionDataIndex, NewGdiTransactionDataIndex } from '../gdi-transaction-data-index.model';

export type PartialUpdateGdiTransactionDataIndex = Partial<IGdiTransactionDataIndex> & Pick<IGdiTransactionDataIndex, 'id'>;

export type EntityResponseType = HttpResponse<IGdiTransactionDataIndex>;
export type EntityArrayResponseType = HttpResponse<IGdiTransactionDataIndex[]>;

@Injectable({ providedIn: 'root' })
export class GdiTransactionDataIndexService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/gdi-transaction-data-indices');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/gdi-transaction-data-indices');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(gdiTransactionDataIndex: NewGdiTransactionDataIndex): Observable<EntityResponseType> {
    return this.http.post<IGdiTransactionDataIndex>(this.resourceUrl, gdiTransactionDataIndex, { observe: 'response' });
  }

  update(gdiTransactionDataIndex: IGdiTransactionDataIndex): Observable<EntityResponseType> {
    return this.http.put<IGdiTransactionDataIndex>(
      `${this.resourceUrl}/${this.getGdiTransactionDataIndexIdentifier(gdiTransactionDataIndex)}`,
      gdiTransactionDataIndex,
      { observe: 'response' }
    );
  }

  partialUpdate(gdiTransactionDataIndex: PartialUpdateGdiTransactionDataIndex): Observable<EntityResponseType> {
    return this.http.patch<IGdiTransactionDataIndex>(
      `${this.resourceUrl}/${this.getGdiTransactionDataIndexIdentifier(gdiTransactionDataIndex)}`,
      gdiTransactionDataIndex,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGdiTransactionDataIndex>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGdiTransactionDataIndex[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGdiTransactionDataIndex[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getGdiTransactionDataIndexIdentifier(gdiTransactionDataIndex: Pick<IGdiTransactionDataIndex, 'id'>): number {
    return gdiTransactionDataIndex.id;
  }

  compareGdiTransactionDataIndex(
    o1: Pick<IGdiTransactionDataIndex, 'id'> | null,
    o2: Pick<IGdiTransactionDataIndex, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getGdiTransactionDataIndexIdentifier(o1) === this.getGdiTransactionDataIndexIdentifier(o2) : o1 === o2;
  }

  addGdiTransactionDataIndexToCollectionIfMissing<Type extends Pick<IGdiTransactionDataIndex, 'id'>>(
    gdiTransactionDataIndexCollection: Type[],
    ...gdiTransactionDataIndicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const gdiTransactionDataIndices: Type[] = gdiTransactionDataIndicesToCheck.filter(isPresent);
    if (gdiTransactionDataIndices.length > 0) {
      const gdiTransactionDataIndexCollectionIdentifiers = gdiTransactionDataIndexCollection.map(
        gdiTransactionDataIndexItem => this.getGdiTransactionDataIndexIdentifier(gdiTransactionDataIndexItem)!
      );
      const gdiTransactionDataIndicesToAdd = gdiTransactionDataIndices.filter(gdiTransactionDataIndexItem => {
        const gdiTransactionDataIndexIdentifier = this.getGdiTransactionDataIndexIdentifier(gdiTransactionDataIndexItem);
        if (gdiTransactionDataIndexCollectionIdentifiers.includes(gdiTransactionDataIndexIdentifier)) {
          return false;
        }
        gdiTransactionDataIndexCollectionIdentifiers.push(gdiTransactionDataIndexIdentifier);
        return true;
      });
      return [...gdiTransactionDataIndicesToAdd, ...gdiTransactionDataIndexCollection];
    }
    return gdiTransactionDataIndexCollection;
  }
}
