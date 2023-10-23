import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LoanApplicationStatusFormService } from './loan-application-status-form.service';
import { LoanApplicationStatusService } from '../service/loan-application-status.service';
import { ILoanApplicationStatus } from '../loan-application-status.model';

import { LoanApplicationStatusUpdateComponent } from './loan-application-status-update.component';

describe('LoanApplicationStatus Management Update Component', () => {
  let comp: LoanApplicationStatusUpdateComponent;
  let fixture: ComponentFixture<LoanApplicationStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanApplicationStatusFormService: LoanApplicationStatusFormService;
  let loanApplicationStatusService: LoanApplicationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanApplicationStatusUpdateComponent],
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
      .overrideTemplate(LoanApplicationStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanApplicationStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanApplicationStatusFormService = TestBed.inject(LoanApplicationStatusFormService);
    loanApplicationStatusService = TestBed.inject(LoanApplicationStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanApplicationStatus: ILoanApplicationStatus = { id: 456 };

      activatedRoute.data = of({ loanApplicationStatus });
      comp.ngOnInit();

      expect(comp.loanApplicationStatus).toEqual(loanApplicationStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanApplicationStatus>>();
      const loanApplicationStatus = { id: 123 };
      jest.spyOn(loanApplicationStatusFormService, 'getLoanApplicationStatus').mockReturnValue(loanApplicationStatus);
      jest.spyOn(loanApplicationStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanApplicationStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanApplicationStatus }));
      saveSubject.complete();

      // THEN
      expect(loanApplicationStatusFormService.getLoanApplicationStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanApplicationStatusService.update).toHaveBeenCalledWith(expect.objectContaining(loanApplicationStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanApplicationStatus>>();
      const loanApplicationStatus = { id: 123 };
      jest.spyOn(loanApplicationStatusFormService, 'getLoanApplicationStatus').mockReturnValue({ id: null });
      jest.spyOn(loanApplicationStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanApplicationStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanApplicationStatus }));
      saveSubject.complete();

      // THEN
      expect(loanApplicationStatusFormService.getLoanApplicationStatus).toHaveBeenCalled();
      expect(loanApplicationStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanApplicationStatus>>();
      const loanApplicationStatus = { id: 123 };
      jest.spyOn(loanApplicationStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanApplicationStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanApplicationStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
