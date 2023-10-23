import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SourcesOfFundsTypeCodeFormService } from './sources-of-funds-type-code-form.service';
import { SourcesOfFundsTypeCodeService } from '../service/sources-of-funds-type-code.service';
import { ISourcesOfFundsTypeCode } from '../sources-of-funds-type-code.model';

import { SourcesOfFundsTypeCodeUpdateComponent } from './sources-of-funds-type-code-update.component';

describe('SourcesOfFundsTypeCode Management Update Component', () => {
  let comp: SourcesOfFundsTypeCodeUpdateComponent;
  let fixture: ComponentFixture<SourcesOfFundsTypeCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sourcesOfFundsTypeCodeFormService: SourcesOfFundsTypeCodeFormService;
  let sourcesOfFundsTypeCodeService: SourcesOfFundsTypeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SourcesOfFundsTypeCodeUpdateComponent],
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
      .overrideTemplate(SourcesOfFundsTypeCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SourcesOfFundsTypeCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sourcesOfFundsTypeCodeFormService = TestBed.inject(SourcesOfFundsTypeCodeFormService);
    sourcesOfFundsTypeCodeService = TestBed.inject(SourcesOfFundsTypeCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = { id: 456 };

      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      expect(comp.sourcesOfFundsTypeCode).toEqual(sourcesOfFundsTypeCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISourcesOfFundsTypeCode>>();
      const sourcesOfFundsTypeCode = { id: 123 };
      jest.spyOn(sourcesOfFundsTypeCodeFormService, 'getSourcesOfFundsTypeCode').mockReturnValue(sourcesOfFundsTypeCode);
      jest.spyOn(sourcesOfFundsTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sourcesOfFundsTypeCode }));
      saveSubject.complete();

      // THEN
      expect(sourcesOfFundsTypeCodeFormService.getSourcesOfFundsTypeCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sourcesOfFundsTypeCodeService.update).toHaveBeenCalledWith(expect.objectContaining(sourcesOfFundsTypeCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISourcesOfFundsTypeCode>>();
      const sourcesOfFundsTypeCode = { id: 123 };
      jest.spyOn(sourcesOfFundsTypeCodeFormService, 'getSourcesOfFundsTypeCode').mockReturnValue({ id: null });
      jest.spyOn(sourcesOfFundsTypeCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourcesOfFundsTypeCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sourcesOfFundsTypeCode }));
      saveSubject.complete();

      // THEN
      expect(sourcesOfFundsTypeCodeFormService.getSourcesOfFundsTypeCode).toHaveBeenCalled();
      expect(sourcesOfFundsTypeCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISourcesOfFundsTypeCode>>();
      const sourcesOfFundsTypeCode = { id: 123 };
      jest.spyOn(sourcesOfFundsTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sourcesOfFundsTypeCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
