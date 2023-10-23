import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LoanAccountCategoryFormService } from './loan-account-category-form.service';
import { LoanAccountCategoryService } from '../service/loan-account-category.service';
import { ILoanAccountCategory } from '../loan-account-category.model';

import { LoanAccountCategoryUpdateComponent } from './loan-account-category-update.component';

describe('LoanAccountCategory Management Update Component', () => {
  let comp: LoanAccountCategoryUpdateComponent;
  let fixture: ComponentFixture<LoanAccountCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanAccountCategoryFormService: LoanAccountCategoryFormService;
  let loanAccountCategoryService: LoanAccountCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanAccountCategoryUpdateComponent],
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
      .overrideTemplate(LoanAccountCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanAccountCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanAccountCategoryFormService = TestBed.inject(LoanAccountCategoryFormService);
    loanAccountCategoryService = TestBed.inject(LoanAccountCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanAccountCategory: ILoanAccountCategory = { id: 456 };

      activatedRoute.data = of({ loanAccountCategory });
      comp.ngOnInit();

      expect(comp.loanAccountCategory).toEqual(loanAccountCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanAccountCategory>>();
      const loanAccountCategory = { id: 123 };
      jest.spyOn(loanAccountCategoryFormService, 'getLoanAccountCategory').mockReturnValue(loanAccountCategory);
      jest.spyOn(loanAccountCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanAccountCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanAccountCategory }));
      saveSubject.complete();

      // THEN
      expect(loanAccountCategoryFormService.getLoanAccountCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanAccountCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(loanAccountCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanAccountCategory>>();
      const loanAccountCategory = { id: 123 };
      jest.spyOn(loanAccountCategoryFormService, 'getLoanAccountCategory').mockReturnValue({ id: null });
      jest.spyOn(loanAccountCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanAccountCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanAccountCategory }));
      saveSubject.complete();

      // THEN
      expect(loanAccountCategoryFormService.getLoanAccountCategory).toHaveBeenCalled();
      expect(loanAccountCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanAccountCategory>>();
      const loanAccountCategory = { id: 123 };
      jest.spyOn(loanAccountCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanAccountCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanAccountCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
