import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FraudCategoryFlagFormService } from './fraud-category-flag-form.service';
import { FraudCategoryFlagService } from '../service/fraud-category-flag.service';
import { IFraudCategoryFlag } from '../fraud-category-flag.model';

import { FraudCategoryFlagUpdateComponent } from './fraud-category-flag-update.component';

describe('FraudCategoryFlag Management Update Component', () => {
  let comp: FraudCategoryFlagUpdateComponent;
  let fixture: ComponentFixture<FraudCategoryFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fraudCategoryFlagFormService: FraudCategoryFlagFormService;
  let fraudCategoryFlagService: FraudCategoryFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FraudCategoryFlagUpdateComponent],
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
      .overrideTemplate(FraudCategoryFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FraudCategoryFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fraudCategoryFlagFormService = TestBed.inject(FraudCategoryFlagFormService);
    fraudCategoryFlagService = TestBed.inject(FraudCategoryFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fraudCategoryFlag: IFraudCategoryFlag = { id: 456 };

      activatedRoute.data = of({ fraudCategoryFlag });
      comp.ngOnInit();

      expect(comp.fraudCategoryFlag).toEqual(fraudCategoryFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFraudCategoryFlag>>();
      const fraudCategoryFlag = { id: 123 };
      jest.spyOn(fraudCategoryFlagFormService, 'getFraudCategoryFlag').mockReturnValue(fraudCategoryFlag);
      jest.spyOn(fraudCategoryFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fraudCategoryFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fraudCategoryFlag }));
      saveSubject.complete();

      // THEN
      expect(fraudCategoryFlagFormService.getFraudCategoryFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fraudCategoryFlagService.update).toHaveBeenCalledWith(expect.objectContaining(fraudCategoryFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFraudCategoryFlag>>();
      const fraudCategoryFlag = { id: 123 };
      jest.spyOn(fraudCategoryFlagFormService, 'getFraudCategoryFlag').mockReturnValue({ id: null });
      jest.spyOn(fraudCategoryFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fraudCategoryFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fraudCategoryFlag }));
      saveSubject.complete();

      // THEN
      expect(fraudCategoryFlagFormService.getFraudCategoryFlag).toHaveBeenCalled();
      expect(fraudCategoryFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFraudCategoryFlag>>();
      const fraudCategoryFlag = { id: 123 };
      jest.spyOn(fraudCategoryFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fraudCategoryFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fraudCategoryFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
