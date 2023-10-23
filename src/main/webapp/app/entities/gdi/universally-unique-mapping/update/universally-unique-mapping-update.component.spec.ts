import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UniversallyUniqueMappingFormService } from './universally-unique-mapping-form.service';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';
import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { UniversallyUniqueMappingUpdateComponent } from './universally-unique-mapping-update.component';

describe('UniversallyUniqueMapping Management Update Component', () => {
  let comp: UniversallyUniqueMappingUpdateComponent;
  let fixture: ComponentFixture<UniversallyUniqueMappingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let universallyUniqueMappingFormService: UniversallyUniqueMappingFormService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UniversallyUniqueMappingUpdateComponent],
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
      .overrideTemplate(UniversallyUniqueMappingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UniversallyUniqueMappingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    universallyUniqueMappingFormService = TestBed.inject(UniversallyUniqueMappingFormService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 456 };
      const parentMapping: IUniversallyUniqueMapping = { id: 74863 };
      universallyUniqueMapping.parentMapping = parentMapping;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 8460 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [parentMapping];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 18993 }];
      universallyUniqueMapping.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 27906 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 456 };
      const parentMapping: IUniversallyUniqueMapping = { id: 59051 };
      universallyUniqueMapping.parentMapping = parentMapping;
      const placeholder: IPlaceholder = { id: 34374 };
      universallyUniqueMapping.placeholders = [placeholder];

      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parentMapping);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMapping).toEqual(universallyUniqueMapping);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
      jest.spyOn(universallyUniqueMappingFormService, 'getUniversallyUniqueMapping').mockReturnValue(universallyUniqueMapping);
      jest.spyOn(universallyUniqueMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: universallyUniqueMapping }));
      saveSubject.complete();

      // THEN
      expect(universallyUniqueMappingFormService.getUniversallyUniqueMapping).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(universallyUniqueMappingService.update).toHaveBeenCalledWith(expect.objectContaining(universallyUniqueMapping));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
      jest.spyOn(universallyUniqueMappingFormService, 'getUniversallyUniqueMapping').mockReturnValue({ id: null });
      jest.spyOn(universallyUniqueMappingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: universallyUniqueMapping }));
      saveSubject.complete();

      // THEN
      expect(universallyUniqueMappingFormService.getUniversallyUniqueMapping).toHaveBeenCalled();
      expect(universallyUniqueMappingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniversallyUniqueMapping>>();
      const universallyUniqueMapping = { id: 123 };
      jest.spyOn(universallyUniqueMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ universallyUniqueMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(universallyUniqueMappingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
