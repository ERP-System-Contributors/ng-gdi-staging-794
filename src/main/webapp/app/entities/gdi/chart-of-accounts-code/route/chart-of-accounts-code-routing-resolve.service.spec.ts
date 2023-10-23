import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IChartOfAccountsCode } from '../chart-of-accounts-code.model';
import { ChartOfAccountsCodeService } from '../service/chart-of-accounts-code.service';

import { ChartOfAccountsCodeRoutingResolveService } from './chart-of-accounts-code-routing-resolve.service';

describe('ChartOfAccountsCode routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ChartOfAccountsCodeRoutingResolveService;
  let service: ChartOfAccountsCodeService;
  let resultChartOfAccountsCode: IChartOfAccountsCode | null | undefined;

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
    routingResolveService = TestBed.inject(ChartOfAccountsCodeRoutingResolveService);
    service = TestBed.inject(ChartOfAccountsCodeService);
    resultChartOfAccountsCode = undefined;
  });

  describe('resolve', () => {
    it('should return IChartOfAccountsCode returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChartOfAccountsCode = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChartOfAccountsCode).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChartOfAccountsCode = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultChartOfAccountsCode).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IChartOfAccountsCode>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChartOfAccountsCode = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChartOfAccountsCode).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
