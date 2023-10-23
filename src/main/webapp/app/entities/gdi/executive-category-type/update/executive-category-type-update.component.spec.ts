import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ExecutiveCategoryTypeFormService } from './executive-category-type-form.service';
import { ExecutiveCategoryTypeService } from '../service/executive-category-type.service';
import { IExecutiveCategoryType } from '../executive-category-type.model';

import { ExecutiveCategoryTypeUpdateComponent } from './executive-category-type-update.component';

describe('ExecutiveCategoryType Management Update Component', () => {
  let comp: ExecutiveCategoryTypeUpdateComponent;
  let fixture: ComponentFixture<ExecutiveCategoryTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let executiveCategoryTypeFormService: ExecutiveCategoryTypeFormService;
  let executiveCategoryTypeService: ExecutiveCategoryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ExecutiveCategoryTypeUpdateComponent],
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
      .overrideTemplate(ExecutiveCategoryTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExecutiveCategoryTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    executiveCategoryTypeFormService = TestBed.inject(ExecutiveCategoryTypeFormService);
    executiveCategoryTypeService = TestBed.inject(ExecutiveCategoryTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const executiveCategoryType: IExecutiveCategoryType = { id: 456 };

      activatedRoute.data = of({ executiveCategoryType });
      comp.ngOnInit();

      expect(comp.executiveCategoryType).toEqual(executiveCategoryType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExecutiveCategoryType>>();
      const executiveCategoryType = { id: 123 };
      jest.spyOn(executiveCategoryTypeFormService, 'getExecutiveCategoryType').mockReturnValue(executiveCategoryType);
      jest.spyOn(executiveCategoryTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ executiveCategoryType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: executiveCategoryType }));
      saveSubject.complete();

      // THEN
      expect(executiveCategoryTypeFormService.getExecutiveCategoryType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(executiveCategoryTypeService.update).toHaveBeenCalledWith(expect.objectContaining(executiveCategoryType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExecutiveCategoryType>>();
      const executiveCategoryType = { id: 123 };
      jest.spyOn(executiveCategoryTypeFormService, 'getExecutiveCategoryType').mockReturnValue({ id: null });
      jest.spyOn(executiveCategoryTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ executiveCategoryType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: executiveCategoryType }));
      saveSubject.complete();

      // THEN
      expect(executiveCategoryTypeFormService.getExecutiveCategoryType).toHaveBeenCalled();
      expect(executiveCategoryTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExecutiveCategoryType>>();
      const executiveCategoryType = { id: 123 };
      jest.spyOn(executiveCategoryTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ executiveCategoryType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(executiveCategoryTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
