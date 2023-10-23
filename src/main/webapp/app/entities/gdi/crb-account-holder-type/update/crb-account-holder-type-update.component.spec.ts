import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbAccountHolderTypeFormService } from './crb-account-holder-type-form.service';
import { CrbAccountHolderTypeService } from '../service/crb-account-holder-type.service';
import { ICrbAccountHolderType } from '../crb-account-holder-type.model';

import { CrbAccountHolderTypeUpdateComponent } from './crb-account-holder-type-update.component';

describe('CrbAccountHolderType Management Update Component', () => {
  let comp: CrbAccountHolderTypeUpdateComponent;
  let fixture: ComponentFixture<CrbAccountHolderTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbAccountHolderTypeFormService: CrbAccountHolderTypeFormService;
  let crbAccountHolderTypeService: CrbAccountHolderTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbAccountHolderTypeUpdateComponent],
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
      .overrideTemplate(CrbAccountHolderTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbAccountHolderTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbAccountHolderTypeFormService = TestBed.inject(CrbAccountHolderTypeFormService);
    crbAccountHolderTypeService = TestBed.inject(CrbAccountHolderTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbAccountHolderType: ICrbAccountHolderType = { id: 456 };

      activatedRoute.data = of({ crbAccountHolderType });
      comp.ngOnInit();

      expect(comp.crbAccountHolderType).toEqual(crbAccountHolderType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAccountHolderType>>();
      const crbAccountHolderType = { id: 123 };
      jest.spyOn(crbAccountHolderTypeFormService, 'getCrbAccountHolderType').mockReturnValue(crbAccountHolderType);
      jest.spyOn(crbAccountHolderTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAccountHolderType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAccountHolderType }));
      saveSubject.complete();

      // THEN
      expect(crbAccountHolderTypeFormService.getCrbAccountHolderType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbAccountHolderTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbAccountHolderType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAccountHolderType>>();
      const crbAccountHolderType = { id: 123 };
      jest.spyOn(crbAccountHolderTypeFormService, 'getCrbAccountHolderType').mockReturnValue({ id: null });
      jest.spyOn(crbAccountHolderTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAccountHolderType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbAccountHolderType }));
      saveSubject.complete();

      // THEN
      expect(crbAccountHolderTypeFormService.getCrbAccountHolderType).toHaveBeenCalled();
      expect(crbAccountHolderTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbAccountHolderType>>();
      const crbAccountHolderType = { id: 123 };
      jest.spyOn(crbAccountHolderTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbAccountHolderType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbAccountHolderTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
