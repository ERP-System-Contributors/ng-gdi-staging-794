import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DepartmentTypeFormService } from './department-type-form.service';
import { DepartmentTypeService } from '../service/department-type.service';
import { IDepartmentType } from '../department-type.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { DepartmentTypeUpdateComponent } from './department-type-update.component';

describe('DepartmentType Management Update Component', () => {
  let comp: DepartmentTypeUpdateComponent;
  let fixture: ComponentFixture<DepartmentTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let departmentTypeFormService: DepartmentTypeFormService;
  let departmentTypeService: DepartmentTypeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DepartmentTypeUpdateComponent],
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
      .overrideTemplate(DepartmentTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    departmentTypeFormService = TestBed.inject(DepartmentTypeFormService);
    departmentTypeService = TestBed.inject(DepartmentTypeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const departmentType: IDepartmentType = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 17677 }];
      departmentType.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 87546 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ departmentType });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const departmentType: IDepartmentType = { id: 456 };
      const placeholder: IPlaceholder = { id: 12143 };
      departmentType.placeholders = [placeholder];

      activatedRoute.data = of({ departmentType });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.departmentType).toEqual(departmentType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartmentType>>();
      const departmentType = { id: 123 };
      jest.spyOn(departmentTypeFormService, 'getDepartmentType').mockReturnValue(departmentType);
      jest.spyOn(departmentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ departmentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: departmentType }));
      saveSubject.complete();

      // THEN
      expect(departmentTypeFormService.getDepartmentType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(departmentTypeService.update).toHaveBeenCalledWith(expect.objectContaining(departmentType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartmentType>>();
      const departmentType = { id: 123 };
      jest.spyOn(departmentTypeFormService, 'getDepartmentType').mockReturnValue({ id: null });
      jest.spyOn(departmentTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ departmentType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: departmentType }));
      saveSubject.complete();

      // THEN
      expect(departmentTypeFormService.getDepartmentType).toHaveBeenCalled();
      expect(departmentTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartmentType>>();
      const departmentType = { id: 123 };
      jest.spyOn(departmentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ departmentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(departmentTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
