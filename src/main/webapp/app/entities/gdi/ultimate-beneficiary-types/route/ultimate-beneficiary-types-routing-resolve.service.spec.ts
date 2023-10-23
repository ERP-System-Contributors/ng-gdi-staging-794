import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';
import { UltimateBeneficiaryTypesService } from '../service/ultimate-beneficiary-types.service';

import { UltimateBeneficiaryTypesRoutingResolveService } from './ultimate-beneficiary-types-routing-resolve.service';

describe('UltimateBeneficiaryTypes routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UltimateBeneficiaryTypesRoutingResolveService;
  let service: UltimateBeneficiaryTypesService;
  let resultUltimateBeneficiaryTypes: IUltimateBeneficiaryTypes | null | undefined;

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
    routingResolveService = TestBed.inject(UltimateBeneficiaryTypesRoutingResolveService);
    service = TestBed.inject(UltimateBeneficiaryTypesService);
    resultUltimateBeneficiaryTypes = undefined;
  });

  describe('resolve', () => {
    it('should return IUltimateBeneficiaryTypes returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUltimateBeneficiaryTypes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUltimateBeneficiaryTypes).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUltimateBeneficiaryTypes = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUltimateBeneficiaryTypes).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IUltimateBeneficiaryTypes>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUltimateBeneficiaryTypes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUltimateBeneficiaryTypes).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
