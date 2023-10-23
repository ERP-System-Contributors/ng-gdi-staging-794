import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IWeeklyCounterfeitHolding } from '../weekly-counterfeit-holding.model';
import { WeeklyCounterfeitHoldingService } from '../service/weekly-counterfeit-holding.service';

import { WeeklyCounterfeitHoldingRoutingResolveService } from './weekly-counterfeit-holding-routing-resolve.service';

describe('WeeklyCounterfeitHolding routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: WeeklyCounterfeitHoldingRoutingResolveService;
  let service: WeeklyCounterfeitHoldingService;
  let resultWeeklyCounterfeitHolding: IWeeklyCounterfeitHolding | null | undefined;

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
    routingResolveService = TestBed.inject(WeeklyCounterfeitHoldingRoutingResolveService);
    service = TestBed.inject(WeeklyCounterfeitHoldingService);
    resultWeeklyCounterfeitHolding = undefined;
  });

  describe('resolve', () => {
    it('should return IWeeklyCounterfeitHolding returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWeeklyCounterfeitHolding = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWeeklyCounterfeitHolding).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWeeklyCounterfeitHolding = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultWeeklyCounterfeitHolding).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IWeeklyCounterfeitHolding>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWeeklyCounterfeitHolding = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWeeklyCounterfeitHolding).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
