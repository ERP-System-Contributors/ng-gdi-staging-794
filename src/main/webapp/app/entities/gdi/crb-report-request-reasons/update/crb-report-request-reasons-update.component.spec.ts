import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbReportRequestReasonsFormService } from './crb-report-request-reasons-form.service';
import { CrbReportRequestReasonsService } from '../service/crb-report-request-reasons.service';
import { ICrbReportRequestReasons } from '../crb-report-request-reasons.model';

import { CrbReportRequestReasonsUpdateComponent } from './crb-report-request-reasons-update.component';

describe('CrbReportRequestReasons Management Update Component', () => {
  let comp: CrbReportRequestReasonsUpdateComponent;
  let fixture: ComponentFixture<CrbReportRequestReasonsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbReportRequestReasonsFormService: CrbReportRequestReasonsFormService;
  let crbReportRequestReasonsService: CrbReportRequestReasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbReportRequestReasonsUpdateComponent],
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
      .overrideTemplate(CrbReportRequestReasonsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbReportRequestReasonsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbReportRequestReasonsFormService = TestBed.inject(CrbReportRequestReasonsFormService);
    crbReportRequestReasonsService = TestBed.inject(CrbReportRequestReasonsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbReportRequestReasons: ICrbReportRequestReasons = { id: 456 };

      activatedRoute.data = of({ crbReportRequestReasons });
      comp.ngOnInit();

      expect(comp.crbReportRequestReasons).toEqual(crbReportRequestReasons);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbReportRequestReasons>>();
      const crbReportRequestReasons = { id: 123 };
      jest.spyOn(crbReportRequestReasonsFormService, 'getCrbReportRequestReasons').mockReturnValue(crbReportRequestReasons);
      jest.spyOn(crbReportRequestReasonsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbReportRequestReasons });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbReportRequestReasons }));
      saveSubject.complete();

      // THEN
      expect(crbReportRequestReasonsFormService.getCrbReportRequestReasons).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbReportRequestReasonsService.update).toHaveBeenCalledWith(expect.objectContaining(crbReportRequestReasons));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbReportRequestReasons>>();
      const crbReportRequestReasons = { id: 123 };
      jest.spyOn(crbReportRequestReasonsFormService, 'getCrbReportRequestReasons').mockReturnValue({ id: null });
      jest.spyOn(crbReportRequestReasonsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbReportRequestReasons: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbReportRequestReasons }));
      saveSubject.complete();

      // THEN
      expect(crbReportRequestReasonsFormService.getCrbReportRequestReasons).toHaveBeenCalled();
      expect(crbReportRequestReasonsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbReportRequestReasons>>();
      const crbReportRequestReasons = { id: 123 };
      jest.spyOn(crbReportRequestReasonsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbReportRequestReasons });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbReportRequestReasonsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
