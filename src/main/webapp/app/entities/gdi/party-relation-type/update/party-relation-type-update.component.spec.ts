import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PartyRelationTypeFormService } from './party-relation-type-form.service';
import { PartyRelationTypeService } from '../service/party-relation-type.service';
import { IPartyRelationType } from '../party-relation-type.model';

import { PartyRelationTypeUpdateComponent } from './party-relation-type-update.component';

describe('PartyRelationType Management Update Component', () => {
  let comp: PartyRelationTypeUpdateComponent;
  let fixture: ComponentFixture<PartyRelationTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let partyRelationTypeFormService: PartyRelationTypeFormService;
  let partyRelationTypeService: PartyRelationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PartyRelationTypeUpdateComponent],
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
      .overrideTemplate(PartyRelationTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartyRelationTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    partyRelationTypeFormService = TestBed.inject(PartyRelationTypeFormService);
    partyRelationTypeService = TestBed.inject(PartyRelationTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const partyRelationType: IPartyRelationType = { id: 456 };

      activatedRoute.data = of({ partyRelationType });
      comp.ngOnInit();

      expect(comp.partyRelationType).toEqual(partyRelationType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPartyRelationType>>();
      const partyRelationType = { id: 123 };
      jest.spyOn(partyRelationTypeFormService, 'getPartyRelationType').mockReturnValue(partyRelationType);
      jest.spyOn(partyRelationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partyRelationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: partyRelationType }));
      saveSubject.complete();

      // THEN
      expect(partyRelationTypeFormService.getPartyRelationType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(partyRelationTypeService.update).toHaveBeenCalledWith(expect.objectContaining(partyRelationType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPartyRelationType>>();
      const partyRelationType = { id: 123 };
      jest.spyOn(partyRelationTypeFormService, 'getPartyRelationType').mockReturnValue({ id: null });
      jest.spyOn(partyRelationTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partyRelationType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: partyRelationType }));
      saveSubject.complete();

      // THEN
      expect(partyRelationTypeFormService.getPartyRelationType).toHaveBeenCalled();
      expect(partyRelationTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPartyRelationType>>();
      const partyRelationType = { id: 123 };
      jest.spyOn(partyRelationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partyRelationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(partyRelationTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
