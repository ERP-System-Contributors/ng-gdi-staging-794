import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbAgentServiceTypeFormService } from './crb-agent-service-type-form.service';
import { CrbAgentServiceTypeService } from '../service/crb-agent-service-type.service';
import { ICrbAgentServiceType } from '../crb-agent-service-type.model';

import { CrbAgentServiceTypeUpdateComponent } from './crb-agent-service-type-update.component';

describe('CrbAgentServiceType Management Update Component', () => {
  let comp: CrbAgentServiceTypeUpdateComponent;
  let fixture: ComponentFixture<CrbAgentServiceTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbAgentServiceTypeFormService: CrbAgentServiceTypeFormService;
  let crbAgentServiceTypeService: CrbAgentServiceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbAgentServiceTypeUpdateComponent],
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
      .overrideTemplate(CrbAgentServiceTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbAgentServiceTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbAgentServiceTypeFormService = TestBed.inject(CrbAgentServiceTypeFormService);
    crbAgentServiceTypeService = TestBed.inject(CrbAgentServiceTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbAgentServiceType: ICrbAgentServiceType = { id: 456 };

      activatedRoute.data = of({ crbAgentServiceType });
      comp.ngOnInit();

      expect(comp.crbAgentServiceType).toEqual(crbAgentServiceType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAgentServiceType>>();
      const crbAgentServiceType = { id: 123 };
      jest.spyOn(crbAgentServiceTypeFormService, 'getCrbAgentServiceType').mockReturnValue(crbAgentServiceType);
      jest.spyOn(crbAgentServiceTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAgentServiceType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAgentServiceType }));
      saveSubject.complete();

      // THEN
      expect(crbAgentServiceTypeFormService.getCrbAgentServiceType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbAgentServiceTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbAgentServiceType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAgentServiceType>>();
      const crbAgentServiceType = { id: 123 };
      jest.spyOn(crbAgentServiceTypeFormService, 'getCrbAgentServiceType').mockReturnValue({ id: null });
      jest.spyOn(crbAgentServiceTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAgentServiceType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAgentServiceType }));
      saveSubject.complete();

      // THEN
      expect(crbAgentServiceTypeFormService.getCrbAgentServiceType).toHaveBeenCalled();
      expect(crbAgentServiceTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAgentServiceType>>();
      const crbAgentServiceType = { id: 123 };
      jest.spyOn(crbAgentServiceTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAgentServiceType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbAgentServiceTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
