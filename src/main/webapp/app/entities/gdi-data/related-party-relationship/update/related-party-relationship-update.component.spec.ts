import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RelatedPartyRelationshipFormService } from './related-party-relationship-form.service';
import { RelatedPartyRelationshipService } from '../service/related-party-relationship.service';
import { IRelatedPartyRelationship } from '../related-party-relationship.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IPartyRelationType } from 'app/entities/gdi/party-relation-type/party-relation-type.model';
import { PartyRelationTypeService } from 'app/entities/gdi/party-relation-type/service/party-relation-type.service';

import { RelatedPartyRelationshipUpdateComponent } from './related-party-relationship-update.component';

describe('RelatedPartyRelationship Management Update Component', () => {
  let comp: RelatedPartyRelationshipUpdateComponent;
  let fixture: ComponentFixture<RelatedPartyRelationshipUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let relatedPartyRelationshipFormService: RelatedPartyRelationshipFormService;
  let relatedPartyRelationshipService: RelatedPartyRelationshipService;
  let institutionCodeService: InstitutionCodeService;
  let bankBranchCodeService: BankBranchCodeService;
  let partyRelationTypeService: PartyRelationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RelatedPartyRelationshipUpdateComponent],
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
      .overrideTemplate(RelatedPartyRelationshipUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RelatedPartyRelationshipUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    relatedPartyRelationshipFormService = TestBed.inject(RelatedPartyRelationshipFormService);
    relatedPartyRelationshipService = TestBed.inject(RelatedPartyRelationshipService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    partyRelationTypeService = TestBed.inject(PartyRelationTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const relatedPartyRelationship: IRelatedPartyRelationship = { id: 456 };
      const bankCode: IInstitutionCode = { id: 12571 };
      relatedPartyRelationship.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 25031 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ relatedPartyRelationship });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const relatedPartyRelationship: IRelatedPartyRelationship = { id: 456 };
      const branchId: IBankBranchCode = { id: 52868 };
      relatedPartyRelationship.branchId = branchId;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 29140 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [branchId];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ relatedPartyRelationship });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PartyRelationType query and add missing value', () => {
      const relatedPartyRelationship: IRelatedPartyRelationship = { id: 456 };
      const relationshipType: IPartyRelationType = { id: 5387 };
      relatedPartyRelationship.relationshipType = relationshipType;

      const partyRelationTypeCollection: IPartyRelationType[] = [{ id: 22110 }];
      jest.spyOn(partyRelationTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: partyRelationTypeCollection })));
      const additionalPartyRelationTypes = [relationshipType];
      const expectedCollection: IPartyRelationType[] = [...additionalPartyRelationTypes, ...partyRelationTypeCollection];
      jest.spyOn(partyRelationTypeService, 'addPartyRelationTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ relatedPartyRelationship });
      comp.ngOnInit();

      expect(partyRelationTypeService.query).toHaveBeenCalled();
      expect(partyRelationTypeService.addPartyRelationTypeToCollectionIfMissing).toHaveBeenCalledWith(
        partyRelationTypeCollection,
        ...additionalPartyRelationTypes.map(expect.objectContaining)
      );
      expect(comp.partyRelationTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const relatedPartyRelationship: IRelatedPartyRelationship = { id: 456 };
      const bankCode: IInstitutionCode = { id: 36106 };
      relatedPartyRelationship.bankCode = bankCode;
      const branchId: IBankBranchCode = { id: 21489 };
      relatedPartyRelationship.branchId = branchId;
      const relationshipType: IPartyRelationType = { id: 59609 };
      relatedPartyRelationship.relationshipType = relationshipType;

      activatedRoute.data = of({ relatedPartyRelationship });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.bankBranchCodesSharedCollection).toContain(branchId);
      expect(comp.partyRelationTypesSharedCollection).toContain(relationshipType);
      expect(comp.relatedPartyRelationship).toEqual(relatedPartyRelationship);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRelatedPartyRelationship>>();
      const relatedPartyRelationship = { id: 123 };
      jest.spyOn(relatedPartyRelationshipFormService, 'getRelatedPartyRelationship').mockReturnValue(relatedPartyRelationship);
      jest.spyOn(relatedPartyRelationshipService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ relatedPartyRelationship });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: relatedPartyRelationship }));
      saveSubject.complete();

      // THEN
      expect(relatedPartyRelationshipFormService.getRelatedPartyRelationship).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(relatedPartyRelationshipService.update).toHaveBeenCalledWith(expect.objectContaining(relatedPartyRelationship));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRelatedPartyRelationship>>();
      const relatedPartyRelationship = { id: 123 };
      jest.spyOn(relatedPartyRelationshipFormService, 'getRelatedPartyRelationship').mockReturnValue({ id: null });
      jest.spyOn(relatedPartyRelationshipService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ relatedPartyRelationship: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: relatedPartyRelationship }));
      saveSubject.complete();

      // THEN
      expect(relatedPartyRelationshipFormService.getRelatedPartyRelationship).toHaveBeenCalled();
      expect(relatedPartyRelationshipService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRelatedPartyRelationship>>();
      const relatedPartyRelationship = { id: 123 };
      jest.spyOn(relatedPartyRelationshipService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ relatedPartyRelationship });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(relatedPartyRelationshipService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInstitutionCode', () => {
      it('Should forward to institutionCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(institutionCodeService, 'compareInstitutionCode');
        comp.compareInstitutionCode(entity, entity2);
        expect(institutionCodeService.compareInstitutionCode).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBankBranchCode', () => {
      it('Should forward to bankBranchCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(bankBranchCodeService, 'compareBankBranchCode');
        comp.compareBankBranchCode(entity, entity2);
        expect(bankBranchCodeService.compareBankBranchCode).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePartyRelationType', () => {
      it('Should forward to partyRelationTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(partyRelationTypeService, 'comparePartyRelationType');
        comp.comparePartyRelationType(entity, entity2);
        expect(partyRelationTypeService.comparePartyRelationType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
