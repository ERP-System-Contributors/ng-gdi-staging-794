///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CreditCardFacilityFormService } from './credit-card-facility-form.service';
import { CreditCardFacilityService } from '../service/credit-card-facility.service';
import { ICreditCardFacility } from '../credit-card-facility.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { ICreditCardOwnership } from 'app/entities/gdi/credit-card-ownership/credit-card-ownership.model';
import { CreditCardOwnershipService } from 'app/entities/gdi/credit-card-ownership/service/credit-card-ownership.service';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';
import { IsoCurrencyCodeService } from 'app/entities/gdi/iso-currency-code/service/iso-currency-code.service';

import { CreditCardFacilityUpdateComponent } from './credit-card-facility-update.component';

describe('CreditCardFacility Management Update Component', () => {
  let comp: CreditCardFacilityUpdateComponent;
  let fixture: ComponentFixture<CreditCardFacilityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let creditCardFacilityFormService: CreditCardFacilityFormService;
  let creditCardFacilityService: CreditCardFacilityService;
  let institutionCodeService: InstitutionCodeService;
  let creditCardOwnershipService: CreditCardOwnershipService;
  let isoCurrencyCodeService: IsoCurrencyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CreditCardFacilityUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CreditCardFacilityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CreditCardFacilityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    creditCardFacilityFormService = TestBed.inject(CreditCardFacilityFormService);
    creditCardFacilityService = TestBed.inject(CreditCardFacilityService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    creditCardOwnershipService = TestBed.inject(CreditCardOwnershipService);
    isoCurrencyCodeService = TestBed.inject(IsoCurrencyCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const creditCardFacility: ICreditCardFacility = { id: 456 };
      const bankCode: IInstitutionCode = { id: 90143 };
      creditCardFacility.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 41372 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditCardFacility });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CreditCardOwnership query and add missing value', () => {
      const creditCardFacility: ICreditCardFacility = { id: 456 };
      const customerCategory: ICreditCardOwnership = { id: 6691 };
      creditCardFacility.customerCategory = customerCategory;

      const creditCardOwnershipCollection: ICreditCardOwnership[] = [{ id: 62369 }];
      jest.spyOn(creditCardOwnershipService, 'query').mockReturnValue(of(new HttpResponse({ body: creditCardOwnershipCollection })));
      const additionalCreditCardOwnerships = [customerCategory];
      const expectedCollection: ICreditCardOwnership[] = [...additionalCreditCardOwnerships, ...creditCardOwnershipCollection];
      jest.spyOn(creditCardOwnershipService, 'addCreditCardOwnershipToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditCardFacility });
      comp.ngOnInit();

      expect(creditCardOwnershipService.query).toHaveBeenCalled();
      expect(creditCardOwnershipService.addCreditCardOwnershipToCollectionIfMissing).toHaveBeenCalledWith(
        creditCardOwnershipCollection,
        ...additionalCreditCardOwnerships.map(expect.objectContaining)
      );
      expect(comp.creditCardOwnershipsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call IsoCurrencyCode query and add missing value', () => {
      const creditCardFacility: ICreditCardFacility = { id: 456 };
      const currencyCode: IIsoCurrencyCode = { id: 66431 };
      creditCardFacility.currencyCode = currencyCode;

      const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [{ id: 22472 }];
      jest.spyOn(isoCurrencyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: isoCurrencyCodeCollection })));
      const additionalIsoCurrencyCodes = [currencyCode];
      const expectedCollection: IIsoCurrencyCode[] = [...additionalIsoCurrencyCodes, ...isoCurrencyCodeCollection];
      jest.spyOn(isoCurrencyCodeService, 'addIsoCurrencyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditCardFacility });
      comp.ngOnInit();

      expect(isoCurrencyCodeService.query).toHaveBeenCalled();
      expect(isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        isoCurrencyCodeCollection,
        ...additionalIsoCurrencyCodes.map(expect.objectContaining)
      );
      expect(comp.isoCurrencyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const creditCardFacility: ICreditCardFacility = { id: 456 };
      const bankCode: IInstitutionCode = { id: 41697 };
      creditCardFacility.bankCode = bankCode;
      const customerCategory: ICreditCardOwnership = { id: 19758 };
      creditCardFacility.customerCategory = customerCategory;
      const currencyCode: IIsoCurrencyCode = { id: 54796 };
      creditCardFacility.currencyCode = currencyCode;

      activatedRoute.data = of({ creditCardFacility });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.creditCardOwnershipsSharedCollection).toContain(customerCategory);
      expect(comp.isoCurrencyCodesSharedCollection).toContain(currencyCode);
      expect(comp.creditCardFacility).toEqual(creditCardFacility);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditCardFacility>>();
      const creditCardFacility = { id: 123 };
      jest.spyOn(creditCardFacilityFormService, 'getCreditCardFacility').mockReturnValue(creditCardFacility);
      jest.spyOn(creditCardFacilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditCardFacility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: creditCardFacility }));
      saveSubject.complete();

      // THEN
      expect(creditCardFacilityFormService.getCreditCardFacility).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(creditCardFacilityService.update).toHaveBeenCalledWith(expect.objectContaining(creditCardFacility));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditCardFacility>>();
      const creditCardFacility = { id: 123 };
      jest.spyOn(creditCardFacilityFormService, 'getCreditCardFacility').mockReturnValue({ id: null });
      jest.spyOn(creditCardFacilityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditCardFacility: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: creditCardFacility }));
      saveSubject.complete();

      // THEN
      expect(creditCardFacilityFormService.getCreditCardFacility).toHaveBeenCalled();
      expect(creditCardFacilityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditCardFacility>>();
      const creditCardFacility = { id: 123 };
      jest.spyOn(creditCardFacilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditCardFacility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(creditCardFacilityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInstitutionCode', () => {
      it('Should forward to institutionCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(institutionCodeService, 'compareInstitutionCode');
        comp.compareInstitutionCode(entity, entity2);
        expect(institutionCodeService.compareInstitutionCode).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCreditCardOwnership', () => {
      it('Should forward to creditCardOwnershipService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(creditCardOwnershipService, 'compareCreditCardOwnership');
        comp.compareCreditCardOwnership(entity, entity2);
        expect(creditCardOwnershipService.compareCreditCardOwnership).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareIsoCurrencyCode', () => {
      it('Should forward to isoCurrencyCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(isoCurrencyCodeService, 'compareIsoCurrencyCode');
        comp.compareIsoCurrencyCode(entity, entity2);
        expect(isoCurrencyCodeService.compareIsoCurrencyCode).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
