import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDerivativeUnderlyingAsset, NewDerivativeUnderlyingAsset } from '../derivative-underlying-asset.model';

export type PartialUpdateDerivativeUnderlyingAsset = Partial<IDerivativeUnderlyingAsset> & Pick<IDerivativeUnderlyingAsset, 'id'>;

export type EntityResponseType = HttpResponse<IDerivativeUnderlyingAsset>;
export type EntityArrayResponseType = HttpResponse<IDerivativeUnderlyingAsset[]>;

@Injectable({ providedIn: 'root' })
export class DerivativeUnderlyingAssetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/derivative-underlying-assets');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/derivative-underlying-assets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(derivativeUnderlyingAsset: NewDerivativeUnderlyingAsset): Observable<EntityResponseType> {
    return this.http.post<IDerivativeUnderlyingAsset>(this.resourceUrl, derivativeUnderlyingAsset, { observe: 'response' });
  }

  update(derivativeUnderlyingAsset: IDerivativeUnderlyingAsset): Observable<EntityResponseType> {
    return this.http.put<IDerivativeUnderlyingAsset>(
      `${this.resourceUrl}/${this.getDerivativeUnderlyingAssetIdentifier(derivativeUnderlyingAsset)}`,
      derivativeUnderlyingAsset,
      { observe: 'response' }
    );
  }

  partialUpdate(derivativeUnderlyingAsset: PartialUpdateDerivativeUnderlyingAsset): Observable<EntityResponseType> {
    return this.http.patch<IDerivativeUnderlyingAsset>(
      `${this.resourceUrl}/${this.getDerivativeUnderlyingAssetIdentifier(derivativeUnderlyingAsset)}`,
      derivativeUnderlyingAsset,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDerivativeUnderlyingAsset>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDerivativeUnderlyingAsset[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDerivativeUnderlyingAsset[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getDerivativeUnderlyingAssetIdentifier(derivativeUnderlyingAsset: Pick<IDerivativeUnderlyingAsset, 'id'>): number {
    return derivativeUnderlyingAsset.id;
  }

  compareDerivativeUnderlyingAsset(
    o1: Pick<IDerivativeUnderlyingAsset, 'id'> | null,
    o2: Pick<IDerivativeUnderlyingAsset, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getDerivativeUnderlyingAssetIdentifier(o1) === this.getDerivativeUnderlyingAssetIdentifier(o2) : o1 === o2;
  }

  addDerivativeUnderlyingAssetToCollectionIfMissing<Type extends Pick<IDerivativeUnderlyingAsset, 'id'>>(
    derivativeUnderlyingAssetCollection: Type[],
    ...derivativeUnderlyingAssetsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const derivativeUnderlyingAssets: Type[] = derivativeUnderlyingAssetsToCheck.filter(isPresent);
    if (derivativeUnderlyingAssets.length > 0) {
      const derivativeUnderlyingAssetCollectionIdentifiers = derivativeUnderlyingAssetCollection.map(
        derivativeUnderlyingAssetItem => this.getDerivativeUnderlyingAssetIdentifier(derivativeUnderlyingAssetItem)!
      );
      const derivativeUnderlyingAssetsToAdd = derivativeUnderlyingAssets.filter(derivativeUnderlyingAssetItem => {
        const derivativeUnderlyingAssetIdentifier = this.getDerivativeUnderlyingAssetIdentifier(derivativeUnderlyingAssetItem);
        if (derivativeUnderlyingAssetCollectionIdentifiers.includes(derivativeUnderlyingAssetIdentifier)) {
          return false;
        }
        derivativeUnderlyingAssetCollectionIdentifiers.push(derivativeUnderlyingAssetIdentifier);
        return true;
      });
      return [...derivativeUnderlyingAssetsToAdd, ...derivativeUnderlyingAssetCollection];
    }
    return derivativeUnderlyingAssetCollection;
  }
}
