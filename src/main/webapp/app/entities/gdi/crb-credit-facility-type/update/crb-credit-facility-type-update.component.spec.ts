import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbCreditFacilityTypeFormService } from './crb-credit-facility-type-form.service';
import { CrbCreditFacilityTypeService } from '../service/crb-credit-facility-type.service';
import { ICrbCreditFacilityType } from '../crb-credit-facility-type.model';

import { CrbCreditFacilityTypeUpdateComponent } from './crb-credit-facility-type-update.component';

describe('CrbCreditFacilityType Management Update Component', () => {
  let comp: CrbCreditFacilityTypeUpdateComponent;
  let fixture: ComponentFixture<CrbCreditFacilityTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbCreditFacilityTypeFormService: CrbCreditFacilityTypeFormService;
  let crbCreditFacilityTypeService: CrbCreditFacilityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbCreditFacilityTypeUpdateComponent],
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
      .overrideTemplate(CrbCreditFacilityTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbCreditFacilityTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbCreditFacilityTypeFormService = TestBed.inject(CrbCreditFacilityTypeFormService);
    crbCreditFacilityTypeService = TestBed.inject(CrbCreditFacilityTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbCreditFacilityType: ICrbCreditFacilityType = { id: 456 };

      activatedRoute.data = of({ crbCreditFacilityType });
      comp.ngOnInit();

      expect(comp.crbCreditFacilityType).toEqual(crbCreditFacilityType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCreditFacilityType>>();
      const crbCreditFacilityType = { id: 123 };
      jest.spyOn(crbCreditFacilityTypeFormService, 'getCrbCreditFacilityType').mockReturnValue(crbCreditFacilityType);
      jest.spyOn(crbCreditFacilityTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCreditFacilityType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbCreditFacilityType }));
      saveSubject.complete();

      // THEN
      expect(crbCreditFacilityTypeFormService.getCrbCreditFacilityType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbCreditFacilityTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbCreditFacilityType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCreditFacilityType>>();
      const crbCreditFacilityType = { id: 123 };
      jest.spyOn(crbCreditFacilityTypeFormService, 'getCrbCreditFacilityType').mockReturnValue({ id: null });
      jest.spyOn(crbCreditFacilityTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCreditFacilityType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbCreditFacilityType }));
      saveSubject.complete();

      // THEN
      expect(crbCreditFacilityTypeFormService.getCrbCreditFacilityType).toHaveBeenCalled();
      expect(crbCreditFacilityTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCreditFacilityType>>();
      const crbCreditFacilityType = { id: 123 };
      jest.spyOn(crbCreditFacilityTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCreditFacilityType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbCreditFacilityTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
