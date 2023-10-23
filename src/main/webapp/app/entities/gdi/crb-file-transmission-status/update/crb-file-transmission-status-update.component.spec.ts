import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbFileTransmissionStatusFormService } from './crb-file-transmission-status-form.service';
import { CrbFileTransmissionStatusService } from '../service/crb-file-transmission-status.service';
import { ICrbFileTransmissionStatus } from '../crb-file-transmission-status.model';

import { CrbFileTransmissionStatusUpdateComponent } from './crb-file-transmission-status-update.component';

describe('CrbFileTransmissionStatus Management Update Component', () => {
  let comp: CrbFileTransmissionStatusUpdateComponent;
  let fixture: ComponentFixture<CrbFileTransmissionStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbFileTransmissionStatusFormService: CrbFileTransmissionStatusFormService;
  let crbFileTransmissionStatusService: CrbFileTransmissionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbFileTransmissionStatusUpdateComponent],
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
      .overrideTemplate(CrbFileTransmissionStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbFileTransmissionStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbFileTransmissionStatusFormService = TestBed.inject(CrbFileTransmissionStatusFormService);
    crbFileTransmissionStatusService = TestBed.inject(CrbFileTransmissionStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbFileTransmissionStatus: ICrbFileTransmissionStatus = { id: 456 };

      activatedRoute.data = of({ crbFileTransmissionStatus });
      comp.ngOnInit();

      expect(comp.crbFileTransmissionStatus).toEqual(crbFileTransmissionStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbFileTransmissionStatus>>();
      const crbFileTransmissionStatus = { id: 123 };
      jest.spyOn(crbFileTransmissionStatusFormService, 'getCrbFileTransmissionStatus').mockReturnValue(crbFileTransmissionStatus);
      jest.spyOn(crbFileTransmissionStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbFileTransmissionStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbFileTransmissionStatus }));
      saveSubject.complete();

      // THEN
      expect(crbFileTransmissionStatusFormService.getCrbFileTransmissionStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbFileTransmissionStatusService.update).toHaveBeenCalledWith(expect.objectContaining(crbFileTransmissionStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbFileTransmissionStatus>>();
      const crbFileTransmissionStatus = { id: 123 };
      jest.spyOn(crbFileTransmissionStatusFormService, 'getCrbFileTransmissionStatus').mockReturnValue({ id: null });
      jest.spyOn(crbFileTransmissionStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbFileTransmissionStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbFileTransmissionStatus }));
      saveSubject.complete();

      // THEN
      expect(crbFileTransmissionStatusFormService.getCrbFileTransmissionStatus).toHaveBeenCalled();
      expect(crbFileTransmissionStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbFileTransmissionStatus>>();
      const crbFileTransmissionStatus = { id: 123 };
      jest.spyOn(crbFileTransmissionStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbFileTransmissionStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbFileTransmissionStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
