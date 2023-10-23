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

import { FiscalMonthFormService } from './fiscal-month-form.service';
import { FiscalMonthService } from '../service/fiscal-month.service';
import { IFiscalMonth } from '../fiscal-month.model';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { FiscalYearService } from 'app/entities/system/fiscal-year/service/fiscal-year.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';
import { IFiscalQuarter } from 'app/entities/system/fiscal-quarter/fiscal-quarter.model';
import { FiscalQuarterService } from 'app/entities/system/fiscal-quarter/service/fiscal-quarter.service';

import { FiscalMonthUpdateComponent } from './fiscal-month-update.component';

describe('FiscalMonth Management Update Component', () => {
  let comp: FiscalMonthUpdateComponent;
  let fixture: ComponentFixture<FiscalMonthUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fiscalMonthFormService: FiscalMonthFormService;
  let fiscalMonthService: FiscalMonthService;
  let fiscalYearService: FiscalYearService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let fiscalQuarterService: FiscalQuarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FiscalMonthUpdateComponent],
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
      .overrideTemplate(FiscalMonthUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FiscalMonthUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fiscalMonthFormService = TestBed.inject(FiscalMonthFormService);
    fiscalMonthService = TestBed.inject(FiscalMonthService);
    fiscalYearService = TestBed.inject(FiscalYearService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    fiscalQuarterService = TestBed.inject(FiscalQuarterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call FiscalYear query and add missing value', () => {
      const fiscalMonth: IFiscalMonth = { id: 456 };
      const fiscalYear: IFiscalYear = { id: 50742 };
      fiscalMonth.fiscalYear = fiscalYear;

      const fiscalYearCollection: IFiscalYear[] = [{ id: 7476 }];
      jest.spyOn(fiscalYearService, 'query').mockReturnValue(of(new HttpResponse({ body: fiscalYearCollection })));
      const additionalFiscalYears = [fiscalYear];
      const expectedCollection: IFiscalYear[] = [...additionalFiscalYears, ...fiscalYearCollection];
      jest.spyOn(fiscalYearService, 'addFiscalYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      expect(fiscalYearService.query).toHaveBeenCalled();
      expect(fiscalYearService.addFiscalYearToCollectionIfMissing).toHaveBeenCalledWith(
        fiscalYearCollection,
        ...additionalFiscalYears.map(expect.objectContaining)
      );
      expect(comp.fiscalYearsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const fiscalMonth: IFiscalMonth = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 51444 }];
      fiscalMonth.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 35444 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const fiscalMonth: IFiscalMonth = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 178 }];
      fiscalMonth.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 87257 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FiscalQuarter query and add missing value', () => {
      const fiscalMonth: IFiscalMonth = { id: 456 };
      const fiscalQuarter: IFiscalQuarter = { id: 49157 };
      fiscalMonth.fiscalQuarter = fiscalQuarter;

      const fiscalQuarterCollection: IFiscalQuarter[] = [{ id: 49551 }];
      jest.spyOn(fiscalQuarterService, 'query').mockReturnValue(of(new HttpResponse({ body: fiscalQuarterCollection })));
      const additionalFiscalQuarters = [fiscalQuarter];
      const expectedCollection: IFiscalQuarter[] = [...additionalFiscalQuarters, ...fiscalQuarterCollection];
      jest.spyOn(fiscalQuarterService, 'addFiscalQuarterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      expect(fiscalQuarterService.query).toHaveBeenCalled();
      expect(fiscalQuarterService.addFiscalQuarterToCollectionIfMissing).toHaveBeenCalledWith(
        fiscalQuarterCollection,
        ...additionalFiscalQuarters.map(expect.objectContaining)
      );
      expect(comp.fiscalQuartersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fiscalMonth: IFiscalMonth = { id: 456 };
      const fiscalYear: IFiscalYear = { id: 17337 };
      fiscalMonth.fiscalYear = fiscalYear;
      const placeholder: IPlaceholder = { id: 96095 };
      fiscalMonth.placeholders = [placeholder];
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 63395 };
      fiscalMonth.universallyUniqueMappings = [universallyUniqueMapping];
      const fiscalQuarter: IFiscalQuarter = { id: 53256 };
      fiscalMonth.fiscalQuarter = fiscalQuarter;

      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      expect(comp.fiscalYearsSharedCollection).toContain(fiscalYear);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.fiscalQuartersSharedCollection).toContain(fiscalQuarter);
      expect(comp.fiscalMonth).toEqual(fiscalMonth);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalMonth>>();
      const fiscalMonth = { id: 123 };
      jest.spyOn(fiscalMonthFormService, 'getFiscalMonth').mockReturnValue(fiscalMonth);
      jest.spyOn(fiscalMonthService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fiscalMonth }));
      saveSubject.complete();

      // THEN
      expect(fiscalMonthFormService.getFiscalMonth).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fiscalMonthService.update).toHaveBeenCalledWith(expect.objectContaining(fiscalMonth));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalMonth>>();
      const fiscalMonth = { id: 123 };
      jest.spyOn(fiscalMonthFormService, 'getFiscalMonth').mockReturnValue({ id: null });
      jest.spyOn(fiscalMonthService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalMonth: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fiscalMonth }));
      saveSubject.complete();

      // THEN
      expect(fiscalMonthFormService.getFiscalMonth).toHaveBeenCalled();
      expect(fiscalMonthService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalMonth>>();
      const fiscalMonth = { id: 123 };
      jest.spyOn(fiscalMonthService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalMonth });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fiscalMonthService.update).toHaveBeenCalled();
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

    describe('compareFiscalQuarter', () => {
      it('Should forward to fiscalQuarterService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(fiscalQuarterService, 'compareFiscalQuarter');
        comp.compareFiscalQuarter(entity, entity2);
        expect(fiscalQuarterService.compareFiscalQuarter).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
