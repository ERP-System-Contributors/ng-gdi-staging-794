import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NatureOfCustomerComplaintsFormService } from './nature-of-customer-complaints-form.service';
import { NatureOfCustomerComplaintsService } from '../service/nature-of-customer-complaints.service';
import { INatureOfCustomerComplaints } from '../nature-of-customer-complaints.model';

import { NatureOfCustomerComplaintsUpdateComponent } from './nature-of-customer-complaints-update.component';

describe('NatureOfCustomerComplaints Management Update Component', () => {
  let comp: NatureOfCustomerComplaintsUpdateComponent;
  let fixture: ComponentFixture<NatureOfCustomerComplaintsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let natureOfCustomerComplaintsFormService: NatureOfCustomerComplaintsFormService;
  let natureOfCustomerComplaintsService: NatureOfCustomerComplaintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NatureOfCustomerComplaintsUpdateComponent],
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
      .overrideTemplate(NatureOfCustomerComplaintsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NatureOfCustomerComplaintsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    natureOfCustomerComplaintsFormService = TestBed.inject(NatureOfCustomerComplaintsFormService);
    natureOfCustomerComplaintsService = TestBed.inject(NatureOfCustomerComplaintsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const natureOfCustomerComplaints: INatureOfCustomerComplaints = { id: 456 };

      activatedRoute.data = of({ natureOfCustomerComplaints });
      comp.ngOnInit();

      expect(comp.natureOfCustomerComplaints).toEqual(natureOfCustomerComplaints);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INatureOfCustomerComplaints>>();
      const natureOfCustomerComplaints = { id: 123 };
      jest.spyOn(natureOfCustomerComplaintsFormService, 'getNatureOfCustomerComplaints').mockReturnValue(natureOfCustomerComplaints);
      jest.spyOn(natureOfCustomerComplaintsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureOfCustomerComplaints });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: natureOfCustomerComplaints }));
      saveSubject.complete();

      // THEN
      expect(natureOfCustomerComplaintsFormService.getNatureOfCustomerComplaints).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(natureOfCustomerComplaintsService.update).toHaveBeenCalledWith(expect.objectContaining(natureOfCustomerComplaints));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INatureOfCustomerComplaints>>();
      const natureOfCustomerComplaints = { id: 123 };
      jest.spyOn(natureOfCustomerComplaintsFormService, 'getNatureOfCustomerComplaints').mockReturnValue({ id: null });
      jest.spyOn(natureOfCustomerComplaintsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureOfCustomerComplaints: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: natureOfCustomerComplaints }));
      saveSubject.complete();

      // THEN
      expect(natureOfCustomerComplaintsFormService.getNatureOfCustomerComplaints).toHaveBeenCalled();
      expect(natureOfCustomerComplaintsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INatureOfCustomerComplaints>>();
      const natureOfCustomerComplaints = { id: 123 };
      jest.spyOn(natureOfCustomerComplaintsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureOfCustomerComplaints });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(natureOfCustomerComplaintsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
