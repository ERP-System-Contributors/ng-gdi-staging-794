import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InsiderCategoryTypesFormService } from './insider-category-types-form.service';
import { InsiderCategoryTypesService } from '../service/insider-category-types.service';
import { IInsiderCategoryTypes } from '../insider-category-types.model';

import { InsiderCategoryTypesUpdateComponent } from './insider-category-types-update.component';

describe('InsiderCategoryTypes Management Update Component', () => {
  let comp: InsiderCategoryTypesUpdateComponent;
  let fixture: ComponentFixture<InsiderCategoryTypesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let insiderCategoryTypesFormService: InsiderCategoryTypesFormService;
  let insiderCategoryTypesService: InsiderCategoryTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InsiderCategoryTypesUpdateComponent],
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
      .overrideTemplate(InsiderCategoryTypesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InsiderCategoryTypesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    insiderCategoryTypesFormService = TestBed.inject(InsiderCategoryTypesFormService);
    insiderCategoryTypesService = TestBed.inject(InsiderCategoryTypesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const insiderCategoryTypes: IInsiderCategoryTypes = { id: 456 };

      activatedRoute.data = of({ insiderCategoryTypes });
      comp.ngOnInit();

      expect(comp.insiderCategoryTypes).toEqual(insiderCategoryTypes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInsiderCategoryTypes>>();
      const insiderCategoryTypes = { id: 123 };
      jest.spyOn(insiderCategoryTypesFormService, 'getInsiderCategoryTypes').mockReturnValue(insiderCategoryTypes);
      jest.spyOn(insiderCategoryTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ insiderCategoryTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: insiderCategoryTypes }));
      saveSubject.complete();

      // THEN
      expect(insiderCategoryTypesFormService.getInsiderCategoryTypes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(insiderCategoryTypesService.update).toHaveBeenCalledWith(expect.objectContaining(insiderCategoryTypes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInsiderCategoryTypes>>();
      const insiderCategoryTypes = { id: 123 };
      jest.spyOn(insiderCategoryTypesFormService, 'getInsiderCategoryTypes').mockReturnValue({ id: null });
      jest.spyOn(insiderCategoryTypesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ insiderCategoryTypes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: insiderCategoryTypes }));
      saveSubject.complete();

      // THEN
      expect(insiderCategoryTypesFormService.getInsiderCategoryTypes).toHaveBeenCalled();
      expect(insiderCategoryTypesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInsiderCategoryTypes>>();
      const insiderCategoryTypes = { id: 123 };
      jest.spyOn(insiderCategoryTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ insiderCategoryTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(insiderCategoryTypesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
