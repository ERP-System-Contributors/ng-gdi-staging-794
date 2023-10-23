import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UltimateBeneficiaryTypesFormService } from './ultimate-beneficiary-types-form.service';
import { UltimateBeneficiaryTypesService } from '../service/ultimate-beneficiary-types.service';
import { IUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';

import { UltimateBeneficiaryTypesUpdateComponent } from './ultimate-beneficiary-types-update.component';

describe('UltimateBeneficiaryTypes Management Update Component', () => {
  let comp: UltimateBeneficiaryTypesUpdateComponent;
  let fixture: ComponentFixture<UltimateBeneficiaryTypesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ultimateBeneficiaryTypesFormService: UltimateBeneficiaryTypesFormService;
  let ultimateBeneficiaryTypesService: UltimateBeneficiaryTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UltimateBeneficiaryTypesUpdateComponent],
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
      .overrideTemplate(UltimateBeneficiaryTypesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UltimateBeneficiaryTypesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ultimateBeneficiaryTypesFormService = TestBed.inject(UltimateBeneficiaryTypesFormService);
    ultimateBeneficiaryTypesService = TestBed.inject(UltimateBeneficiaryTypesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes = { id: 456 };

      activatedRoute.data = of({ ultimateBeneficiaryTypes });
      comp.ngOnInit();

      expect(comp.ultimateBeneficiaryTypes).toEqual(ultimateBeneficiaryTypes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUltimateBeneficiaryTypes>>();
      const ultimateBeneficiaryTypes = { id: 123 };
      jest.spyOn(ultimateBeneficiaryTypesFormService, 'getUltimateBeneficiaryTypes').mockReturnValue(ultimateBeneficiaryTypes);
      jest.spyOn(ultimateBeneficiaryTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ultimateBeneficiaryTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ultimateBeneficiaryTypes }));
      saveSubject.complete();

      // THEN
      expect(ultimateBeneficiaryTypesFormService.getUltimateBeneficiaryTypes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ultimateBeneficiaryTypesService.update).toHaveBeenCalledWith(expect.objectContaining(ultimateBeneficiaryTypes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUltimateBeneficiaryTypes>>();
      const ultimateBeneficiaryTypes = { id: 123 };
      jest.spyOn(ultimateBeneficiaryTypesFormService, 'getUltimateBeneficiaryTypes').mockReturnValue({ id: null });
      jest.spyOn(ultimateBeneficiaryTypesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ultimateBeneficiaryTypes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ultimateBeneficiaryTypes }));
      saveSubject.complete();

      // THEN
      expect(ultimateBeneficiaryTypesFormService.getUltimateBeneficiaryTypes).toHaveBeenCalled();
      expect(ultimateBeneficiaryTypesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUltimateBeneficiaryTypes>>();
      const ultimateBeneficiaryTypes = { id: 123 };
      jest.spyOn(ultimateBeneficiaryTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ultimateBeneficiaryTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ultimateBeneficiaryTypesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
