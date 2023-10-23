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

import { GdiMasterDataIndexFormService } from './gdi-master-data-index-form.service';
import { GdiMasterDataIndexService } from '../service/gdi-master-data-index.service';
import { IGdiMasterDataIndex } from '../gdi-master-data-index.model';

import { GdiMasterDataIndexUpdateComponent } from './gdi-master-data-index-update.component';

describe('GdiMasterDataIndex Management Update Component', () => {
  let comp: GdiMasterDataIndexUpdateComponent;
  let fixture: ComponentFixture<GdiMasterDataIndexUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gdiMasterDataIndexFormService: GdiMasterDataIndexFormService;
  let gdiMasterDataIndexService: GdiMasterDataIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GdiMasterDataIndexUpdateComponent],
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
      .overrideTemplate(GdiMasterDataIndexUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GdiMasterDataIndexUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gdiMasterDataIndexFormService = TestBed.inject(GdiMasterDataIndexFormService);
    gdiMasterDataIndexService = TestBed.inject(GdiMasterDataIndexService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const gdiMasterDataIndex: IGdiMasterDataIndex = { id: 456 };

      activatedRoute.data = of({ gdiMasterDataIndex });
      comp.ngOnInit();

      expect(comp.gdiMasterDataIndex).toEqual(gdiMasterDataIndex);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGdiMasterDataIndex>>();
      const gdiMasterDataIndex = { id: 123 };
      jest.spyOn(gdiMasterDataIndexFormService, 'getGdiMasterDataIndex').mockReturnValue(gdiMasterDataIndex);
      jest.spyOn(gdiMasterDataIndexService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gdiMasterDataIndex });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gdiMasterDataIndex }));
      saveSubject.complete();

      // THEN
      expect(gdiMasterDataIndexFormService.getGdiMasterDataIndex).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(gdiMasterDataIndexService.update).toHaveBeenCalledWith(expect.objectContaining(gdiMasterDataIndex));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGdiMasterDataIndex>>();
      const gdiMasterDataIndex = { id: 123 };
      jest.spyOn(gdiMasterDataIndexFormService, 'getGdiMasterDataIndex').mockReturnValue({ id: null });
      jest.spyOn(gdiMasterDataIndexService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gdiMasterDataIndex: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gdiMasterDataIndex }));
      saveSubject.complete();

      // THEN
      expect(gdiMasterDataIndexFormService.getGdiMasterDataIndex).toHaveBeenCalled();
      expect(gdiMasterDataIndexService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGdiMasterDataIndex>>();
      const gdiMasterDataIndex = { id: 123 };
      jest.spyOn(gdiMasterDataIndexService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gdiMasterDataIndex });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gdiMasterDataIndexService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
