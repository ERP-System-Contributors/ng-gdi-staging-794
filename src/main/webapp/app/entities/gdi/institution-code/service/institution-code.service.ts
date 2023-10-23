import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IInstitutionCode, NewInstitutionCode } from '../institution-code.model';

export type PartialUpdateInstitutionCode = Partial<IInstitutionCode> & Pick<IInstitutionCode, 'id'>;

type RestOf<T extends IInstitutionCode | NewInstitutionCode> = Omit<T, 'dateLicensed'> & {
  dateLicensed?: string | null;
};

export type RestInstitutionCode = RestOf<IInstitutionCode>;

export type NewRestInstitutionCode = RestOf<NewInstitutionCode>;

export type PartialUpdateRestInstitutionCode = RestOf<PartialUpdateInstitutionCode>;

export type EntityResponseType = HttpResponse<IInstitutionCode>;
export type EntityArrayResponseType = HttpResponse<IInstitutionCode[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institution-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/institution-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(institutionCode: NewInstitutionCode): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(institutionCode);
    return this.http
      .post<RestInstitutionCode>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(institutionCode: IInstitutionCode): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(institutionCode);
    return this.http
      .put<RestInstitutionCode>(`${this.resourceUrl}/${this.getInstitutionCodeIdentifier(institutionCode)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(institutionCode: PartialUpdateInstitutionCode): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(institutionCode);
    return this.http
      .patch<RestInstitutionCode>(`${this.resourceUrl}/${this.getInstitutionCodeIdentifier(institutionCode)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestInstitutionCode>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInstitutionCode[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInstitutionCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getInstitutionCodeIdentifier(institutionCode: Pick<IInstitutionCode, 'id'>): number {
    return institutionCode.id;
  }

  compareInstitutionCode(o1: Pick<IInstitutionCode, 'id'> | null, o2: Pick<IInstitutionCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstitutionCodeIdentifier(o1) === this.getInstitutionCodeIdentifier(o2) : o1 === o2;
  }

  addInstitutionCodeToCollectionIfMissing<Type extends Pick<IInstitutionCode, 'id'>>(
    institutionCodeCollection: Type[],
    ...institutionCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const institutionCodes: Type[] = institutionCodesToCheck.filter(isPresent);
    if (institutionCodes.length > 0) {
      const institutionCodeCollectionIdentifiers = institutionCodeCollection.map(
        institutionCodeItem => this.getInstitutionCodeIdentifier(institutionCodeItem)!
      );
      const institutionCodesToAdd = institutionCodes.filter(institutionCodeItem => {
        const institutionCodeIdentifier = this.getInstitutionCodeIdentifier(institutionCodeItem);
        if (institutionCodeCollectionIdentifiers.includes(institutionCodeIdentifier)) {
          return false;
        }
        institutionCodeCollectionIdentifiers.push(institutionCodeIdentifier);
        return true;
      });
      return [...institutionCodesToAdd, ...institutionCodeCollection];
    }
    return institutionCodeCollection;
  }

  protected convertDateFromClient<T extends IInstitutionCode | NewInstitutionCode | PartialUpdateInstitutionCode>(
    institutionCode: T
  ): RestOf<T> {
    return {
      ...institutionCode,
      dateLicensed: institutionCode.dateLicensed?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restInstitutionCode: RestInstitutionCode): IInstitutionCode {
    return {
      ...restInstitutionCode,
      dateLicensed: restInstitutionCode.dateLicensed ? dayjs(restInstitutionCode.dateLicensed) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestInstitutionCode>): HttpResponse<IInstitutionCode> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestInstitutionCode[]>): HttpResponse<IInstitutionCode[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
