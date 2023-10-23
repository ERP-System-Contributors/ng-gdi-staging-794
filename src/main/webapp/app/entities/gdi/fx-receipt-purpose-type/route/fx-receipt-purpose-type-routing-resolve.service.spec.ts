import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';
import { FxReceiptPurposeTypeService } from '../service/fx-receipt-purpose-type.service';

import { FxReceiptPurposeTypeRoutingResolveService } from './fx-receipt-purpose-type-routing-resolve.service';

describe('FxReceiptPurposeType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FxReceiptPurposeTypeRoutingResolveService;
  let service: FxReceiptPurposeTypeService;
  let resultFxReceiptPurposeType: IFxReceiptPurposeType | null | undefined;

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
    routingResolveService = TestBed.inject(FxReceiptPurposeTypeRoutingResolveService);
    service = TestBed.inject(FxReceiptPurposeTypeService);
    resultFxReceiptPurposeType = undefined;
  });

  describe('resolve', () => {
    it('should return IFxReceiptPurposeType returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFxReceiptPurposeType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFxReceiptPurposeType).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFxReceiptPurposeType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFxReceiptPurposeType).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFxReceiptPurposeType>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFxReceiptPurposeType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFxReceiptPurposeType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
