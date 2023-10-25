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

import { BouncedChequeCategoriesFormService } from './bounced-cheque-categories-form.service';
import { BouncedChequeCategoriesService } from '../service/bounced-cheque-categories.service';
import { IBouncedChequeCategories } from '../bounced-cheque-categories.model';

import { BouncedChequeCategoriesUpdateComponent } from './bounced-cheque-categories-update.component';

describe('BouncedChequeCategories Management Update Component', () => {
  let comp: BouncedChequeCategoriesUpdateComponent;
  let fixture: ComponentFixture<BouncedChequeCategoriesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bouncedChequeCategoriesFormService: BouncedChequeCategoriesFormService;
  let bouncedChequeCategoriesService: BouncedChequeCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BouncedChequeCategoriesUpdateComponent],
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
      .overrideTemplate(BouncedChequeCategoriesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BouncedChequeCategoriesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bouncedChequeCategoriesFormService = TestBed.inject(BouncedChequeCategoriesFormService);
    bouncedChequeCategoriesService = TestBed.inject(BouncedChequeCategoriesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const bouncedChequeCategories: IBouncedChequeCategories = { id: 456 };

      activatedRoute.data = of({ bouncedChequeCategories });
      comp.ngOnInit();

      expect(comp.bouncedChequeCategories).toEqual(bouncedChequeCategories);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBouncedChequeCategories>>();
      const bouncedChequeCategories = { id: 123 };
      jest.spyOn(bouncedChequeCategoriesFormService, 'getBouncedChequeCategories').mockReturnValue(bouncedChequeCategories);
      jest.spyOn(bouncedChequeCategoriesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bouncedChequeCategories });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bouncedChequeCategories }));
      saveSubject.complete();

      // THEN
      expect(bouncedChequeCategoriesFormService.getBouncedChequeCategories).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bouncedChequeCategoriesService.update).toHaveBeenCalledWith(expect.objectContaining(bouncedChequeCategories));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBouncedChequeCategories>>();
      const bouncedChequeCategories = { id: 123 };
      jest.spyOn(bouncedChequeCategoriesFormService, 'getBouncedChequeCategories').mockReturnValue({ id: null });
      jest.spyOn(bouncedChequeCategoriesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bouncedChequeCategories: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bouncedChequeCategories }));
      saveSubject.complete();

      // THEN
      expect(bouncedChequeCategoriesFormService.getBouncedChequeCategories).toHaveBeenCalled();
      expect(bouncedChequeCategoriesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBouncedChequeCategories>>();
      const bouncedChequeCategories = { id: 123 };
      jest.spyOn(bouncedChequeCategoriesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bouncedChequeCategories });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bouncedChequeCategoriesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
