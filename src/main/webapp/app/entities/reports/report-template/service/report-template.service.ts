///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IReportTemplate, NewReportTemplate } from '../report-template.model';

export type PartialUpdateReportTemplate = Partial<IReportTemplate> & Pick<IReportTemplate, 'id'>;

export type EntityResponseType = HttpResponse<IReportTemplate>;
export type EntityArrayResponseType = HttpResponse<IReportTemplate[]>;

@Injectable({ providedIn: 'root' })
export class ReportTemplateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/report-templates');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/report-templates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reportTemplate: NewReportTemplate): Observable<EntityResponseType> {
    return this.http.post<IReportTemplate>(this.resourceUrl, reportTemplate, { observe: 'response' });
  }

  update(reportTemplate: IReportTemplate): Observable<EntityResponseType> {
    return this.http.put<IReportTemplate>(`${this.resourceUrl}/${this.getReportTemplateIdentifier(reportTemplate)}`, reportTemplate, {
      observe: 'response',
    });
  }

  partialUpdate(reportTemplate: PartialUpdateReportTemplate): Observable<EntityResponseType> {
    return this.http.patch<IReportTemplate>(`${this.resourceUrl}/${this.getReportTemplateIdentifier(reportTemplate)}`, reportTemplate, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReportTemplate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReportTemplate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReportTemplate[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getReportTemplateIdentifier(reportTemplate: Pick<IReportTemplate, 'id'>): number {
    return reportTemplate.id;
  }

  compareReportTemplate(o1: Pick<IReportTemplate, 'id'> | null, o2: Pick<IReportTemplate, 'id'> | null): boolean {
    return o1 && o2 ? this.getReportTemplateIdentifier(o1) === this.getReportTemplateIdentifier(o2) : o1 === o2;
  }

  addReportTemplateToCollectionIfMissing<Type extends Pick<IReportTemplate, 'id'>>(
    reportTemplateCollection: Type[],
    ...reportTemplatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reportTemplates: Type[] = reportTemplatesToCheck.filter(isPresent);
    if (reportTemplates.length > 0) {
      const reportTemplateCollectionIdentifiers = reportTemplateCollection.map(
        reportTemplateItem => this.getReportTemplateIdentifier(reportTemplateItem)!
      );
      const reportTemplatesToAdd = reportTemplates.filter(reportTemplateItem => {
        const reportTemplateIdentifier = this.getReportTemplateIdentifier(reportTemplateItem);
        if (reportTemplateCollectionIdentifiers.includes(reportTemplateIdentifier)) {
          return false;
        }
        reportTemplateCollectionIdentifiers.push(reportTemplateIdentifier);
        return true;
      });
      return [...reportTemplatesToAdd, ...reportTemplateCollection];
    }
    return reportTemplateCollection;
  }
}
