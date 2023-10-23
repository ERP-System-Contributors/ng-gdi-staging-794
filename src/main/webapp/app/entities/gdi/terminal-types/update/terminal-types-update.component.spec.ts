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

import { TerminalTypesFormService } from './terminal-types-form.service';
import { TerminalTypesService } from '../service/terminal-types.service';
import { ITerminalTypes } from '../terminal-types.model';

import { TerminalTypesUpdateComponent } from './terminal-types-update.component';

describe('TerminalTypes Management Update Component', () => {
  let comp: TerminalTypesUpdateComponent;
  let fixture: ComponentFixture<TerminalTypesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let terminalTypesFormService: TerminalTypesFormService;
  let terminalTypesService: TerminalTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TerminalTypesUpdateComponent],
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
      .overrideTemplate(TerminalTypesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerminalTypesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    terminalTypesFormService = TestBed.inject(TerminalTypesFormService);
    terminalTypesService = TestBed.inject(TerminalTypesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const terminalTypes: ITerminalTypes = { id: 456 };

      activatedRoute.data = of({ terminalTypes });
      comp.ngOnInit();

      expect(comp.terminalTypes).toEqual(terminalTypes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalTypes>>();
      const terminalTypes = { id: 123 };
      jest.spyOn(terminalTypesFormService, 'getTerminalTypes').mockReturnValue(terminalTypes);
      jest.spyOn(terminalTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalTypes }));
      saveSubject.complete();

      // THEN
      expect(terminalTypesFormService.getTerminalTypes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(terminalTypesService.update).toHaveBeenCalledWith(expect.objectContaining(terminalTypes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalTypes>>();
      const terminalTypes = { id: 123 };
      jest.spyOn(terminalTypesFormService, 'getTerminalTypes').mockReturnValue({ id: null });
      jest.spyOn(terminalTypesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalTypes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalTypes }));
      saveSubject.complete();

      // THEN
      expect(terminalTypesFormService.getTerminalTypes).toHaveBeenCalled();
      expect(terminalTypesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalTypes>>();
      const terminalTypes = { id: 123 };
      jest.spyOn(terminalTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(terminalTypesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
