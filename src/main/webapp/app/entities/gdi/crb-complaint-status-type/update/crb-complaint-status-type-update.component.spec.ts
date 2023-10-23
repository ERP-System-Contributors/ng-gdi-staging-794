import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbComplaintStatusTypeFormService } from './crb-complaint-status-type-form.service';
import { CrbComplaintStatusTypeService } from '../service/crb-complaint-status-type.service';
import { ICrbComplaintStatusType } from '../crb-complaint-status-type.model';

import { CrbComplaintStatusTypeUpdateComponent } from './crb-complaint-status-type-update.component';

describe('CrbComplaintStatusType Management Update Component', () => {
  let comp: CrbComplaintStatusTypeUpdateComponent;
  let fixture: ComponentFixture<CrbComplaintStatusTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbComplaintStatusTypeFormService: CrbComplaintStatusTypeFormService;
  let crbComplaintStatusTypeService: CrbComplaintStatusTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbComplaintStatusTypeUpdateComponent],
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
      .overrideTemplate(CrbComplaintStatusTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbComplaintStatusTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbComplaintStatusTypeFormService = TestBed.inject(CrbComplaintStatusTypeFormService);
    crbComplaintStatusTypeService = TestBed.inject(CrbComplaintStatusTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbComplaintStatusType: ICrbComplaintStatusType = { id: 456 };

      activatedRoute.data = of({ crbComplaintStatusType });
      comp.ngOnInit();

      expect(comp.crbComplaintStatusType).toEqual(crbComplaintStatusType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbComplaintStatusType>>();
      const crbComplaintStatusType = { id: 123 };
      jest.spyOn(crbComplaintStatusTypeFormService, 'getCrbComplaintStatusType').mockReturnValue(crbComplaintStatusType);
      jest.spyOn(crbComplaintStatusTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbComplaintStatusType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbComplaintStatusType }));
      saveSubject.complete();

      // THEN
      expect(crbComplaintStatusTypeFormService.getCrbComplaintStatusType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbComplaintStatusTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbComplaintStatusType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbComplaintStatusType>>();
      const crbComplaintStatusType = { id: 123 };
      jest.spyOn(crbComplaintStatusTypeFormService, 'getCrbComplaintStatusType').mockReturnValue({ id: null });
      jest.spyOn(crbComplaintStatusTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbComplaintStatusType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbComplaintStatusType }));
      saveSubject.complete();

      // THEN
      expect(crbComplaintStatusTypeFormService.getCrbComplaintStatusType).toHaveBeenCalled();
      expect(crbComplaintStatusTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbComplaintStatusType>>();
      const crbComplaintStatusType = { id: 123 };
      jest.spyOn(crbComplaintStatusTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbComplaintStatusType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbComplaintStatusTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
