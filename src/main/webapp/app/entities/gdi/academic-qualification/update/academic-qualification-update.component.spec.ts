import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AcademicQualificationFormService } from './academic-qualification-form.service';
import { AcademicQualificationService } from '../service/academic-qualification.service';
import { IAcademicQualification } from '../academic-qualification.model';

import { AcademicQualificationUpdateComponent } from './academic-qualification-update.component';

describe('AcademicQualification Management Update Component', () => {
  let comp: AcademicQualificationUpdateComponent;
  let fixture: ComponentFixture<AcademicQualificationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let academicQualificationFormService: AcademicQualificationFormService;
  let academicQualificationService: AcademicQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AcademicQualificationUpdateComponent],
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
      .overrideTemplate(AcademicQualificationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AcademicQualificationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    academicQualificationFormService = TestBed.inject(AcademicQualificationFormService);
    academicQualificationService = TestBed.inject(AcademicQualificationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const academicQualification: IAcademicQualification = { id: 456 };

      activatedRoute.data = of({ academicQualification });
      comp.ngOnInit();

      expect(comp.academicQualification).toEqual(academicQualification);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcademicQualification>>();
      const academicQualification = { id: 123 };
      jest.spyOn(academicQualificationFormService, 'getAcademicQualification').mockReturnValue(academicQualification);
      jest.spyOn(academicQualificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ academicQualification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: academicQualification }));
      saveSubject.complete();

      // THEN
      expect(academicQualificationFormService.getAcademicQualification).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(academicQualificationService.update).toHaveBeenCalledWith(expect.objectContaining(academicQualification));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcademicQualification>>();
      const academicQualification = { id: 123 };
      jest.spyOn(academicQualificationFormService, 'getAcademicQualification').mockReturnValue({ id: null });
      jest.spyOn(academicQualificationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ academicQualification: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: academicQualification }));
      saveSubject.complete();

      // THEN
      expect(academicQualificationFormService.getAcademicQualification).toHaveBeenCalled();
      expect(academicQualificationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcademicQualification>>();
      const academicQualification = { id: 123 };
      jest.spyOn(academicQualificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ academicQualification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(academicQualificationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
