import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrbRecordFileTypeFormService } from './crb-record-file-type-form.service';
import { CrbRecordFileTypeService } from '../service/crb-record-file-type.service';
import { ICrbRecordFileType } from '../crb-record-file-type.model';

import { CrbRecordFileTypeUpdateComponent } from './crb-record-file-type-update.component';

describe('CrbRecordFileType Management Update Component', () => {
  let comp: CrbRecordFileTypeUpdateComponent;
  let fixture: ComponentFixture<CrbRecordFileTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbRecordFileTypeFormService: CrbRecordFileTypeFormService;
  let crbRecordFileTypeService: CrbRecordFileTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbRecordFileTypeUpdateComponent],
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
      .overrideTemplate(CrbRecordFileTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbRecordFileTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbRecordFileTypeFormService = TestBed.inject(CrbRecordFileTypeFormService);
    crbRecordFileTypeService = TestBed.inject(CrbRecordFileTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbRecordFileType: ICrbRecordFileType = { id: 456 };

      activatedRoute.data = of({ crbRecordFileType });
      comp.ngOnInit();

      expect(comp.crbRecordFileType).toEqual(crbRecordFileType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbRecordFileType>>();
      const crbRecordFileType = { id: 123 };
      jest.spyOn(crbRecordFileTypeFormService, 'getCrbRecordFileType').mockReturnValue(crbRecordFileType);
      jest.spyOn(crbRecordFileTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbRecordFileType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbRecordFileType }));
      saveSubject.complete();

      // THEN
      expect(crbRecordFileTypeFormService.getCrbRecordFileType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbRecordFileTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbRecordFileType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbRecordFileType>>();
      const crbRecordFileType = { id: 123 };
      jest.spyOn(crbRecordFileTypeFormService, 'getCrbRecordFileType').mockReturnValue({ id: null });
      jest.spyOn(crbRecordFileTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbRecordFileType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbRecordFileType }));
      saveSubject.complete();

      // THEN
      expect(crbRecordFileTypeFormService.getCrbRecordFileType).toHaveBeenCalled();
      expect(crbRecordFileTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbRecordFileType>>();
      const crbRecordFileType = { id: 123 };
      jest.spyOn(crbRecordFileTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbRecordFileType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbRecordFileTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
