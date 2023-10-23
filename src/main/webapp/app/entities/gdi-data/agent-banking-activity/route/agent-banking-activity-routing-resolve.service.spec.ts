import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAgentBankingActivity } from '../agent-banking-activity.model';
import { AgentBankingActivityService } from '../service/agent-banking-activity.service';

import { AgentBankingActivityRoutingResolveService } from './agent-banking-activity-routing-resolve.service';

describe('AgentBankingActivity routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AgentBankingActivityRoutingResolveService;
  let service: AgentBankingActivityService;
  let resultAgentBankingActivity: IAgentBankingActivity | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(AgentBankingActivityRoutingResolveService);
    service = TestBed.inject(AgentBankingActivityService);
    resultAgentBankingActivity = undefined;
  });

  describe('resolve', () => {
    it('should return IAgentBankingActivity returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAgentBankingActivity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAgentBankingActivity).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAgentBankingActivity = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAgentBankingActivity).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAgentBankingActivity>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAgentBankingActivity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAgentBankingActivity).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
