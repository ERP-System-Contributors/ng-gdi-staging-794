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

import { FiscalYearFormService } from './fiscal-year-form.service';
import { FiscalYearService } from '../service/fiscal-year.service';
import { IFiscalYear } from '../fiscal-year.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';

import { FiscalYearUpdateComponent } from './fiscal-year-update.component';

describe('FiscalYear Management Update Component', () => {
  let comp: FiscalYearUpdateComponent;
  let fixture: ComponentFixture<FiscalYearUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fiscalYearFormService: FiscalYearFormService;
  let fiscalYearService: FiscalYearService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let applicationUserService: ApplicationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FiscalYearUpdateComponent],
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
      .overrideTemplate(FiscalYearUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FiscalYearUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fiscalYearFormService = TestBed.inject(FiscalYearFormService);
    fiscalYearService = TestBed.inject(FiscalYearService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    applicationUserService = TestBed.inject(ApplicationUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const fiscalYear: IFiscalYear = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 74746 }];
      fiscalYear.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 59043 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalYear });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const fiscalYear: IFiscalYear = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 38065 }];
      fiscalYear.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 62058 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalYear });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const fiscalYear: IFiscalYear = { id: 456 };
      const createdBy: IApplicationUser = { id: 16069 };
      fiscalYear.createdBy = createdBy;
      const lastUpdatedBy: IApplicationUser = { id: 83744 };
      fiscalYear.lastUpdatedBy = lastUpdatedBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 38634 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [createdBy, lastUpdatedBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fiscalYear });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers.map(expect.objectContaining)
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fiscalYear: IFiscalYear = { id: 456 };
      const placeholder: IPlaceholder = { id: 59360 };
      fiscalYear.placeholders = [placeholder];
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 54334 };
      fiscalYear.universallyUniqueMappings = [universallyUniqueMapping];
      const createdBy: IApplicationUser = { id: 48932 };
      fiscalYear.createdBy = createdBy;
      const lastUpdatedBy: IApplicationUser = { id: 63857 };
      fiscalYear.lastUpdatedBy = lastUpdatedBy;

      activatedRoute.data = of({ fiscalYear });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.applicationUsersSharedCollection).toContain(createdBy);
      expect(comp.applicationUsersSharedCollection).toContain(lastUpdatedBy);
      expect(comp.fiscalYear).toEqual(fiscalYear);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalYear>>();
      const fiscalYear = { id: 123 };
      jest.spyOn(fiscalYearFormService, 'getFiscalYear').mockReturnValue(fiscalYear);
      jest.spyOn(fiscalYearService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalYear });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fiscalYear }));
      saveSubject.complete();

      // THEN
      expect(fiscalYearFormService.getFiscalYear).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fiscalYearService.update).toHaveBeenCalledWith(expect.objectContaining(fiscalYear));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalYear>>();
      const fiscalYear = { id: 123 };
      jest.spyOn(fiscalYearFormService, 'getFiscalYear').mockReturnValue({ id: null });
      jest.spyOn(fiscalYearService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalYear: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fiscalYear }));
      saveSubject.complete();

      // THEN
      expect(fiscalYearFormService.getFiscalYear).toHaveBeenCalled();
      expect(fiscalYearService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiscalYear>>();
      const fiscalYear = { id: 123 };
      jest.spyOn(fiscalYearService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fiscalYear });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fiscalYearService.update).toHaveBeenCalled();
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareApplicationUser', () => {
      it('Should forward to applicationUserService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(applicationUserService, 'compareApplicationUser');
        comp.compareApplicationUser(entity, entity2);
        expect(applicationUserService.compareApplicationUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
