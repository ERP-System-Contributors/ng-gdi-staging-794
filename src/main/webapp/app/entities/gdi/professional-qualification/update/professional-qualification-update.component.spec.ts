import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProfessionalQualificationFormService } from './professional-qualification-form.service';
import { ProfessionalQualificationService } from '../service/professional-qualification.service';
import { IProfessionalQualification } from '../professional-qualification.model';

import { ProfessionalQualificationUpdateComponent } from './professional-qualification-update.component';

describe('ProfessionalQualification Management Update Component', () => {
  let comp: ProfessionalQualificationUpdateComponent;
  let fixture: ComponentFixture<ProfessionalQualificationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let professionalQualificationFormService: ProfessionalQualificationFormService;
  let professionalQualificationService: ProfessionalQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProfessionalQualificationUpdateComponent],
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
      .overrideTemplate(ProfessionalQualificationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfessionalQualificationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    professionalQualificationFormService = TestBed.inject(ProfessionalQualificationFormService);
    professionalQualificationService = TestBed.inject(ProfessionalQualificationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const professionalQualification: IProfessionalQualification = { id: 456 };

      activatedRoute.data = of({ professionalQualification });
      comp.ngOnInit();

      expect(comp.professionalQualification).toEqual(professionalQualification);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfessionalQualification>>();
      const professionalQualification = { id: 123 };
      jest.spyOn(professionalQualificationFormService, 'getProfessionalQualification').mockReturnValue(professionalQualification);
      jest.spyOn(professionalQualificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ professionalQualification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: professionalQualification }));
      saveSubject.complete();

      // THEN
      expect(professionalQualificationFormService.getProfessionalQualification).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(professionalQualificationService.update).toHaveBeenCalledWith(expect.objectContaining(professionalQualification));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfessionalQualification>>();
      const professionalQualification = { id: 123 };
      jest.spyOn(professionalQualificationFormService, 'getProfessionalQualification').mockReturnValue({ id: null });
      jest.spyOn(professionalQualificationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ professionalQualification: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: professionalQualification }));
      saveSubject.complete();

      // THEN
      expect(professionalQualificationFormService.getProfessionalQualification).toHaveBeenCalled();
      expect(professionalQualificationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfessionalQualification>>();
      const professionalQualification = { id: 123 };
      jest.spyOn(professionalQualificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ professionalQualification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(professionalQualificationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
