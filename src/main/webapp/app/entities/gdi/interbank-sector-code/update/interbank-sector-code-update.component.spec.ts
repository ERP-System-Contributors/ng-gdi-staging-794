import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InterbankSectorCodeFormService } from './interbank-sector-code-form.service';
import { InterbankSectorCodeService } from '../service/interbank-sector-code.service';
import { IInterbankSectorCode } from '../interbank-sector-code.model';

import { InterbankSectorCodeUpdateComponent } from './interbank-sector-code-update.component';

describe('InterbankSectorCode Management Update Component', () => {
  let comp: InterbankSectorCodeUpdateComponent;
  let fixture: ComponentFixture<InterbankSectorCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let interbankSectorCodeFormService: InterbankSectorCodeFormService;
  let interbankSectorCodeService: InterbankSectorCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InterbankSectorCodeUpdateComponent],
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
      .overrideTemplate(InterbankSectorCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InterbankSectorCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    interbankSectorCodeFormService = TestBed.inject(InterbankSectorCodeFormService);
    interbankSectorCodeService = TestBed.inject(InterbankSectorCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const interbankSectorCode: IInterbankSectorCode = { id: 456 };

      activatedRoute.data = of({ interbankSectorCode });
      comp.ngOnInit();

      expect(comp.interbankSectorCode).toEqual(interbankSectorCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInterbankSectorCode>>();
      const interbankSectorCode = { id: 123 };
      jest.spyOn(interbankSectorCodeFormService, 'getInterbankSectorCode').mockReturnValue(interbankSectorCode);
      jest.spyOn(interbankSectorCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ interbankSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: interbankSectorCode }));
      saveSubject.complete();

      // THEN
      expect(interbankSectorCodeFormService.getInterbankSectorCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(interbankSectorCodeService.update).toHaveBeenCalledWith(expect.objectContaining(interbankSectorCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInterbankSectorCode>>();
      const interbankSectorCode = { id: 123 };
      jest.spyOn(interbankSectorCodeFormService, 'getInterbankSectorCode').mockReturnValue({ id: null });
      jest.spyOn(interbankSectorCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ interbankSectorCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: interbankSectorCode }));
      saveSubject.complete();

      // THEN
      expect(interbankSectorCodeFormService.getInterbankSectorCode).toHaveBeenCalled();
      expect(interbankSectorCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInterbankSectorCode>>();
      const interbankSectorCode = { id: 123 };
      jest.spyOn(interbankSectorCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ interbankSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(interbankSectorCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
