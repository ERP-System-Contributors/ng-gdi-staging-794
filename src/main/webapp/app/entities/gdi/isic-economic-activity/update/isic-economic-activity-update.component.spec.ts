import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IsicEconomicActivityFormService } from './isic-economic-activity-form.service';
import { IsicEconomicActivityService } from '../service/isic-economic-activity.service';
import { IIsicEconomicActivity } from '../isic-economic-activity.model';

import { IsicEconomicActivityUpdateComponent } from './isic-economic-activity-update.component';

describe('IsicEconomicActivity Management Update Component', () => {
  let comp: IsicEconomicActivityUpdateComponent;
  let fixture: ComponentFixture<IsicEconomicActivityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let isicEconomicActivityFormService: IsicEconomicActivityFormService;
  let isicEconomicActivityService: IsicEconomicActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IsicEconomicActivityUpdateComponent],
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
      .overrideTemplate(IsicEconomicActivityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IsicEconomicActivityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    isicEconomicActivityFormService = TestBed.inject(IsicEconomicActivityFormService);
    isicEconomicActivityService = TestBed.inject(IsicEconomicActivityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const isicEconomicActivity: IIsicEconomicActivity = { id: 456 };

      activatedRoute.data = of({ isicEconomicActivity });
      comp.ngOnInit();

      expect(comp.isicEconomicActivity).toEqual(isicEconomicActivity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsicEconomicActivity>>();
      const isicEconomicActivity = { id: 123 };
      jest.spyOn(isicEconomicActivityFormService, 'getIsicEconomicActivity').mockReturnValue(isicEconomicActivity);
      jest.spyOn(isicEconomicActivityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isicEconomicActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isicEconomicActivity }));
      saveSubject.complete();

      // THEN
      expect(isicEconomicActivityFormService.getIsicEconomicActivity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(isicEconomicActivityService.update).toHaveBeenCalledWith(expect.objectContaining(isicEconomicActivity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsicEconomicActivity>>();
      const isicEconomicActivity = { id: 123 };
      jest.spyOn(isicEconomicActivityFormService, 'getIsicEconomicActivity').mockReturnValue({ id: null });
      jest.spyOn(isicEconomicActivityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isicEconomicActivity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isicEconomicActivity }));
      saveSubject.complete();

      // THEN
      expect(isicEconomicActivityFormService.getIsicEconomicActivity).toHaveBeenCalled();
      expect(isicEconomicActivityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsicEconomicActivity>>();
      const isicEconomicActivity = { id: 123 };
      jest.spyOn(isicEconomicActivityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isicEconomicActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(isicEconomicActivityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
