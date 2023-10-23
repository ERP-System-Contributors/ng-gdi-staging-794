import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GenderTypeFormService } from './gender-type-form.service';
import { GenderTypeService } from '../service/gender-type.service';
import { IGenderType } from '../gender-type.model';

import { GenderTypeUpdateComponent } from './gender-type-update.component';

describe('GenderType Management Update Component', () => {
  let comp: GenderTypeUpdateComponent;
  let fixture: ComponentFixture<GenderTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let genderTypeFormService: GenderTypeFormService;
  let genderTypeService: GenderTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GenderTypeUpdateComponent],
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
      .overrideTemplate(GenderTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GenderTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    genderTypeFormService = TestBed.inject(GenderTypeFormService);
    genderTypeService = TestBed.inject(GenderTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const genderType: IGenderType = { id: 456 };

      activatedRoute.data = of({ genderType });
      comp.ngOnInit();

      expect(comp.genderType).toEqual(genderType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGenderType>>();
      const genderType = { id: 123 };
      jest.spyOn(genderTypeFormService, 'getGenderType').mockReturnValue(genderType);
      jest.spyOn(genderTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ genderType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: genderType }));
      saveSubject.complete();

      // THEN
      expect(genderTypeFormService.getGenderType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(genderTypeService.update).toHaveBeenCalledWith(expect.objectContaining(genderType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGenderType>>();
      const genderType = { id: 123 };
      jest.spyOn(genderTypeFormService, 'getGenderType').mockReturnValue({ id: null });
      jest.spyOn(genderTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ genderType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: genderType }));
      saveSubject.complete();

      // THEN
      expect(genderTypeFormService.getGenderType).toHaveBeenCalled();
      expect(genderTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGenderType>>();
      const genderType = { id: 123 };
      jest.spyOn(genderTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ genderType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(genderTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
