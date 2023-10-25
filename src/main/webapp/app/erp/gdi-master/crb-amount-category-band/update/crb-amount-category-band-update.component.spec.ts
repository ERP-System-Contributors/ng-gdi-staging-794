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

import { CrbAmountCategoryBandFormService } from './crb-amount-category-band-form.service';
import { CrbAmountCategoryBandService } from '../service/crb-amount-category-band.service';
import { ICrbAmountCategoryBand } from '../crb-amount-category-band.model';

import { CrbAmountCategoryBandUpdateComponent } from './crb-amount-category-band-update.component';

describe('CrbAmountCategoryBand Management Update Component', () => {
  let comp: CrbAmountCategoryBandUpdateComponent;
  let fixture: ComponentFixture<CrbAmountCategoryBandUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbAmountCategoryBandFormService: CrbAmountCategoryBandFormService;
  let crbAmountCategoryBandService: CrbAmountCategoryBandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbAmountCategoryBandUpdateComponent],
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
      .overrideTemplate(CrbAmountCategoryBandUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbAmountCategoryBandUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbAmountCategoryBandFormService = TestBed.inject(CrbAmountCategoryBandFormService);
    crbAmountCategoryBandService = TestBed.inject(CrbAmountCategoryBandService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbAmountCategoryBand: ICrbAmountCategoryBand = { id: 456 };

      activatedRoute.data = of({ crbAmountCategoryBand });
      comp.ngOnInit();

      expect(comp.crbAmountCategoryBand).toEqual(crbAmountCategoryBand);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAmountCategoryBand>>();
      const crbAmountCategoryBand = { id: 123 };
      jest.spyOn(crbAmountCategoryBandFormService, 'getCrbAmountCategoryBand').mockReturnValue(crbAmountCategoryBand);
      jest.spyOn(crbAmountCategoryBandService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAmountCategoryBand });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAmountCategoryBand }));
      saveSubject.complete();

      // THEN
      expect(crbAmountCategoryBandFormService.getCrbAmountCategoryBand).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbAmountCategoryBandService.update).toHaveBeenCalledWith(expect.objectContaining(crbAmountCategoryBand));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAmountCategoryBand>>();
      const crbAmountCategoryBand = { id: 123 };
      jest.spyOn(crbAmountCategoryBandFormService, 'getCrbAmountCategoryBand').mockReturnValue({ id: null });
      jest.spyOn(crbAmountCategoryBandService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAmountCategoryBand: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAmountCategoryBand }));
      saveSubject.complete();

      // THEN
      expect(crbAmountCategoryBandFormService.getCrbAmountCategoryBand).toHaveBeenCalled();
      expect(crbAmountCategoryBandService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAmountCategoryBand>>();
      const crbAmountCategoryBand = { id: 123 };
      jest.spyOn(crbAmountCategoryBandService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAmountCategoryBand });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbAmountCategoryBandService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
