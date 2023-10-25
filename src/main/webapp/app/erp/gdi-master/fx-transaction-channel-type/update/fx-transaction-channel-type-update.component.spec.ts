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

import { FxTransactionChannelTypeFormService } from './fx-transaction-channel-type-form.service';
import { FxTransactionChannelTypeService } from '../service/fx-transaction-channel-type.service';
import { IFxTransactionChannelType } from '../fx-transaction-channel-type.model';

import { FxTransactionChannelTypeUpdateComponent } from './fx-transaction-channel-type-update.component';

describe('FxTransactionChannelType Management Update Component', () => {
  let comp: FxTransactionChannelTypeUpdateComponent;
  let fixture: ComponentFixture<FxTransactionChannelTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fxTransactionChannelTypeFormService: FxTransactionChannelTypeFormService;
  let fxTransactionChannelTypeService: FxTransactionChannelTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FxTransactionChannelTypeUpdateComponent],
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
      .overrideTemplate(FxTransactionChannelTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FxTransactionChannelTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fxTransactionChannelTypeFormService = TestBed.inject(FxTransactionChannelTypeFormService);
    fxTransactionChannelTypeService = TestBed.inject(FxTransactionChannelTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fxTransactionChannelType: IFxTransactionChannelType = { id: 456 };

      activatedRoute.data = of({ fxTransactionChannelType });
      comp.ngOnInit();

      expect(comp.fxTransactionChannelType).toEqual(fxTransactionChannelType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionChannelType>>();
      const fxTransactionChannelType = { id: 123 };
      jest.spyOn(fxTransactionChannelTypeFormService, 'getFxTransactionChannelType').mockReturnValue(fxTransactionChannelType);
      jest.spyOn(fxTransactionChannelTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionChannelType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxTransactionChannelType }));
      saveSubject.complete();

      // THEN
      expect(fxTransactionChannelTypeFormService.getFxTransactionChannelType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fxTransactionChannelTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fxTransactionChannelType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionChannelType>>();
      const fxTransactionChannelType = { id: 123 };
      jest.spyOn(fxTransactionChannelTypeFormService, 'getFxTransactionChannelType').mockReturnValue({ id: null });
      jest.spyOn(fxTransactionChannelTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionChannelType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxTransactionChannelType }));
      saveSubject.complete();

      // THEN
      expect(fxTransactionChannelTypeFormService.getFxTransactionChannelType).toHaveBeenCalled();
      expect(fxTransactionChannelTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionChannelType>>();
      const fxTransactionChannelType = { id: 123 };
      jest.spyOn(fxTransactionChannelTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionChannelType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fxTransactionChannelTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
