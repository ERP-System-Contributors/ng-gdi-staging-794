import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IsoCountryCodeFormService } from './iso-country-code-form.service';
import { IsoCountryCodeService } from '../service/iso-country-code.service';
import { IIsoCountryCode } from '../iso-country-code.model';

import { IsoCountryCodeUpdateComponent } from './iso-country-code-update.component';

describe('IsoCountryCode Management Update Component', () => {
  let comp: IsoCountryCodeUpdateComponent;
  let fixture: ComponentFixture<IsoCountryCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let isoCountryCodeFormService: IsoCountryCodeFormService;
  let isoCountryCodeService: IsoCountryCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IsoCountryCodeUpdateComponent],
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
      .overrideTemplate(IsoCountryCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IsoCountryCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    isoCountryCodeFormService = TestBed.inject(IsoCountryCodeFormService);
    isoCountryCodeService = TestBed.inject(IsoCountryCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const isoCountryCode: IIsoCountryCode = { id: 456 };

      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      expect(comp.isoCountryCode).toEqual(isoCountryCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeFormService, 'getIsoCountryCode').mockReturnValue(isoCountryCode);
      jest.spyOn(isoCountryCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCountryCode }));
      saveSubject.complete();

      // THEN
      expect(isoCountryCodeFormService.getIsoCountryCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(isoCountryCodeService.update).toHaveBeenCalledWith(expect.objectContaining(isoCountryCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeFormService, 'getIsoCountryCode').mockReturnValue({ id: null });
      jest.spyOn(isoCountryCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCountryCode }));
      saveSubject.complete();

      // THEN
      expect(isoCountryCodeFormService.getIsoCountryCode).toHaveBeenCalled();
      expect(isoCountryCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(isoCountryCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
