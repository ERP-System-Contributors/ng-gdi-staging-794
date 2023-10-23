import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LoanRestructureFlagFormService } from './loan-restructure-flag-form.service';
import { LoanRestructureFlagService } from '../service/loan-restructure-flag.service';
import { ILoanRestructureFlag } from '../loan-restructure-flag.model';

import { LoanRestructureFlagUpdateComponent } from './loan-restructure-flag-update.component';

describe('LoanRestructureFlag Management Update Component', () => {
  let comp: LoanRestructureFlagUpdateComponent;
  let fixture: ComponentFixture<LoanRestructureFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanRestructureFlagFormService: LoanRestructureFlagFormService;
  let loanRestructureFlagService: LoanRestructureFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanRestructureFlagUpdateComponent],
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
      .overrideTemplate(LoanRestructureFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanRestructureFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanRestructureFlagFormService = TestBed.inject(LoanRestructureFlagFormService);
    loanRestructureFlagService = TestBed.inject(LoanRestructureFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanRestructureFlag: ILoanRestructureFlag = { id: 456 };

      activatedRoute.data = of({ loanRestructureFlag });
      comp.ngOnInit();

      expect(comp.loanRestructureFlag).toEqual(loanRestructureFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRestructureFlag>>();
      const loanRestructureFlag = { id: 123 };
      jest.spyOn(loanRestructureFlagFormService, 'getLoanRestructureFlag').mockReturnValue(loanRestructureFlag);
      jest.spyOn(loanRestructureFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRestructureFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanRestructureFlag }));
      saveSubject.complete();

      // THEN
      expect(loanRestructureFlagFormService.getLoanRestructureFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanRestructureFlagService.update).toHaveBeenCalledWith(expect.objectContaining(loanRestructureFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRestructureFlag>>();
      const loanRestructureFlag = { id: 123 };
      jest.spyOn(loanRestructureFlagFormService, 'getLoanRestructureFlag').mockReturnValue({ id: null });
      jest.spyOn(loanRestructureFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRestructureFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanRestructureFlag }));
      saveSubject.complete();

      // THEN
      expect(loanRestructureFlagFormService.getLoanRestructureFlag).toHaveBeenCalled();
      expect(loanRestructureFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRestructureFlag>>();
      const loanRestructureFlag = { id: 123 };
      jest.spyOn(loanRestructureFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRestructureFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanRestructureFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
