import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LoanRepaymentFrequencyFormService } from './loan-repayment-frequency-form.service';
import { LoanRepaymentFrequencyService } from '../service/loan-repayment-frequency.service';
import { ILoanRepaymentFrequency } from '../loan-repayment-frequency.model';

import { LoanRepaymentFrequencyUpdateComponent } from './loan-repayment-frequency-update.component';

describe('LoanRepaymentFrequency Management Update Component', () => {
  let comp: LoanRepaymentFrequencyUpdateComponent;
  let fixture: ComponentFixture<LoanRepaymentFrequencyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanRepaymentFrequencyFormService: LoanRepaymentFrequencyFormService;
  let loanRepaymentFrequencyService: LoanRepaymentFrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanRepaymentFrequencyUpdateComponent],
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
      .overrideTemplate(LoanRepaymentFrequencyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanRepaymentFrequencyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanRepaymentFrequencyFormService = TestBed.inject(LoanRepaymentFrequencyFormService);
    loanRepaymentFrequencyService = TestBed.inject(LoanRepaymentFrequencyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanRepaymentFrequency: ILoanRepaymentFrequency = { id: 456 };

      activatedRoute.data = of({ loanRepaymentFrequency });
      comp.ngOnInit();

      expect(comp.loanRepaymentFrequency).toEqual(loanRepaymentFrequency);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRepaymentFrequency>>();
      const loanRepaymentFrequency = { id: 123 };
      jest.spyOn(loanRepaymentFrequencyFormService, 'getLoanRepaymentFrequency').mockReturnValue(loanRepaymentFrequency);
      jest.spyOn(loanRepaymentFrequencyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRepaymentFrequency });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanRepaymentFrequency }));
      saveSubject.complete();

      // THEN
      expect(loanRepaymentFrequencyFormService.getLoanRepaymentFrequency).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanRepaymentFrequencyService.update).toHaveBeenCalledWith(expect.objectContaining(loanRepaymentFrequency));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRepaymentFrequency>>();
      const loanRepaymentFrequency = { id: 123 };
      jest.spyOn(loanRepaymentFrequencyFormService, 'getLoanRepaymentFrequency').mockReturnValue({ id: null });
      jest.spyOn(loanRepaymentFrequencyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRepaymentFrequency: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanRepaymentFrequency }));
      saveSubject.complete();

      // THEN
      expect(loanRepaymentFrequencyFormService.getLoanRepaymentFrequency).toHaveBeenCalled();
      expect(loanRepaymentFrequencyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRepaymentFrequency>>();
      const loanRepaymentFrequency = { id: 123 };
      jest.spyOn(loanRepaymentFrequencyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRepaymentFrequency });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanRepaymentFrequencyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
