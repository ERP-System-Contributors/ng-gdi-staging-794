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

import { GlMappingFormService } from './gl-mapping-form.service';
import { GlMappingService } from '../service/gl-mapping.service';
import { IGlMapping } from '../gl-mapping.model';

import { GlMappingUpdateComponent } from './gl-mapping-update.component';

describe('GlMapping Management Update Component', () => {
  let comp: GlMappingUpdateComponent;
  let fixture: ComponentFixture<GlMappingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let glMappingFormService: GlMappingFormService;
  let glMappingService: GlMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GlMappingUpdateComponent],
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
      .overrideTemplate(GlMappingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GlMappingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    glMappingFormService = TestBed.inject(GlMappingFormService);
    glMappingService = TestBed.inject(GlMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const glMapping: IGlMapping = { id: 456 };

      activatedRoute.data = of({ glMapping });
      comp.ngOnInit();

      expect(comp.glMapping).toEqual(glMapping);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGlMapping>>();
      const glMapping = { id: 123 };
      jest.spyOn(glMappingFormService, 'getGlMapping').mockReturnValue(glMapping);
      jest.spyOn(glMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ glMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: glMapping }));
      saveSubject.complete();

      // THEN
      expect(glMappingFormService.getGlMapping).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(glMappingService.update).toHaveBeenCalledWith(expect.objectContaining(glMapping));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGlMapping>>();
      const glMapping = { id: 123 };
      jest.spyOn(glMappingFormService, 'getGlMapping').mockReturnValue({ id: null });
      jest.spyOn(glMappingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ glMapping: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: glMapping }));
      saveSubject.complete();

      // THEN
      expect(glMappingFormService.getGlMapping).toHaveBeenCalled();
      expect(glMappingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGlMapping>>();
      const glMapping = { id: 123 };
      jest.spyOn(glMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ glMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(glMappingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
