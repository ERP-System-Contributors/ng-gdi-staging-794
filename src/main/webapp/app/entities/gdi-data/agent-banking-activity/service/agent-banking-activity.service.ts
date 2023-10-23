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
import { IAgentBankingActivity, NewAgentBankingActivity } from '../agent-banking-activity.model';

export type PartialUpdateAgentBankingActivity = Partial<IAgentBankingActivity> & Pick<IAgentBankingActivity, 'id'>;

type RestOf<T extends IAgentBankingActivity | NewAgentBankingActivity> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestAgentBankingActivity = RestOf<IAgentBankingActivity>;

export type NewRestAgentBankingActivity = RestOf<NewAgentBankingActivity>;

export type PartialUpdateRestAgentBankingActivity = RestOf<PartialUpdateAgentBankingActivity>;

export type EntityResponseType = HttpResponse<IAgentBankingActivity>;
export type EntityArrayResponseType = HttpResponse<IAgentBankingActivity[]>;

@Injectable({ providedIn: 'root' })
export class AgentBankingActivityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/agent-banking-activities');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/agent-banking-activities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(agentBankingActivity: NewAgentBankingActivity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agentBankingActivity);
    return this.http
      .post<RestAgentBankingActivity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(agentBankingActivity: IAgentBankingActivity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agentBankingActivity);
    return this.http
      .put<RestAgentBankingActivity>(`${this.resourceUrl}/${this.getAgentBankingActivityIdentifier(agentBankingActivity)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(agentBankingActivity: PartialUpdateAgentBankingActivity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agentBankingActivity);
    return this.http
      .patch<RestAgentBankingActivity>(`${this.resourceUrl}/${this.getAgentBankingActivityIdentifier(agentBankingActivity)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAgentBankingActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAgentBankingActivity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAgentBankingActivity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAgentBankingActivityIdentifier(agentBankingActivity: Pick<IAgentBankingActivity, 'id'>): number {
    return agentBankingActivity.id;
  }

  compareAgentBankingActivity(o1: Pick<IAgentBankingActivity, 'id'> | null, o2: Pick<IAgentBankingActivity, 'id'> | null): boolean {
    return o1 && o2 ? this.getAgentBankingActivityIdentifier(o1) === this.getAgentBankingActivityIdentifier(o2) : o1 === o2;
  }

  addAgentBankingActivityToCollectionIfMissing<Type extends Pick<IAgentBankingActivity, 'id'>>(
    agentBankingActivityCollection: Type[],
    ...agentBankingActivitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const agentBankingActivities: Type[] = agentBankingActivitiesToCheck.filter(isPresent);
    if (agentBankingActivities.length > 0) {
      const agentBankingActivityCollectionIdentifiers = agentBankingActivityCollection.map(
        agentBankingActivityItem => this.getAgentBankingActivityIdentifier(agentBankingActivityItem)!
      );
      const agentBankingActivitiesToAdd = agentBankingActivities.filter(agentBankingActivityItem => {
        const agentBankingActivityIdentifier = this.getAgentBankingActivityIdentifier(agentBankingActivityItem);
        if (agentBankingActivityCollectionIdentifiers.includes(agentBankingActivityIdentifier)) {
          return false;
        }
        agentBankingActivityCollectionIdentifiers.push(agentBankingActivityIdentifier);
        return true;
      });
      return [...agentBankingActivitiesToAdd, ...agentBankingActivityCollection];
    }
    return agentBankingActivityCollection;
  }

  protected convertDateFromClient<T extends IAgentBankingActivity | NewAgentBankingActivity | PartialUpdateAgentBankingActivity>(
    agentBankingActivity: T
  ): RestOf<T> {
    return {
      ...agentBankingActivity,
      reportingDate: agentBankingActivity.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAgentBankingActivity: RestAgentBankingActivity): IAgentBankingActivity {
    return {
      ...restAgentBankingActivity,
      reportingDate: restAgentBankingActivity.reportingDate ? dayjs(restAgentBankingActivity.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAgentBankingActivity>): HttpResponse<IAgentBankingActivity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAgentBankingActivity[]>): HttpResponse<IAgentBankingActivity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
