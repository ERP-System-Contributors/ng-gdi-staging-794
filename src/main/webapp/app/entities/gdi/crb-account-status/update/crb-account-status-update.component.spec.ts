import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbAccountStatusFormService } from './crb-account-status-form.service';
import { CrbAccountStatusService } from '../service/crb-account-status.service';
import { ICrbAccountStatus } from '../crb-account-status.model';

import { CrbAccountStatusUpdateComponent } from './crb-account-status-update.component';

describe('CrbAccountStatus Management Update Component', () => {
  let comp: CrbAccountStatusUpdateComponent;
  let fixture: ComponentFixture<CrbAccountStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbAccountStatusFormService: CrbAccountStatusFormService;
  let crbAccountStatusService: CrbAccountStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbAccountStatusUpdateComponent],
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
      .overrideTemplate(CrbAccountStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbAccountStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbAccountStatusFormService = TestBed.inject(CrbAccountStatusFormService);
    crbAccountStatusService = TestBed.inject(CrbAccountStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbAccountStatus: ICrbAccountStatus = { id: 456 };

      activatedRoute.data = of({ crbAccountStatus });
      comp.ngOnInit();

      expect(comp.crbAccountStatus).toEqual(crbAccountStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAccountStatus>>();
      const crbAccountStatus = { id: 123 };
      jest.spyOn(crbAccountStatusFormService, 'getCrbAccountStatus').mockReturnValue(crbAccountStatus);
      jest.spyOn(crbAccountStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAccountStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAccountStatus }));
      saveSubject.complete();

      // THEN
      expect(crbAccountStatusFormService.getCrbAccountStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbAccountStatusService.update).toHaveBeenCalledWith(expect.objectContaining(crbAccountStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAccountStatus>>();
      const crbAccountStatus = { id: 123 };
      jest.spyOn(crbAccountStatusFormService, 'getCrbAccountStatus').mockReturnValue({ id: null });
      jest.spyOn(crbAccountStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAccountStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAccountStatus }));
      saveSubject.complete();

      // THEN
      expect(crbAccountStatusFormService.getCrbAccountStatus).toHaveBeenCalled();
      expect(crbAccountStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAccountStatus>>();
      const crbAccountStatus = { id: 123 };
      jest.spyOn(crbAccountStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAccountStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbAccountStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
