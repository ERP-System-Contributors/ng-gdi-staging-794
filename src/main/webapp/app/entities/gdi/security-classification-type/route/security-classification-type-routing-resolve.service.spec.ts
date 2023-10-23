import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISecurityClassificationType } from '../security-classification-type.model';
import { SecurityClassificationTypeService } from '../service/security-classification-type.service';

import { SecurityClassificationTypeRoutingResolveService } from './security-classification-type-routing-resolve.service';

describe('SecurityClassificationType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SecurityClassificationTypeRoutingResolveService;
  let service: SecurityClassificationTypeService;
  let resultSecurityClassificationType: ISecurityClassificationType | null | undefined;

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
    routingResolveService = TestBed.inject(SecurityClassificationTypeRoutingResolveService);
    service = TestBed.inject(SecurityClassificationTypeService);
    resultSecurityClassificationType = undefined;
  });

  describe('resolve', () => {
    it('should return ISecurityClassificationType returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSecurityClassificationType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSecurityClassificationType).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSecurityClassificationType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSecurityClassificationType).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISecurityClassificationType>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSecurityClassificationType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSecurityClassificationType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
