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
import { IFileType, NewFileType } from '../file-type.model';

export type PartialUpdateFileType = Partial<IFileType> & Pick<IFileType, 'id'>;

export type EntityResponseType = HttpResponse<IFileType>;
export type EntityArrayResponseType = HttpResponse<IFileType[]>;

@Injectable({ providedIn: 'root' })
export class FileTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/file-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/file-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fileType: NewFileType): Observable<EntityResponseType> {
    return this.http.post<IFileType>(this.resourceUrl, fileType, { observe: 'response' });
  }

  update(fileType: IFileType): Observable<EntityResponseType> {
    return this.http.put<IFileType>(`${this.resourceUrl}/${this.getFileTypeIdentifier(fileType)}`, fileType, { observe: 'response' });
  }

  partialUpdate(fileType: PartialUpdateFileType): Observable<EntityResponseType> {
    return this.http.patch<IFileType>(`${this.resourceUrl}/${this.getFileTypeIdentifier(fileType)}`, fileType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFileType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFileType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFileType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFileTypeIdentifier(fileType: Pick<IFileType, 'id'>): number {
    return fileType.id;
  }

  compareFileType(o1: Pick<IFileType, 'id'> | null, o2: Pick<IFileType, 'id'> | null): boolean {
    return o1 && o2 ? this.getFileTypeIdentifier(o1) === this.getFileTypeIdentifier(o2) : o1 === o2;
  }

  addFileTypeToCollectionIfMissing<Type extends Pick<IFileType, 'id'>>(
    fileTypeCollection: Type[],
    ...fileTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fileTypes: Type[] = fileTypesToCheck.filter(isPresent);
    if (fileTypes.length > 0) {
      const fileTypeCollectionIdentifiers = fileTypeCollection.map(fileTypeItem => this.getFileTypeIdentifier(fileTypeItem)!);
      const fileTypesToAdd = fileTypes.filter(fileTypeItem => {
        const fileTypeIdentifier = this.getFileTypeIdentifier(fileTypeItem);
        if (fileTypeCollectionIdentifiers.includes(fileTypeIdentifier)) {
          return false;
        }
        fileTypeCollectionIdentifiers.push(fileTypeIdentifier);
        return true;
      });
      return [...fileTypesToAdd, ...fileTypeCollection];
    }
    return fileTypeCollection;
  }
}
