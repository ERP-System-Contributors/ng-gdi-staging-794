import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICustomerComplaintStatusType } from '../customer-complaint-status-type.model';
import { CustomerComplaintStatusTypeService } from '../service/customer-complaint-status-type.service';

import { CustomerComplaintStatusTypeRoutingResolveService } from './customer-complaint-status-type-routing-resolve.service';

describe('CustomerComplaintStatusType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CustomerComplaintStatusTypeRoutingResolveService;
  let service: CustomerComplaintStatusTypeService;
  let resultCustomerComplaintStatusType: ICustomerComplaintStatusType | null | undefined;

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
    routingResolveService = TestBed.inject(CustomerComplaintStatusTypeRoutingResolveService);
    service = TestBed.inject(CustomerComplaintStatusTypeService);
    resultCustomerComplaintStatusType = undefined;
  });

  describe('resolve', () => {
    it('should return ICustomerComplaintStatusType returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCustomerComplaintStatusType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCustomerComplaintStatusType).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCustomerComplaintStatusType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCustomerComplaintStatusType).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICustomerComplaintStatusType>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCustomerComplaintStatusType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCustomerComplaintStatusType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
