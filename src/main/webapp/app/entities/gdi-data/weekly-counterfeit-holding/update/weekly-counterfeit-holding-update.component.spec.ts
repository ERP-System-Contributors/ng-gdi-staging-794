import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WeeklyCounterfeitHoldingFormService } from './weekly-counterfeit-holding-form.service';
import { WeeklyCounterfeitHoldingService } from '../service/weekly-counterfeit-holding.service';
import { IWeeklyCounterfeitHolding } from '../weekly-counterfeit-holding.model';

import { WeeklyCounterfeitHoldingUpdateComponent } from './weekly-counterfeit-holding-update.component';

describe('WeeklyCounterfeitHolding Management Update Component', () => {
  let comp: WeeklyCounterfeitHoldingUpdateComponent;
  let fixture: ComponentFixture<WeeklyCounterfeitHoldingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let weeklyCounterfeitHoldingFormService: WeeklyCounterfeitHoldingFormService;
  let weeklyCounterfeitHoldingService: WeeklyCounterfeitHoldingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WeeklyCounterfeitHoldingUpdateComponent],
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
      .overrideTemplate(WeeklyCounterfeitHoldingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WeeklyCounterfeitHoldingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    weeklyCounterfeitHoldingFormService = TestBed.inject(WeeklyCounterfeitHoldingFormService);
    weeklyCounterfeitHoldingService = TestBed.inject(WeeklyCounterfeitHoldingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const weeklyCounterfeitHolding: IWeeklyCounterfeitHolding = { id: 456 };

      activatedRoute.data = of({ weeklyCounterfeitHolding });
      comp.ngOnInit();

      expect(comp.weeklyCounterfeitHolding).toEqual(weeklyCounterfeitHolding);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWeeklyCounterfeitHolding>>();
      const weeklyCounterfeitHolding = { id: 123 };
      jest.spyOn(weeklyCounterfeitHoldingFormService, 'getWeeklyCounterfeitHolding').mockReturnValue(weeklyCounterfeitHolding);
      jest.spyOn(weeklyCounterfeitHoldingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ weeklyCounterfeitHolding });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: weeklyCounterfeitHolding }));
      saveSubject.complete();

      // THEN
      expect(weeklyCounterfeitHoldingFormService.getWeeklyCounterfeitHolding).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(weeklyCounterfeitHoldingService.update).toHaveBeenCalledWith(expect.objectContaining(weeklyCounterfeitHolding));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWeeklyCounterfeitHolding>>();
      const weeklyCounterfeitHolding = { id: 123 };
      jest.spyOn(weeklyCounterfeitHoldingFormService, 'getWeeklyCounterfeitHolding').mockReturnValue({ id: null });
      jest.spyOn(weeklyCounterfeitHoldingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ weeklyCounterfeitHolding: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: weeklyCounterfeitHolding }));
      saveSubject.complete();

      // THEN
      expect(weeklyCounterfeitHoldingFormService.getWeeklyCounterfeitHolding).toHaveBeenCalled();
      expect(weeklyCounterfeitHoldingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWeeklyCounterfeitHolding>>();
      const weeklyCounterfeitHolding = { id: 123 };
      jest.spyOn(weeklyCounterfeitHoldingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ weeklyCounterfeitHolding });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(weeklyCounterfeitHoldingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
