import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUltimateBeneficiaryCategory } from '../ultimate-beneficiary-category.model';
import { UltimateBeneficiaryCategoryService } from '../service/ultimate-beneficiary-category.service';

import { UltimateBeneficiaryCategoryRoutingResolveService } from './ultimate-beneficiary-category-routing-resolve.service';

describe('UltimateBeneficiaryCategory routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UltimateBeneficiaryCategoryRoutingResolveService;
  let service: UltimateBeneficiaryCategoryService;
  let resultUltimateBeneficiaryCategory: IUltimateBeneficiaryCategory | null | undefined;

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
    routingResolveService = TestBed.inject(UltimateBeneficiaryCategoryRoutingResolveService);
    service = TestBed.inject(UltimateBeneficiaryCategoryService);
    resultUltimateBeneficiaryCategory = undefined;
  });

  describe('resolve', () => {
    it('should return IUltimateBeneficiaryCategory returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUltimateBeneficiaryCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUltimateBeneficiaryCategory).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUltimateBeneficiaryCategory = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUltimateBeneficiaryCategory).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IUltimateBeneficiaryCategory>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUltimateBeneficiaryCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUltimateBeneficiaryCategory).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
