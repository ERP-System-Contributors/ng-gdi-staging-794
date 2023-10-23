import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILoanPerformanceClassification } from '../loan-performance-classification.model';
import { LoanPerformanceClassificationService } from '../service/loan-performance-classification.service';

import { LoanPerformanceClassificationRoutingResolveService } from './loan-performance-classification-routing-resolve.service';

describe('LoanPerformanceClassification routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LoanPerformanceClassificationRoutingResolveService;
  let service: LoanPerformanceClassificationService;
  let resultLoanPerformanceClassification: ILoanPerformanceClassification | null | undefined;

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
    routingResolveService = TestBed.inject(LoanPerformanceClassificationRoutingResolveService);
    service = TestBed.inject(LoanPerformanceClassificationService);
    resultLoanPerformanceClassification = undefined;
  });

  describe('resolve', () => {
    it('should return ILoanPerformanceClassification returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLoanPerformanceClassification = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLoanPerformanceClassification).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLoanPerformanceClassification = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLoanPerformanceClassification).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILoanPerformanceClassification>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLoanPerformanceClassification = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLoanPerformanceClassification).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
