import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CustomerComplaintStatusTypeFormService } from './customer-complaint-status-type-form.service';
import { CustomerComplaintStatusTypeService } from '../service/customer-complaint-status-type.service';
import { ICustomerComplaintStatusType } from '../customer-complaint-status-type.model';

import { CustomerComplaintStatusTypeUpdateComponent } from './customer-complaint-status-type-update.component';

describe('CustomerComplaintStatusType Management Update Component', () => {
  let comp: CustomerComplaintStatusTypeUpdateComponent;
  let fixture: ComponentFixture<CustomerComplaintStatusTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerComplaintStatusTypeFormService: CustomerComplaintStatusTypeFormService;
  let customerComplaintStatusTypeService: CustomerComplaintStatusTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomerComplaintStatusTypeUpdateComponent],
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
      .overrideTemplate(CustomerComplaintStatusTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerComplaintStatusTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerComplaintStatusTypeFormService = TestBed.inject(CustomerComplaintStatusTypeFormService);
    customerComplaintStatusTypeService = TestBed.inject(CustomerComplaintStatusTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const customerComplaintStatusType: ICustomerComplaintStatusType = { id: 456 };

      activatedRoute.data = of({ customerComplaintStatusType });
      comp.ngOnInit();

      expect(comp.customerComplaintStatusType).toEqual(customerComplaintStatusType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerComplaintStatusType>>();
      const customerComplaintStatusType = { id: 123 };
      jest.spyOn(customerComplaintStatusTypeFormService, 'getCustomerComplaintStatusType').mockReturnValue(customerComplaintStatusType);
      jest.spyOn(customerComplaintStatusTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerComplaintStatusType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerComplaintStatusType }));
      saveSubject.complete();

      // THEN
      expect(customerComplaintStatusTypeFormService.getCustomerComplaintStatusType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerComplaintStatusTypeService.update).toHaveBeenCalledWith(expect.objectContaining(customerComplaintStatusType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerComplaintStatusType>>();
      const customerComplaintStatusType = { id: 123 };
      jest.spyOn(customerComplaintStatusTypeFormService, 'getCustomerComplaintStatusType').mockReturnValue({ id: null });
      jest.spyOn(customerComplaintStatusTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerComplaintStatusType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerComplaintStatusType }));
      saveSubject.complete();

      // THEN
      expect(customerComplaintStatusTypeFormService.getCustomerComplaintStatusType).toHaveBeenCalled();
      expect(customerComplaintStatusTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerComplaintStatusType>>();
      const customerComplaintStatusType = { id: 123 };
      jest.spyOn(customerComplaintStatusTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerComplaintStatusType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerComplaintStatusTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
