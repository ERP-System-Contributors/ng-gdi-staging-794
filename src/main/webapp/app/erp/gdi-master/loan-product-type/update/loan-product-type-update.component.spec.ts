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

import { LoanProductTypeFormService } from './loan-product-type-form.service';
import { LoanProductTypeService } from '../service/loan-product-type.service';
import { ILoanProductType } from '../loan-product-type.model';

import { LoanProductTypeUpdateComponent } from './loan-product-type-update.component';

describe('LoanProductType Management Update Component', () => {
  let comp: LoanProductTypeUpdateComponent;
  let fixture: ComponentFixture<LoanProductTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanProductTypeFormService: LoanProductTypeFormService;
  let loanProductTypeService: LoanProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanProductTypeUpdateComponent],
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
      .overrideTemplate(LoanProductTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanProductTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanProductTypeFormService = TestBed.inject(LoanProductTypeFormService);
    loanProductTypeService = TestBed.inject(LoanProductTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanProductType: ILoanProductType = { id: 456 };

      activatedRoute.data = of({ loanProductType });
      comp.ngOnInit();

      expect(comp.loanProductType).toEqual(loanProductType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanProductType>>();
      const loanProductType = { id: 123 };
      jest.spyOn(loanProductTypeFormService, 'getLoanProductType').mockReturnValue(loanProductType);
      jest.spyOn(loanProductTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanProductType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanProductType }));
      saveSubject.complete();

      // THEN
      expect(loanProductTypeFormService.getLoanProductType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanProductTypeService.update).toHaveBeenCalledWith(expect.objectContaining(loanProductType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanProductType>>();
      const loanProductType = { id: 123 };
      jest.spyOn(loanProductTypeFormService, 'getLoanProductType').mockReturnValue({ id: null });
      jest.spyOn(loanProductTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanProductType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanProductType }));
      saveSubject.complete();

      // THEN
      expect(loanProductTypeFormService.getLoanProductType).toHaveBeenCalled();
      expect(loanProductTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanProductType>>();
      const loanProductType = { id: 123 };
      jest.spyOn(loanProductTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanProductType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanProductTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
