import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmploymentTermsFormService } from './employment-terms-form.service';
import { EmploymentTermsService } from '../service/employment-terms.service';
import { IEmploymentTerms } from '../employment-terms.model';

import { EmploymentTermsUpdateComponent } from './employment-terms-update.component';

describe('EmploymentTerms Management Update Component', () => {
  let comp: EmploymentTermsUpdateComponent;
  let fixture: ComponentFixture<EmploymentTermsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employmentTermsFormService: EmploymentTermsFormService;
  let employmentTermsService: EmploymentTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmploymentTermsUpdateComponent],
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
      .overrideTemplate(EmploymentTermsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmploymentTermsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employmentTermsFormService = TestBed.inject(EmploymentTermsFormService);
    employmentTermsService = TestBed.inject(EmploymentTermsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const employmentTerms: IEmploymentTerms = { id: 456 };

      activatedRoute.data = of({ employmentTerms });
      comp.ngOnInit();

      expect(comp.employmentTerms).toEqual(employmentTerms);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploymentTerms>>();
      const employmentTerms = { id: 123 };
      jest.spyOn(employmentTermsFormService, 'getEmploymentTerms').mockReturnValue(employmentTerms);
      jest.spyOn(employmentTermsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employmentTerms });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employmentTerms }));
      saveSubject.complete();

      // THEN
      expect(employmentTermsFormService.getEmploymentTerms).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employmentTermsService.update).toHaveBeenCalledWith(expect.objectContaining(employmentTerms));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploymentTerms>>();
      const employmentTerms = { id: 123 };
      jest.spyOn(employmentTermsFormService, 'getEmploymentTerms').mockReturnValue({ id: null });
      jest.spyOn(employmentTermsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employmentTerms: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employmentTerms }));
      saveSubject.complete();

      // THEN
      expect(employmentTermsFormService.getEmploymentTerms).toHaveBeenCalled();
      expect(employmentTermsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploymentTerms>>();
      const employmentTerms = { id: 123 };
      jest.spyOn(employmentTermsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employmentTerms });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employmentTermsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
