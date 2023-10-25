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

import { LoanApplicationTypeFormService } from './loan-application-type-form.service';
import { LoanApplicationTypeService } from '../service/loan-application-type.service';
import { ILoanApplicationType } from '../loan-application-type.model';

import { LoanApplicationTypeUpdateComponent } from './loan-application-type-update.component';

describe('LoanApplicationType Management Update Component', () => {
  let comp: LoanApplicationTypeUpdateComponent;
  let fixture: ComponentFixture<LoanApplicationTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanApplicationTypeFormService: LoanApplicationTypeFormService;
  let loanApplicationTypeService: LoanApplicationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanApplicationTypeUpdateComponent],
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
      .overrideTemplate(LoanApplicationTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanApplicationTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanApplicationTypeFormService = TestBed.inject(LoanApplicationTypeFormService);
    loanApplicationTypeService = TestBed.inject(LoanApplicationTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanApplicationType: ILoanApplicationType = { id: 456 };

      activatedRoute.data = of({ loanApplicationType });
      comp.ngOnInit();

      expect(comp.loanApplicationType).toEqual(loanApplicationType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanApplicationType>>();
      const loanApplicationType = { id: 123 };
      jest.spyOn(loanApplicationTypeFormService, 'getLoanApplicationType').mockReturnValue(loanApplicationType);
      jest.spyOn(loanApplicationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanApplicationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanApplicationType }));
      saveSubject.complete();

      // THEN
      expect(loanApplicationTypeFormService.getLoanApplicationType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanApplicationTypeService.update).toHaveBeenCalledWith(expect.objectContaining(loanApplicationType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanApplicationType>>();
      const loanApplicationType = { id: 123 };
      jest.spyOn(loanApplicationTypeFormService, 'getLoanApplicationType').mockReturnValue({ id: null });
      jest.spyOn(loanApplicationTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanApplicationType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanApplicationType }));
      saveSubject.complete();

      // THEN
      expect(loanApplicationTypeFormService.getLoanApplicationType).toHaveBeenCalled();
      expect(loanApplicationTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanApplicationType>>();
      const loanApplicationType = { id: 123 };
      jest.spyOn(loanApplicationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanApplicationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanApplicationTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
