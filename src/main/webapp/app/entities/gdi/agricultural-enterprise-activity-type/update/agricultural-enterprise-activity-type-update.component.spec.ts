import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AgriculturalEnterpriseActivityTypeFormService } from './agricultural-enterprise-activity-type-form.service';
import { AgriculturalEnterpriseActivityTypeService } from '../service/agricultural-enterprise-activity-type.service';
import { IAgriculturalEnterpriseActivityType } from '../agricultural-enterprise-activity-type.model';

import { AgriculturalEnterpriseActivityTypeUpdateComponent } from './agricultural-enterprise-activity-type-update.component';

describe('AgriculturalEnterpriseActivityType Management Update Component', () => {
  let comp: AgriculturalEnterpriseActivityTypeUpdateComponent;
  let fixture: ComponentFixture<AgriculturalEnterpriseActivityTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let agriculturalEnterpriseActivityTypeFormService: AgriculturalEnterpriseActivityTypeFormService;
  let agriculturalEnterpriseActivityTypeService: AgriculturalEnterpriseActivityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AgriculturalEnterpriseActivityTypeUpdateComponent],
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
      .overrideTemplate(AgriculturalEnterpriseActivityTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AgriculturalEnterpriseActivityTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    agriculturalEnterpriseActivityTypeFormService = TestBed.inject(AgriculturalEnterpriseActivityTypeFormService);
    agriculturalEnterpriseActivityTypeService = TestBed.inject(AgriculturalEnterpriseActivityTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType = { id: 456 };

      activatedRoute.data = of({ agriculturalEnterpriseActivityType });
      comp.ngOnInit();

      expect(comp.agriculturalEnterpriseActivityType).toEqual(agriculturalEnterpriseActivityType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgriculturalEnterpriseActivityType>>();
      const agriculturalEnterpriseActivityType = { id: 123 };
      jest
        .spyOn(agriculturalEnterpriseActivityTypeFormService, 'getAgriculturalEnterpriseActivityType')
        .mockReturnValue(agriculturalEnterpriseActivityType);
      jest.spyOn(agriculturalEnterpriseActivityTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agriculturalEnterpriseActivityType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agriculturalEnterpriseActivityType }));
      saveSubject.complete();

      // THEN
      expect(agriculturalEnterpriseActivityTypeFormService.getAgriculturalEnterpriseActivityType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(agriculturalEnterpriseActivityTypeService.update).toHaveBeenCalledWith(
        expect.objectContaining(agriculturalEnterpriseActivityType)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgriculturalEnterpriseActivityType>>();
      const agriculturalEnterpriseActivityType = { id: 123 };
      jest.spyOn(agriculturalEnterpriseActivityTypeFormService, 'getAgriculturalEnterpriseActivityType').mockReturnValue({ id: null });
      jest.spyOn(agriculturalEnterpriseActivityTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agriculturalEnterpriseActivityType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agriculturalEnterpriseActivityType }));
      saveSubject.complete();

      // THEN
      expect(agriculturalEnterpriseActivityTypeFormService.getAgriculturalEnterpriseActivityType).toHaveBeenCalled();
      expect(agriculturalEnterpriseActivityTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgriculturalEnterpriseActivityType>>();
      const agriculturalEnterpriseActivityType = { id: 123 };
      jest.spyOn(agriculturalEnterpriseActivityTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agriculturalEnterpriseActivityType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(agriculturalEnterpriseActivityTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
