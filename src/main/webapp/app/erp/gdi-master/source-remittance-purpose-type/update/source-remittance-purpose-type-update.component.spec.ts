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

import { SourceRemittancePurposeTypeFormService } from './source-remittance-purpose-type-form.service';
import { SourceRemittancePurposeTypeService } from '../service/source-remittance-purpose-type.service';
import { ISourceRemittancePurposeType } from '../source-remittance-purpose-type.model';

import { SourceRemittancePurposeTypeUpdateComponent } from './source-remittance-purpose-type-update.component';

describe('SourceRemittancePurposeType Management Update Component', () => {
  let comp: SourceRemittancePurposeTypeUpdateComponent;
  let fixture: ComponentFixture<SourceRemittancePurposeTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sourceRemittancePurposeTypeFormService: SourceRemittancePurposeTypeFormService;
  let sourceRemittancePurposeTypeService: SourceRemittancePurposeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SourceRemittancePurposeTypeUpdateComponent],
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
      .overrideTemplate(SourceRemittancePurposeTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SourceRemittancePurposeTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sourceRemittancePurposeTypeFormService = TestBed.inject(SourceRemittancePurposeTypeFormService);
    sourceRemittancePurposeTypeService = TestBed.inject(SourceRemittancePurposeTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const sourceRemittancePurposeType: ISourceRemittancePurposeType = { id: 456 };

      activatedRoute.data = of({ sourceRemittancePurposeType });
      comp.ngOnInit();

      expect(comp.sourceRemittancePurposeType).toEqual(sourceRemittancePurposeType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISourceRemittancePurposeType>>();
      const sourceRemittancePurposeType = { id: 123 };
      jest.spyOn(sourceRemittancePurposeTypeFormService, 'getSourceRemittancePurposeType').mockReturnValue(sourceRemittancePurposeType);
      jest.spyOn(sourceRemittancePurposeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourceRemittancePurposeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sourceRemittancePurposeType }));
      saveSubject.complete();

      // THEN
      expect(sourceRemittancePurposeTypeFormService.getSourceRemittancePurposeType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sourceRemittancePurposeTypeService.update).toHaveBeenCalledWith(expect.objectContaining(sourceRemittancePurposeType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISourceRemittancePurposeType>>();
      const sourceRemittancePurposeType = { id: 123 };
      jest.spyOn(sourceRemittancePurposeTypeFormService, 'getSourceRemittancePurposeType').mockReturnValue({ id: null });
      jest.spyOn(sourceRemittancePurposeTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourceRemittancePurposeType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sourceRemittancePurposeType }));
      saveSubject.complete();

      // THEN
      expect(sourceRemittancePurposeTypeFormService.getSourceRemittancePurposeType).toHaveBeenCalled();
      expect(sourceRemittancePurposeTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISourceRemittancePurposeType>>();
      const sourceRemittancePurposeType = { id: 123 };
      jest.spyOn(sourceRemittancePurposeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourceRemittancePurposeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sourceRemittancePurposeTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
