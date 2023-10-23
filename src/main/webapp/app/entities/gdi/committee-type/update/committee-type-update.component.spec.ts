import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CommitteeTypeFormService } from './committee-type-form.service';
import { CommitteeTypeService } from '../service/committee-type.service';
import { ICommitteeType } from '../committee-type.model';

import { CommitteeTypeUpdateComponent } from './committee-type-update.component';

describe('CommitteeType Management Update Component', () => {
  let comp: CommitteeTypeUpdateComponent;
  let fixture: ComponentFixture<CommitteeTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let committeeTypeFormService: CommitteeTypeFormService;
  let committeeTypeService: CommitteeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CommitteeTypeUpdateComponent],
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
      .overrideTemplate(CommitteeTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommitteeTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    committeeTypeFormService = TestBed.inject(CommitteeTypeFormService);
    committeeTypeService = TestBed.inject(CommitteeTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const committeeType: ICommitteeType = { id: 456 };

      activatedRoute.data = of({ committeeType });
      comp.ngOnInit();

      expect(comp.committeeType).toEqual(committeeType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommitteeType>>();
      const committeeType = { id: 123 };
      jest.spyOn(committeeTypeFormService, 'getCommitteeType').mockReturnValue(committeeType);
      jest.spyOn(committeeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ committeeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: committeeType }));
      saveSubject.complete();

      // THEN
      expect(committeeTypeFormService.getCommitteeType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(committeeTypeService.update).toHaveBeenCalledWith(expect.objectContaining(committeeType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommitteeType>>();
      const committeeType = { id: 123 };
      jest.spyOn(committeeTypeFormService, 'getCommitteeType').mockReturnValue({ id: null });
      jest.spyOn(committeeTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ committeeType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: committeeType }));
      saveSubject.complete();

      // THEN
      expect(committeeTypeFormService.getCommitteeType).toHaveBeenCalled();
      expect(committeeTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommitteeType>>();
      const committeeType = { id: 123 };
      jest.spyOn(committeeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ committeeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(committeeTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
