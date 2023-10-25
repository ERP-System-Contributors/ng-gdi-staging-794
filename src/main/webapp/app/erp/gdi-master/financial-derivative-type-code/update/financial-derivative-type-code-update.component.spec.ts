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

import { FinancialDerivativeTypeCodeFormService } from './financial-derivative-type-code-form.service';
import { FinancialDerivativeTypeCodeService } from '../service/financial-derivative-type-code.service';
import { IFinancialDerivativeTypeCode } from '../financial-derivative-type-code.model';

import { FinancialDerivativeTypeCodeUpdateComponent } from './financial-derivative-type-code-update.component';

describe('FinancialDerivativeTypeCode Management Update Component', () => {
  let comp: FinancialDerivativeTypeCodeUpdateComponent;
  let fixture: ComponentFixture<FinancialDerivativeTypeCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let financialDerivativeTypeCodeFormService: FinancialDerivativeTypeCodeFormService;
  let financialDerivativeTypeCodeService: FinancialDerivativeTypeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FinancialDerivativeTypeCodeUpdateComponent],
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
      .overrideTemplate(FinancialDerivativeTypeCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FinancialDerivativeTypeCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    financialDerivativeTypeCodeFormService = TestBed.inject(FinancialDerivativeTypeCodeFormService);
    financialDerivativeTypeCodeService = TestBed.inject(FinancialDerivativeTypeCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const financialDerivativeTypeCode: IFinancialDerivativeTypeCode = { id: 456 };

      activatedRoute.data = of({ financialDerivativeTypeCode });
      comp.ngOnInit();

      expect(comp.financialDerivativeTypeCode).toEqual(financialDerivativeTypeCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFinancialDerivativeTypeCode>>();
      const financialDerivativeTypeCode = { id: 123 };
      jest.spyOn(financialDerivativeTypeCodeFormService, 'getFinancialDerivativeTypeCode').mockReturnValue(financialDerivativeTypeCode);
      jest.spyOn(financialDerivativeTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ financialDerivativeTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: financialDerivativeTypeCode }));
      saveSubject.complete();

      // THEN
      expect(financialDerivativeTypeCodeFormService.getFinancialDerivativeTypeCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(financialDerivativeTypeCodeService.update).toHaveBeenCalledWith(expect.objectContaining(financialDerivativeTypeCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFinancialDerivativeTypeCode>>();
      const financialDerivativeTypeCode = { id: 123 };
      jest.spyOn(financialDerivativeTypeCodeFormService, 'getFinancialDerivativeTypeCode').mockReturnValue({ id: null });
      jest.spyOn(financialDerivativeTypeCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ financialDerivativeTypeCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: financialDerivativeTypeCode }));
      saveSubject.complete();

      // THEN
      expect(financialDerivativeTypeCodeFormService.getFinancialDerivativeTypeCode).toHaveBeenCalled();
      expect(financialDerivativeTypeCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFinancialDerivativeTypeCode>>();
      const financialDerivativeTypeCode = { id: 123 };
      jest.spyOn(financialDerivativeTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ financialDerivativeTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(financialDerivativeTypeCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
