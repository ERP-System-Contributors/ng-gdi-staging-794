import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SecurityTenureFormService } from './security-tenure-form.service';
import { SecurityTenureService } from '../service/security-tenure.service';
import { ISecurityTenure } from '../security-tenure.model';

import { SecurityTenureUpdateComponent } from './security-tenure-update.component';

describe('SecurityTenure Management Update Component', () => {
  let comp: SecurityTenureUpdateComponent;
  let fixture: ComponentFixture<SecurityTenureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let securityTenureFormService: SecurityTenureFormService;
  let securityTenureService: SecurityTenureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SecurityTenureUpdateComponent],
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
      .overrideTemplate(SecurityTenureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecurityTenureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    securityTenureFormService = TestBed.inject(SecurityTenureFormService);
    securityTenureService = TestBed.inject(SecurityTenureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const securityTenure: ISecurityTenure = { id: 456 };

      activatedRoute.data = of({ securityTenure });
      comp.ngOnInit();

      expect(comp.securityTenure).toEqual(securityTenure);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityTenure>>();
      const securityTenure = { id: 123 };
      jest.spyOn(securityTenureFormService, 'getSecurityTenure').mockReturnValue(securityTenure);
      jest.spyOn(securityTenureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityTenure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityTenure }));
      saveSubject.complete();

      // THEN
      expect(securityTenureFormService.getSecurityTenure).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(securityTenureService.update).toHaveBeenCalledWith(expect.objectContaining(securityTenure));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityTenure>>();
      const securityTenure = { id: 123 };
      jest.spyOn(securityTenureFormService, 'getSecurityTenure').mockReturnValue({ id: null });
      jest.spyOn(securityTenureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityTenure: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityTenure }));
      saveSubject.complete();

      // THEN
      expect(securityTenureFormService.getSecurityTenure).toHaveBeenCalled();
      expect(securityTenureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityTenure>>();
      const securityTenure = { id: 123 };
      jest.spyOn(securityTenureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityTenure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(securityTenureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
