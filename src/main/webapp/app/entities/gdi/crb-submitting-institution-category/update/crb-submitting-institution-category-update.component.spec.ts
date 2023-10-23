import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbSubmittingInstitutionCategoryFormService } from './crb-submitting-institution-category-form.service';
import { CrbSubmittingInstitutionCategoryService } from '../service/crb-submitting-institution-category.service';
import { ICrbSubmittingInstitutionCategory } from '../crb-submitting-institution-category.model';

import { CrbSubmittingInstitutionCategoryUpdateComponent } from './crb-submitting-institution-category-update.component';

describe('CrbSubmittingInstitutionCategory Management Update Component', () => {
  let comp: CrbSubmittingInstitutionCategoryUpdateComponent;
  let fixture: ComponentFixture<CrbSubmittingInstitutionCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbSubmittingInstitutionCategoryFormService: CrbSubmittingInstitutionCategoryFormService;
  let crbSubmittingInstitutionCategoryService: CrbSubmittingInstitutionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbSubmittingInstitutionCategoryUpdateComponent],
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
      .overrideTemplate(CrbSubmittingInstitutionCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbSubmittingInstitutionCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbSubmittingInstitutionCategoryFormService = TestBed.inject(CrbSubmittingInstitutionCategoryFormService);
    crbSubmittingInstitutionCategoryService = TestBed.inject(CrbSubmittingInstitutionCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory = { id: 456 };

      activatedRoute.data = of({ crbSubmittingInstitutionCategory });
      comp.ngOnInit();

      expect(comp.crbSubmittingInstitutionCategory).toEqual(crbSubmittingInstitutionCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSubmittingInstitutionCategory>>();
      const crbSubmittingInstitutionCategory = { id: 123 };
      jest
        .spyOn(crbSubmittingInstitutionCategoryFormService, 'getCrbSubmittingInstitutionCategory')
        .mockReturnValue(crbSubmittingInstitutionCategory);
      jest.spyOn(crbSubmittingInstitutionCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSubmittingInstitutionCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbSubmittingInstitutionCategory }));
      saveSubject.complete();

      // THEN
      expect(crbSubmittingInstitutionCategoryFormService.getCrbSubmittingInstitutionCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbSubmittingInstitutionCategoryService.update).toHaveBeenCalledWith(
        expect.objectContaining(crbSubmittingInstitutionCategory)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSubmittingInstitutionCategory>>();
      const crbSubmittingInstitutionCategory = { id: 123 };
      jest.spyOn(crbSubmittingInstitutionCategoryFormService, 'getCrbSubmittingInstitutionCategory').mockReturnValue({ id: null });
      jest.spyOn(crbSubmittingInstitutionCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSubmittingInstitutionCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbSubmittingInstitutionCategory }));
      saveSubject.complete();

      // THEN
      expect(crbSubmittingInstitutionCategoryFormService.getCrbSubmittingInstitutionCategory).toHaveBeenCalled();
      expect(crbSubmittingInstitutionCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSubmittingInstitutionCategory>>();
      const crbSubmittingInstitutionCategory = { id: 123 };
      jest.spyOn(crbSubmittingInstitutionCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSubmittingInstitutionCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbSubmittingInstitutionCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
