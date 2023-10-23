import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbCustomerTypeFormService } from './crb-customer-type-form.service';
import { CrbCustomerTypeService } from '../service/crb-customer-type.service';
import { ICrbCustomerType } from '../crb-customer-type.model';

import { CrbCustomerTypeUpdateComponent } from './crb-customer-type-update.component';

describe('CrbCustomerType Management Update Component', () => {
  let comp: CrbCustomerTypeUpdateComponent;
  let fixture: ComponentFixture<CrbCustomerTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbCustomerTypeFormService: CrbCustomerTypeFormService;
  let crbCustomerTypeService: CrbCustomerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbCustomerTypeUpdateComponent],
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
      .overrideTemplate(CrbCustomerTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbCustomerTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbCustomerTypeFormService = TestBed.inject(CrbCustomerTypeFormService);
    crbCustomerTypeService = TestBed.inject(CrbCustomerTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbCustomerType: ICrbCustomerType = { id: 456 };

      activatedRoute.data = of({ crbCustomerType });
      comp.ngOnInit();

      expect(comp.crbCustomerType).toEqual(crbCustomerType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCustomerType>>();
      const crbCustomerType = { id: 123 };
      jest.spyOn(crbCustomerTypeFormService, 'getCrbCustomerType').mockReturnValue(crbCustomerType);
      jest.spyOn(crbCustomerTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCustomerType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbCustomerType }));
      saveSubject.complete();

      // THEN
      expect(crbCustomerTypeFormService.getCrbCustomerType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbCustomerTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbCustomerType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCustomerType>>();
      const crbCustomerType = { id: 123 };
      jest.spyOn(crbCustomerTypeFormService, 'getCrbCustomerType').mockReturnValue({ id: null });
      jest.spyOn(crbCustomerTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCustomerType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbCustomerType }));
      saveSubject.complete();

      // THEN
      expect(crbCustomerTypeFormService.getCrbCustomerType).toHaveBeenCalled();
      expect(crbCustomerTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCustomerType>>();
      const crbCustomerType = { id: 123 };
      jest.spyOn(crbCustomerTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCustomerType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbCustomerTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
