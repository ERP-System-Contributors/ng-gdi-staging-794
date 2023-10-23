import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISourcesOfFundsTypeCode } from '../sources-of-funds-type-code.model';
import { SourcesOfFundsTypeCodeService } from '../service/sources-of-funds-type-code.service';

import { SourcesOfFundsTypeCodeRoutingResolveService } from './sources-of-funds-type-code-routing-resolve.service';

describe('SourcesOfFundsTypeCode routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SourcesOfFundsTypeCodeRoutingResolveService;
  let service: SourcesOfFundsTypeCodeService;
  let resultSourcesOfFundsTypeCode: ISourcesOfFundsTypeCode | null | undefined;

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
    routingResolveService = TestBed.inject(SourcesOfFundsTypeCodeRoutingResolveService);
    service = TestBed.inject(SourcesOfFundsTypeCodeService);
    resultSourcesOfFundsTypeCode = undefined;
  });

  describe('resolve', () => {
    it('should return ISourcesOfFundsTypeCode returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSourcesOfFundsTypeCode = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSourcesOfFundsTypeCode).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSourcesOfFundsTypeCode = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSourcesOfFundsTypeCode).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISourcesOfFundsTypeCode>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSourcesOfFundsTypeCode = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSourcesOfFundsTypeCode).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
