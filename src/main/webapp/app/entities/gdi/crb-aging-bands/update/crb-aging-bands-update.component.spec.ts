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

import { CrbAgingBandsFormService } from './crb-aging-bands-form.service';
import { CrbAgingBandsService } from '../service/crb-aging-bands.service';
import { ICrbAgingBands } from '../crb-aging-bands.model';

import { CrbAgingBandsUpdateComponent } from './crb-aging-bands-update.component';

describe('CrbAgingBands Management Update Component', () => {
  let comp: CrbAgingBandsUpdateComponent;
  let fixture: ComponentFixture<CrbAgingBandsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbAgingBandsFormService: CrbAgingBandsFormService;
  let crbAgingBandsService: CrbAgingBandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbAgingBandsUpdateComponent],
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
      .overrideTemplate(CrbAgingBandsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbAgingBandsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbAgingBandsFormService = TestBed.inject(CrbAgingBandsFormService);
    crbAgingBandsService = TestBed.inject(CrbAgingBandsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbAgingBands: ICrbAgingBands = { id: 456 };

      activatedRoute.data = of({ crbAgingBands });
      comp.ngOnInit();

      expect(comp.crbAgingBands).toEqual(crbAgingBands);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAgingBands>>();
      const crbAgingBands = { id: 123 };
      jest.spyOn(crbAgingBandsFormService, 'getCrbAgingBands').mockReturnValue(crbAgingBands);
      jest.spyOn(crbAgingBandsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAgingBands });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAgingBands }));
      saveSubject.complete();

      // THEN
      expect(crbAgingBandsFormService.getCrbAgingBands).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbAgingBandsService.update).toHaveBeenCalledWith(expect.objectContaining(crbAgingBands));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAgingBands>>();
      const crbAgingBands = { id: 123 };
      jest.spyOn(crbAgingBandsFormService, 'getCrbAgingBands').mockReturnValue({ id: null });
      jest.spyOn(crbAgingBandsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAgingBands: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAgingBands }));
      saveSubject.complete();

      // THEN
      expect(crbAgingBandsFormService.getCrbAgingBands).toHaveBeenCalled();
      expect(crbAgingBandsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAgingBands>>();
      const crbAgingBands = { id: 123 };
      jest.spyOn(crbAgingBandsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAgingBands });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbAgingBandsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
