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

import { ShareholderTypeFormService } from './shareholder-type-form.service';
import { ShareholderTypeService } from '../service/shareholder-type.service';
import { IShareholderType } from '../shareholder-type.model';

import { ShareholderTypeUpdateComponent } from './shareholder-type-update.component';

describe('ShareholderType Management Update Component', () => {
  let comp: ShareholderTypeUpdateComponent;
  let fixture: ComponentFixture<ShareholderTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shareholderTypeFormService: ShareholderTypeFormService;
  let shareholderTypeService: ShareholderTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ShareholderTypeUpdateComponent],
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
      .overrideTemplate(ShareholderTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShareholderTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shareholderTypeFormService = TestBed.inject(ShareholderTypeFormService);
    shareholderTypeService = TestBed.inject(ShareholderTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shareholderType: IShareholderType = { id: 456 };

      activatedRoute.data = of({ shareholderType });
      comp.ngOnInit();

      expect(comp.shareholderType).toEqual(shareholderType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShareholderType>>();
      const shareholderType = { id: 123 };
      jest.spyOn(shareholderTypeFormService, 'getShareholderType').mockReturnValue(shareholderType);
      jest.spyOn(shareholderTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shareholderType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shareholderType }));
      saveSubject.complete();

      // THEN
      expect(shareholderTypeFormService.getShareholderType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(shareholderTypeService.update).toHaveBeenCalledWith(expect.objectContaining(shareholderType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShareholderType>>();
      const shareholderType = { id: 123 };
      jest.spyOn(shareholderTypeFormService, 'getShareholderType').mockReturnValue({ id: null });
      jest.spyOn(shareholderTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shareholderType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shareholderType }));
      saveSubject.complete();

      // THEN
      expect(shareholderTypeFormService.getShareholderType).toHaveBeenCalled();
      expect(shareholderTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShareholderType>>();
      const shareholderType = { id: 123 };
      jest.spyOn(shareholderTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shareholderType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shareholderTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
