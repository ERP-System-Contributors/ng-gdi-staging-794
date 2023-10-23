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

import { ChannelTypeFormService } from './channel-type-form.service';
import { ChannelTypeService } from '../service/channel-type.service';
import { IChannelType } from '../channel-type.model';

import { ChannelTypeUpdateComponent } from './channel-type-update.component';

describe('ChannelType Management Update Component', () => {
  let comp: ChannelTypeUpdateComponent;
  let fixture: ComponentFixture<ChannelTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let channelTypeFormService: ChannelTypeFormService;
  let channelTypeService: ChannelTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChannelTypeUpdateComponent],
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
      .overrideTemplate(ChannelTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChannelTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    channelTypeFormService = TestBed.inject(ChannelTypeFormService);
    channelTypeService = TestBed.inject(ChannelTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const channelType: IChannelType = { id: 456 };

      activatedRoute.data = of({ channelType });
      comp.ngOnInit();

      expect(comp.channelType).toEqual(channelType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChannelType>>();
      const channelType = { id: 123 };
      jest.spyOn(channelTypeFormService, 'getChannelType').mockReturnValue(channelType);
      jest.spyOn(channelTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ channelType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: channelType }));
      saveSubject.complete();

      // THEN
      expect(channelTypeFormService.getChannelType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(channelTypeService.update).toHaveBeenCalledWith(expect.objectContaining(channelType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChannelType>>();
      const channelType = { id: 123 };
      jest.spyOn(channelTypeFormService, 'getChannelType').mockReturnValue({ id: null });
      jest.spyOn(channelTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ channelType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: channelType }));
      saveSubject.complete();

      // THEN
      expect(channelTypeFormService.getChannelType).toHaveBeenCalled();
      expect(channelTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChannelType>>();
      const channelType = { id: 123 };
      jest.spyOn(channelTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ channelType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(channelTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
