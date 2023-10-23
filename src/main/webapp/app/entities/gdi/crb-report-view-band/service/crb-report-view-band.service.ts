import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbReportViewBand, NewCrbReportViewBand } from '../crb-report-view-band.model';

export type PartialUpdateCrbReportViewBand = Partial<ICrbReportViewBand> & Pick<ICrbReportViewBand, 'id'>;

export type EntityResponseType = HttpResponse<ICrbReportViewBand>;
export type EntityArrayResponseType = HttpResponse<ICrbReportViewBand[]>;

@Injectable({ providedIn: 'root' })
export class CrbReportViewBandService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-report-view-bands');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-report-view-bands');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbReportViewBand: NewCrbReportViewBand): Observable<EntityResponseType> {
    return this.http.post<ICrbReportViewBand>(this.resourceUrl, crbReportViewBand, { observe: 'response' });
  }

  update(crbReportViewBand: ICrbReportViewBand): Observable<EntityResponseType> {
    return this.http.put<ICrbReportViewBand>(
      `${this.resourceUrl}/${this.getCrbReportViewBandIdentifier(crbReportViewBand)}`,
      crbReportViewBand,
      { observe: 'response' }
    );
  }

  partialUpdate(crbReportViewBand: PartialUpdateCrbReportViewBand): Observable<EntityResponseType> {
    return this.http.patch<ICrbReportViewBand>(
      `${this.resourceUrl}/${this.getCrbReportViewBandIdentifier(crbReportViewBand)}`,
      crbReportViewBand,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbReportViewBand>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbReportViewBand[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbReportViewBand[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbReportViewBandIdentifier(crbReportViewBand: Pick<ICrbReportViewBand, 'id'>): number {
    return crbReportViewBand.id;
  }

  compareCrbReportViewBand(o1: Pick<ICrbReportViewBand, 'id'> | null, o2: Pick<ICrbReportViewBand, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbReportViewBandIdentifier(o1) === this.getCrbReportViewBandIdentifier(o2) : o1 === o2;
  }

  addCrbReportViewBandToCollectionIfMissing<Type extends Pick<ICrbReportViewBand, 'id'>>(
    crbReportViewBandCollection: Type[],
    ...crbReportViewBandsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbReportViewBands: Type[] = crbReportViewBandsToCheck.filter(isPresent);
    if (crbReportViewBands.length > 0) {
      const crbReportViewBandCollectionIdentifiers = crbReportViewBandCollection.map(
        crbReportViewBandItem => this.getCrbReportViewBandIdentifier(crbReportViewBandItem)!
      );
      const crbReportViewBandsToAdd = crbReportViewBands.filter(crbReportViewBandItem => {
        const crbReportViewBandIdentifier = this.getCrbReportViewBandIdentifier(crbReportViewBandItem);
        if (crbReportViewBandCollectionIdentifiers.includes(crbReportViewBandIdentifier)) {
          return false;
        }
        crbReportViewBandCollectionIdentifiers.push(crbReportViewBandIdentifier);
        return true;
      });
      return [...crbReportViewBandsToAdd, ...crbReportViewBandCollection];
    }
    return crbReportViewBandCollection;
  }
}
