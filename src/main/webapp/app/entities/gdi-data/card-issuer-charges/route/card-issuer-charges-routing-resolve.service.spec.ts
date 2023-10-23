import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICardIssuerCharges } from '../card-issuer-charges.model';
import { CardIssuerChargesService } from '../service/card-issuer-charges.service';

import { CardIssuerChargesRoutingResolveService } from './card-issuer-charges-routing-resolve.service';

describe('CardIssuerCharges routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CardIssuerChargesRoutingResolveService;
  let service: CardIssuerChargesService;
  let resultCardIssuerCharges: ICardIssuerCharges | null | undefined;

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
    routingResolveService = TestBed.inject(CardIssuerChargesRoutingResolveService);
    service = TestBed.inject(CardIssuerChargesService);
    resultCardIssuerCharges = undefined;
  });

  describe('resolve', () => {
    it('should return ICardIssuerCharges returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardIssuerCharges = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCardIssuerCharges).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardIssuerCharges = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCardIssuerCharges).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICardIssuerCharges>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCardIssuerCharges = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCardIssuerCharges).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
