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

import { FiscalQuarterFormService } from './fiscal-quarter-form.service';
import { FiscalQuarterService } from '../service/fiscal-quarter.service';
import { IFiscalQuarter } from '../fiscal-quarter.model';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { FiscalYearService } from 'app/entities/system/fiscal-year/service/fiscal-year.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';

import { FiscalQuarterUpdateComponent } from './fiscal-quarter-update.component';

describe('FiscalQuarter Management Update Component', () => {
  let comp: FiscalQuarterUpdateComponent;
  let fixture: ComponentFixture<FiscalQuarterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fiscalQuarterFormService: FiscalQuarterFormService;
  let fiscalQuarterService: FiscalQuarterService;
  let fiscalYearService: FiscalYearService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FiscalQuarterUpdateComponent],
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
      .overrideTemplate(FiscalQuarterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FiscalQuarterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fiscalQuarterFormService = TestBed.inject(FiscalQuarterFormService);
    fiscalQuarterService = TestBed.inject(FiscalQuarterService);
    fiscalYearService = TestBed.inject(FiscalYearService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call FiscalYear query and add missing value', () => {
      const fiscalQuarter: IFiscalQuarter = { id: 456 };
      const fiscalYear: IFiscalYear = { id: 17962 };
      fiscalQuarter.fiscalYear = fiscalYear;

      const fiscalYearCollection: IFiscalYear[] = [{ id: 66602 }];
      jest.spyOn(fiscalYearService, 'query').mockReturnValue(of(new HttpResponse({ body: fiscalYearCollection })));
      const additionalFiscalYears = [fiscalYear];
      const expectedCollection: IFiscalYear[] = [...additionalFiscalYears, ...fiscalYearCollection];
      jest.spyOn(fiscalYearService, 'addFiscalYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalQuarter });
      comp.ngOnInit();

      expect(fiscalYearService.query).toHaveBeenCalled();
      expect(fiscalYearService.addFiscalYearToCollectionIfMissing).toHaveBeenCalledWith(
        fiscalYearCollection,
        ...additionalFiscalYears.map(expect.objectContaining)
      );
      expect(comp.fiscalYearsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const fiscalQuarter: IFiscalQuarter = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 89947 }];
      fiscalQuarter.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 23308 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalQuarter });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const fiscalQuarter: IFiscalQuarter = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 91695 }];
      fiscalQuarter.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 24235 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalQuarter });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fiscalQuarter: IFiscalQuarter = { id: 456 };
      const fiscalYear: IFiscalYear = { id: 23620 };
      fiscalQuarter.fiscalYear = fiscalYear;
      const placeholder: IPlaceholder = { id: 39312 };
      fiscalQuarter.placeholders = [placeholder];
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 19909 };
      fiscalQuarter.universallyUniqueMappings = [universallyUniqueMapping];

      activatedRoute.data = of({ fiscalQuarter });
      comp.ngOnInit();

      expect(comp.fiscalYearsSharedCollection).toContain(fiscalYear);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.fiscalQuarter).toEqual(fiscalQuarter);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalQuarter>>();
      const fiscalQuarter = { id: 123 };
      jest.spyOn(fiscalQuarterFormService, 'getFiscalQuarter').mockReturnValue(fiscalQuarter);
      jest.spyOn(fiscalQuarterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalQuarter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fiscalQuarter }));
      saveSubject.complete();

      // THEN
      expect(fiscalQuarterFormService.getFiscalQuarter).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fiscalQuarterService.update).toHaveBeenCalledWith(expect.objectContaining(fiscalQuarter));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalQuarter>>();
      const fiscalQuarter = { id: 123 };
      jest.spyOn(fiscalQuarterFormService, 'getFiscalQuarter').mockReturnValue({ id: null });
      jest.spyOn(fiscalQuarterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalQuarter: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fiscalQuarter }));
      saveSubject.complete();

      // THEN
      expect(fiscalQuarterFormService.getFiscalQuarter).toHaveBeenCalled();
      expect(fiscalQuarterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalQuarter>>();
      const fiscalQuarter = { id: 123 };
      jest.spyOn(fiscalQuarterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalQuarter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fiscalQuarterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFiscalYear', () => {
      it('Should forward to fiscalYearService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(fiscalYearService, 'compareFiscalYear');
        comp.compareFiscalYear(entity, entity2);
        expect(fiscalYearService.compareFiscalYear).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
