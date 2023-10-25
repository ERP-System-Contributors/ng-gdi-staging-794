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

import { FxReceiptPurposeTypeFormService } from './fx-receipt-purpose-type-form.service';
import { FxReceiptPurposeTypeService } from '../service/fx-receipt-purpose-type.service';
import { IFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';

import { FxReceiptPurposeTypeUpdateComponent } from './fx-receipt-purpose-type-update.component';

describe('FxReceiptPurposeType Management Update Component', () => {
  let comp: FxReceiptPurposeTypeUpdateComponent;
  let fixture: ComponentFixture<FxReceiptPurposeTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fxReceiptPurposeTypeFormService: FxReceiptPurposeTypeFormService;
  let fxReceiptPurposeTypeService: FxReceiptPurposeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FxReceiptPurposeTypeUpdateComponent],
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
      .overrideTemplate(FxReceiptPurposeTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FxReceiptPurposeTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fxReceiptPurposeTypeFormService = TestBed.inject(FxReceiptPurposeTypeFormService);
    fxReceiptPurposeTypeService = TestBed.inject(FxReceiptPurposeTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fxReceiptPurposeType: IFxReceiptPurposeType = { id: 456 };

      activatedRoute.data = of({ fxReceiptPurposeType });
      comp.ngOnInit();

      expect(comp.fxReceiptPurposeType).toEqual(fxReceiptPurposeType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxReceiptPurposeType>>();
      const fxReceiptPurposeType = { id: 123 };
      jest.spyOn(fxReceiptPurposeTypeFormService, 'getFxReceiptPurposeType').mockReturnValue(fxReceiptPurposeType);
      jest.spyOn(fxReceiptPurposeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxReceiptPurposeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxReceiptPurposeType }));
      saveSubject.complete();

      // THEN
      expect(fxReceiptPurposeTypeFormService.getFxReceiptPurposeType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fxReceiptPurposeTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fxReceiptPurposeType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxReceiptPurposeType>>();
      const fxReceiptPurposeType = { id: 123 };
      jest.spyOn(fxReceiptPurposeTypeFormService, 'getFxReceiptPurposeType').mockReturnValue({ id: null });
      jest.spyOn(fxReceiptPurposeTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxReceiptPurposeType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxReceiptPurposeType }));
      saveSubject.complete();

      // THEN
      expect(fxReceiptPurposeTypeFormService.getFxReceiptPurposeType).toHaveBeenCalled();
      expect(fxReceiptPurposeTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxReceiptPurposeType>>();
      const fxReceiptPurposeType = { id: 123 };
      jest.spyOn(fxReceiptPurposeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxReceiptPurposeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fxReceiptPurposeTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
