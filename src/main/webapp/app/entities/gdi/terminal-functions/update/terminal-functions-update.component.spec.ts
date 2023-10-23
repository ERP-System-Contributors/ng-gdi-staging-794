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

import { TerminalFunctionsFormService } from './terminal-functions-form.service';
import { TerminalFunctionsService } from '../service/terminal-functions.service';
import { ITerminalFunctions } from '../terminal-functions.model';

import { TerminalFunctionsUpdateComponent } from './terminal-functions-update.component';

describe('TerminalFunctions Management Update Component', () => {
  let comp: TerminalFunctionsUpdateComponent;
  let fixture: ComponentFixture<TerminalFunctionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let terminalFunctionsFormService: TerminalFunctionsFormService;
  let terminalFunctionsService: TerminalFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TerminalFunctionsUpdateComponent],
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
      .overrideTemplate(TerminalFunctionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerminalFunctionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    terminalFunctionsFormService = TestBed.inject(TerminalFunctionsFormService);
    terminalFunctionsService = TestBed.inject(TerminalFunctionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const terminalFunctions: ITerminalFunctions = { id: 456 };

      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      expect(comp.terminalFunctions).toEqual(terminalFunctions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalFunctions>>();
      const terminalFunctions = { id: 123 };
      jest.spyOn(terminalFunctionsFormService, 'getTerminalFunctions').mockReturnValue(terminalFunctions);
      jest.spyOn(terminalFunctionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalFunctions }));
      saveSubject.complete();

      // THEN
      expect(terminalFunctionsFormService.getTerminalFunctions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(terminalFunctionsService.update).toHaveBeenCalledWith(expect.objectContaining(terminalFunctions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalFunctions>>();
      const terminalFunctions = { id: 123 };
      jest.spyOn(terminalFunctionsFormService, 'getTerminalFunctions').mockReturnValue({ id: null });
      jest.spyOn(terminalFunctionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalFunctions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalFunctions }));
      saveSubject.complete();

      // THEN
      expect(terminalFunctionsFormService.getTerminalFunctions).toHaveBeenCalled();
      expect(terminalFunctionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalFunctions>>();
      const terminalFunctions = { id: 123 };
      jest.spyOn(terminalFunctionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(terminalFunctionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
