import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CountySubCountyCodeFormService } from './county-sub-county-code-form.service';
import { CountySubCountyCodeService } from '../service/county-sub-county-code.service';
import { ICountySubCountyCode } from '../county-sub-county-code.model';

import { CountySubCountyCodeUpdateComponent } from './county-sub-county-code-update.component';

describe('CountySubCountyCode Management Update Component', () => {
  let comp: CountySubCountyCodeUpdateComponent;
  let fixture: ComponentFixture<CountySubCountyCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let countySubCountyCodeFormService: CountySubCountyCodeFormService;
  let countySubCountyCodeService: CountySubCountyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CountySubCountyCodeUpdateComponent],
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
      .overrideTemplate(CountySubCountyCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CountySubCountyCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    countySubCountyCodeFormService = TestBed.inject(CountySubCountyCodeFormService);
    countySubCountyCodeService = TestBed.inject(CountySubCountyCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const countySubCountyCode: ICountySubCountyCode = { id: 456 };

      activatedRoute.data = of({ countySubCountyCode });
      comp.ngOnInit();

      expect(comp.countySubCountyCode).toEqual(countySubCountyCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountySubCountyCode>>();
      const countySubCountyCode = { id: 123 };
      jest.spyOn(countySubCountyCodeFormService, 'getCountySubCountyCode').mockReturnValue(countySubCountyCode);
      jest.spyOn(countySubCountyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ countySubCountyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: countySubCountyCode }));
      saveSubject.complete();

      // THEN
      expect(countySubCountyCodeFormService.getCountySubCountyCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(countySubCountyCodeService.update).toHaveBeenCalledWith(expect.objectContaining(countySubCountyCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountySubCountyCode>>();
      const countySubCountyCode = { id: 123 };
      jest.spyOn(countySubCountyCodeFormService, 'getCountySubCountyCode').mockReturnValue({ id: null });
      jest.spyOn(countySubCountyCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ countySubCountyCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: countySubCountyCode }));
      saveSubject.complete();

      // THEN
      expect(countySubCountyCodeFormService.getCountySubCountyCode).toHaveBeenCalled();
      expect(countySubCountyCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountySubCountyCode>>();
      const countySubCountyCode = { id: 123 };
      jest.spyOn(countySubCountyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ countySubCountyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(countySubCountyCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
