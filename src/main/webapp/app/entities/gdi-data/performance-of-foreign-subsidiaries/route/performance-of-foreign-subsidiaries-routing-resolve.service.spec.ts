import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPerformanceOfForeignSubsidiaries } from '../performance-of-foreign-subsidiaries.model';
import { PerformanceOfForeignSubsidiariesService } from '../service/performance-of-foreign-subsidiaries.service';

import { PerformanceOfForeignSubsidiariesRoutingResolveService } from './performance-of-foreign-subsidiaries-routing-resolve.service';

describe('PerformanceOfForeignSubsidiaries routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PerformanceOfForeignSubsidiariesRoutingResolveService;
  let service: PerformanceOfForeignSubsidiariesService;
  let resultPerformanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries | null | undefined;

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
    routingResolveService = TestBed.inject(PerformanceOfForeignSubsidiariesRoutingResolveService);
    service = TestBed.inject(PerformanceOfForeignSubsidiariesService);
    resultPerformanceOfForeignSubsidiaries = undefined;
  });

  describe('resolve', () => {
    it('should return IPerformanceOfForeignSubsidiaries returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPerformanceOfForeignSubsidiaries = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPerformanceOfForeignSubsidiaries).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPerformanceOfForeignSubsidiaries = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPerformanceOfForeignSubsidiaries).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IPerformanceOfForeignSubsidiaries>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPerformanceOfForeignSubsidiaries = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPerformanceOfForeignSubsidiaries).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
