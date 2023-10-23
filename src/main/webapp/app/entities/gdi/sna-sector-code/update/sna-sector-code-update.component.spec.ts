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

import { SnaSectorCodeFormService } from './sna-sector-code-form.service';
import { SnaSectorCodeService } from '../service/sna-sector-code.service';
import { ISnaSectorCode } from '../sna-sector-code.model';

import { SnaSectorCodeUpdateComponent } from './sna-sector-code-update.component';

describe('SnaSectorCode Management Update Component', () => {
  let comp: SnaSectorCodeUpdateComponent;
  let fixture: ComponentFixture<SnaSectorCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let snaSectorCodeFormService: SnaSectorCodeFormService;
  let snaSectorCodeService: SnaSectorCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SnaSectorCodeUpdateComponent],
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
      .overrideTemplate(SnaSectorCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SnaSectorCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    snaSectorCodeFormService = TestBed.inject(SnaSectorCodeFormService);
    snaSectorCodeService = TestBed.inject(SnaSectorCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const snaSectorCode: ISnaSectorCode = { id: 456 };

      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      expect(comp.snaSectorCode).toEqual(snaSectorCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISnaSectorCode>>();
      const snaSectorCode = { id: 123 };
      jest.spyOn(snaSectorCodeFormService, 'getSnaSectorCode').mockReturnValue(snaSectorCode);
      jest.spyOn(snaSectorCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: snaSectorCode }));
      saveSubject.complete();

      // THEN
      expect(snaSectorCodeFormService.getSnaSectorCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(snaSectorCodeService.update).toHaveBeenCalledWith(expect.objectContaining(snaSectorCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISnaSectorCode>>();
      const snaSectorCode = { id: 123 };
      jest.spyOn(snaSectorCodeFormService, 'getSnaSectorCode').mockReturnValue({ id: null });
      jest.spyOn(snaSectorCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ snaSectorCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: snaSectorCode }));
      saveSubject.complete();

      // THEN
      expect(snaSectorCodeFormService.getSnaSectorCode).toHaveBeenCalled();
      expect(snaSectorCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISnaSectorCode>>();
      const snaSectorCode = { id: 123 };
      jest.spyOn(snaSectorCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(snaSectorCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
