import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SecurityClassificationTypeFormService } from './security-classification-type-form.service';
import { SecurityClassificationTypeService } from '../service/security-classification-type.service';
import { ISecurityClassificationType } from '../security-classification-type.model';

import { SecurityClassificationTypeUpdateComponent } from './security-classification-type-update.component';

describe('SecurityClassificationType Management Update Component', () => {
  let comp: SecurityClassificationTypeUpdateComponent;
  let fixture: ComponentFixture<SecurityClassificationTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let securityClassificationTypeFormService: SecurityClassificationTypeFormService;
  let securityClassificationTypeService: SecurityClassificationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SecurityClassificationTypeUpdateComponent],
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
      .overrideTemplate(SecurityClassificationTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecurityClassificationTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    securityClassificationTypeFormService = TestBed.inject(SecurityClassificationTypeFormService);
    securityClassificationTypeService = TestBed.inject(SecurityClassificationTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const securityClassificationType: ISecurityClassificationType = { id: 456 };

      activatedRoute.data = of({ securityClassificationType });
      comp.ngOnInit();

      expect(comp.securityClassificationType).toEqual(securityClassificationType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityClassificationType>>();
      const securityClassificationType = { id: 123 };
      jest.spyOn(securityClassificationTypeFormService, 'getSecurityClassificationType').mockReturnValue(securityClassificationType);
      jest.spyOn(securityClassificationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityClassificationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityClassificationType }));
      saveSubject.complete();

      // THEN
      expect(securityClassificationTypeFormService.getSecurityClassificationType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(securityClassificationTypeService.update).toHaveBeenCalledWith(expect.objectContaining(securityClassificationType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityClassificationType>>();
      const securityClassificationType = { id: 123 };
      jest.spyOn(securityClassificationTypeFormService, 'getSecurityClassificationType').mockReturnValue({ id: null });
      jest.spyOn(securityClassificationTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityClassificationType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityClassificationType }));
      saveSubject.complete();

      // THEN
      expect(securityClassificationTypeFormService.getSecurityClassificationType).toHaveBeenCalled();
      expect(securityClassificationTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityClassificationType>>();
      const securityClassificationType = { id: 123 };
      jest.spyOn(securityClassificationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityClassificationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(securityClassificationTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
