import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InstitutionContactDetailsFormService } from './institution-contact-details-form.service';
import { InstitutionContactDetailsService } from '../service/institution-contact-details.service';
import { IInstitutionContactDetails } from '../institution-contact-details.model';

import { InstitutionContactDetailsUpdateComponent } from './institution-contact-details-update.component';

describe('InstitutionContactDetails Management Update Component', () => {
  let comp: InstitutionContactDetailsUpdateComponent;
  let fixture: ComponentFixture<InstitutionContactDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let institutionContactDetailsFormService: InstitutionContactDetailsFormService;
  let institutionContactDetailsService: InstitutionContactDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InstitutionContactDetailsUpdateComponent],
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
      .overrideTemplate(InstitutionContactDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionContactDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    institutionContactDetailsFormService = TestBed.inject(InstitutionContactDetailsFormService);
    institutionContactDetailsService = TestBed.inject(InstitutionContactDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const institutionContactDetails: IInstitutionContactDetails = { id: 456 };

      activatedRoute.data = of({ institutionContactDetails });
      comp.ngOnInit();

      expect(comp.institutionContactDetails).toEqual(institutionContactDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionContactDetails>>();
      const institutionContactDetails = { id: 123 };
      jest.spyOn(institutionContactDetailsFormService, 'getInstitutionContactDetails').mockReturnValue(institutionContactDetails);
      jest.spyOn(institutionContactDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionContactDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institutionContactDetails }));
      saveSubject.complete();

      // THEN
      expect(institutionContactDetailsFormService.getInstitutionContactDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(institutionContactDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(institutionContactDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionContactDetails>>();
      const institutionContactDetails = { id: 123 };
      jest.spyOn(institutionContactDetailsFormService, 'getInstitutionContactDetails').mockReturnValue({ id: null });
      jest.spyOn(institutionContactDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionContactDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institutionContactDetails }));
      saveSubject.complete();

      // THEN
      expect(institutionContactDetailsFormService.getInstitutionContactDetails).toHaveBeenCalled();
      expect(institutionContactDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionContactDetails>>();
      const institutionContactDetails = { id: 123 };
      jest.spyOn(institutionContactDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionContactDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(institutionContactDetailsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
