import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICurrencyAuthenticityFlag } from '../currency-authenticity-flag.model';
import { CurrencyAuthenticityFlagService } from '../service/currency-authenticity-flag.service';

import { CurrencyAuthenticityFlagRoutingResolveService } from './currency-authenticity-flag-routing-resolve.service';

describe('CurrencyAuthenticityFlag routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CurrencyAuthenticityFlagRoutingResolveService;
  let service: CurrencyAuthenticityFlagService;
  let resultCurrencyAuthenticityFlag: ICurrencyAuthenticityFlag | null | undefined;

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
    routingResolveService = TestBed.inject(CurrencyAuthenticityFlagRoutingResolveService);
    service = TestBed.inject(CurrencyAuthenticityFlagService);
    resultCurrencyAuthenticityFlag = undefined;
  });

  describe('resolve', () => {
    it('should return ICurrencyAuthenticityFlag returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCurrencyAuthenticityFlag = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCurrencyAuthenticityFlag).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCurrencyAuthenticityFlag = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCurrencyAuthenticityFlag).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICurrencyAuthenticityFlag>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCurrencyAuthenticityFlag = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCurrencyAuthenticityFlag).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
