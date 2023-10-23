import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbSubscriptionStatusTypeCodeFormService } from './crb-subscription-status-type-code-form.service';
import { CrbSubscriptionStatusTypeCodeService } from '../service/crb-subscription-status-type-code.service';
import { ICrbSubscriptionStatusTypeCode } from '../crb-subscription-status-type-code.model';

import { CrbSubscriptionStatusTypeCodeUpdateComponent } from './crb-subscription-status-type-code-update.component';

describe('CrbSubscriptionStatusTypeCode Management Update Component', () => {
  let comp: CrbSubscriptionStatusTypeCodeUpdateComponent;
  let fixture: ComponentFixture<CrbSubscriptionStatusTypeCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbSubscriptionStatusTypeCodeFormService: CrbSubscriptionStatusTypeCodeFormService;
  let crbSubscriptionStatusTypeCodeService: CrbSubscriptionStatusTypeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbSubscriptionStatusTypeCodeUpdateComponent],
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
      .overrideTemplate(CrbSubscriptionStatusTypeCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbSubscriptionStatusTypeCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbSubscriptionStatusTypeCodeFormService = TestBed.inject(CrbSubscriptionStatusTypeCodeFormService);
    crbSubscriptionStatusTypeCodeService = TestBed.inject(CrbSubscriptionStatusTypeCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode = { id: 456 };

      activatedRoute.data = of({ crbSubscriptionStatusTypeCode });
      comp.ngOnInit();

      expect(comp.crbSubscriptionStatusTypeCode).toEqual(crbSubscriptionStatusTypeCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSubscriptionStatusTypeCode>>();
      const crbSubscriptionStatusTypeCode = { id: 123 };
      jest
        .spyOn(crbSubscriptionStatusTypeCodeFormService, 'getCrbSubscriptionStatusTypeCode')
        .mockReturnValue(crbSubscriptionStatusTypeCode);
      jest.spyOn(crbSubscriptionStatusTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSubscriptionStatusTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbSubscriptionStatusTypeCode }));
      saveSubject.complete();

      // THEN
      expect(crbSubscriptionStatusTypeCodeFormService.getCrbSubscriptionStatusTypeCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbSubscriptionStatusTypeCodeService.update).toHaveBeenCalledWith(expect.objectContaining(crbSubscriptionStatusTypeCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSubscriptionStatusTypeCode>>();
      const crbSubscriptionStatusTypeCode = { id: 123 };
      jest.spyOn(crbSubscriptionStatusTypeCodeFormService, 'getCrbSubscriptionStatusTypeCode').mockReturnValue({ id: null });
      jest.spyOn(crbSubscriptionStatusTypeCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSubscriptionStatusTypeCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbSubscriptionStatusTypeCode }));
      saveSubject.complete();

      // THEN
      expect(crbSubscriptionStatusTypeCodeFormService.getCrbSubscriptionStatusTypeCode).toHaveBeenCalled();
      expect(crbSubscriptionStatusTypeCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSubscriptionStatusTypeCode>>();
      const crbSubscriptionStatusTypeCode = { id: 123 };
      jest.spyOn(crbSubscriptionStatusTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSubscriptionStatusTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbSubscriptionStatusTypeCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
