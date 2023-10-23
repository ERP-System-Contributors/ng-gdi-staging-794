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

import { LoanPerformanceClassificationFormService } from './loan-performance-classification-form.service';
import { LoanPerformanceClassificationService } from '../service/loan-performance-classification.service';
import { ILoanPerformanceClassification } from '../loan-performance-classification.model';

import { LoanPerformanceClassificationUpdateComponent } from './loan-performance-classification-update.component';

describe('LoanPerformanceClassification Management Update Component', () => {
  let comp: LoanPerformanceClassificationUpdateComponent;
  let fixture: ComponentFixture<LoanPerformanceClassificationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanPerformanceClassificationFormService: LoanPerformanceClassificationFormService;
  let loanPerformanceClassificationService: LoanPerformanceClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanPerformanceClassificationUpdateComponent],
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
      .overrideTemplate(LoanPerformanceClassificationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanPerformanceClassificationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanPerformanceClassificationFormService = TestBed.inject(LoanPerformanceClassificationFormService);
    loanPerformanceClassificationService = TestBed.inject(LoanPerformanceClassificationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanPerformanceClassification: ILoanPerformanceClassification = { id: 456 };

      activatedRoute.data = of({ loanPerformanceClassification });
      comp.ngOnInit();

      expect(comp.loanPerformanceClassification).toEqual(loanPerformanceClassification);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanPerformanceClassification>>();
      const loanPerformanceClassification = { id: 123 };
      jest
        .spyOn(loanPerformanceClassificationFormService, 'getLoanPerformanceClassification')
        .mockReturnValue(loanPerformanceClassification);
      jest.spyOn(loanPerformanceClassificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanPerformanceClassification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanPerformanceClassification }));
      saveSubject.complete();

      // THEN
      expect(loanPerformanceClassificationFormService.getLoanPerformanceClassification).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanPerformanceClassificationService.update).toHaveBeenCalledWith(expect.objectContaining(loanPerformanceClassification));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanPerformanceClassification>>();
      const loanPerformanceClassification = { id: 123 };
      jest.spyOn(loanPerformanceClassificationFormService, 'getLoanPerformanceClassification').mockReturnValue({ id: null });
      jest.spyOn(loanPerformanceClassificationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanPerformanceClassification: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanPerformanceClassification }));
      saveSubject.complete();

      // THEN
      expect(loanPerformanceClassificationFormService.getLoanPerformanceClassification).toHaveBeenCalled();
      expect(loanPerformanceClassificationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanPerformanceClassification>>();
      const loanPerformanceClassification = { id: 123 };
      jest.spyOn(loanPerformanceClassificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanPerformanceClassification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanPerformanceClassificationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
