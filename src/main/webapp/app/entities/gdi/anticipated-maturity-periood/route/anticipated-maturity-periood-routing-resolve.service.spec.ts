import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAnticipatedMaturityPeriood } from '../anticipated-maturity-periood.model';
import { AnticipatedMaturityPerioodService } from '../service/anticipated-maturity-periood.service';

import { AnticipatedMaturityPerioodRoutingResolveService } from './anticipated-maturity-periood-routing-resolve.service';

describe('AnticipatedMaturityPeriood routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AnticipatedMaturityPerioodRoutingResolveService;
  let service: AnticipatedMaturityPerioodService;
  let resultAnticipatedMaturityPeriood: IAnticipatedMaturityPeriood | null | undefined;

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
    routingResolveService = TestBed.inject(AnticipatedMaturityPerioodRoutingResolveService);
    service = TestBed.inject(AnticipatedMaturityPerioodService);
    resultAnticipatedMaturityPeriood = undefined;
  });

  describe('resolve', () => {
    it('should return IAnticipatedMaturityPeriood returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAnticipatedMaturityPeriood = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAnticipatedMaturityPeriood).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAnticipatedMaturityPeriood = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAnticipatedMaturityPeriood).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAnticipatedMaturityPeriood>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAnticipatedMaturityPeriood = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAnticipatedMaturityPeriood).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
