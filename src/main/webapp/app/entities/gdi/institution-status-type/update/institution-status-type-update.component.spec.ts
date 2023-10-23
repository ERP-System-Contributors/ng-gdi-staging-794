import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InstitutionStatusTypeFormService } from './institution-status-type-form.service';
import { InstitutionStatusTypeService } from '../service/institution-status-type.service';
import { IInstitutionStatusType } from '../institution-status-type.model';

import { InstitutionStatusTypeUpdateComponent } from './institution-status-type-update.component';

describe('InstitutionStatusType Management Update Component', () => {
  let comp: InstitutionStatusTypeUpdateComponent;
  let fixture: ComponentFixture<InstitutionStatusTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let institutionStatusTypeFormService: InstitutionStatusTypeFormService;
  let institutionStatusTypeService: InstitutionStatusTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InstitutionStatusTypeUpdateComponent],
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
      .overrideTemplate(InstitutionStatusTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionStatusTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    institutionStatusTypeFormService = TestBed.inject(InstitutionStatusTypeFormService);
    institutionStatusTypeService = TestBed.inject(InstitutionStatusTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const institutionStatusType: IInstitutionStatusType = { id: 456 };

      activatedRoute.data = of({ institutionStatusType });
      comp.ngOnInit();

      expect(comp.institutionStatusType).toEqual(institutionStatusType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionStatusType>>();
      const institutionStatusType = { id: 123 };
      jest.spyOn(institutionStatusTypeFormService, 'getInstitutionStatusType').mockReturnValue(institutionStatusType);
      jest.spyOn(institutionStatusTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionStatusType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institutionStatusType }));
      saveSubject.complete();

      // THEN
      expect(institutionStatusTypeFormService.getInstitutionStatusType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(institutionStatusTypeService.update).toHaveBeenCalledWith(expect.objectContaining(institutionStatusType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionStatusType>>();
      const institutionStatusType = { id: 123 };
      jest.spyOn(institutionStatusTypeFormService, 'getInstitutionStatusType').mockReturnValue({ id: null });
      jest.spyOn(institutionStatusTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionStatusType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institutionStatusType }));
      saveSubject.complete();

      // THEN
      expect(institutionStatusTypeFormService.getInstitutionStatusType).toHaveBeenCalled();
      expect(institutionStatusTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitutionStatusType>>();
      const institutionStatusType = { id: 123 };
      jest.spyOn(institutionStatusTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institutionStatusType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(institutionStatusTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
