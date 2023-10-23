import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAcquiringIssuingFlag } from '../acquiring-issuing-flag.model';
import { AcquiringIssuingFlagService } from '../service/acquiring-issuing-flag.service';

import { AcquiringIssuingFlagRoutingResolveService } from './acquiring-issuing-flag-routing-resolve.service';

describe('AcquiringIssuingFlag routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AcquiringIssuingFlagRoutingResolveService;
  let service: AcquiringIssuingFlagService;
  let resultAcquiringIssuingFlag: IAcquiringIssuingFlag | null | undefined;

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
    routingResolveService = TestBed.inject(AcquiringIssuingFlagRoutingResolveService);
    service = TestBed.inject(AcquiringIssuingFlagService);
    resultAcquiringIssuingFlag = undefined;
  });

  describe('resolve', () => {
    it('should return IAcquiringIssuingFlag returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAcquiringIssuingFlag = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAcquiringIssuingFlag).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAcquiringIssuingFlag = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAcquiringIssuingFlag).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAcquiringIssuingFlag>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAcquiringIssuingFlag = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAcquiringIssuingFlag).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
