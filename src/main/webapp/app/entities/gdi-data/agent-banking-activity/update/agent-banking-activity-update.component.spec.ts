import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AgentBankingActivityFormService } from './agent-banking-activity-form.service';
import { AgentBankingActivityService } from '../service/agent-banking-activity.service';
import { IAgentBankingActivity } from '../agent-banking-activity.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IBankTransactionType } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.model';
import { BankTransactionTypeService } from 'app/entities/gdi/bank-transaction-type/service/bank-transaction-type.service';

import { AgentBankingActivityUpdateComponent } from './agent-banking-activity-update.component';

describe('AgentBankingActivity Management Update Component', () => {
  let comp: AgentBankingActivityUpdateComponent;
  let fixture: ComponentFixture<AgentBankingActivityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let agentBankingActivityFormService: AgentBankingActivityFormService;
  let agentBankingActivityService: AgentBankingActivityService;
  let institutionCodeService: InstitutionCodeService;
  let bankBranchCodeService: BankBranchCodeService;
  let bankTransactionTypeService: BankTransactionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AgentBankingActivityUpdateComponent],
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
      .overrideTemplate(AgentBankingActivityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AgentBankingActivityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    agentBankingActivityFormService = TestBed.inject(AgentBankingActivityFormService);
    agentBankingActivityService = TestBed.inject(AgentBankingActivityService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    bankTransactionTypeService = TestBed.inject(BankTransactionTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const agentBankingActivity: IAgentBankingActivity = { id: 456 };
      const bankCode: IInstitutionCode = { id: 68792 };
      agentBankingActivity.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 26448 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agentBankingActivity });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const agentBankingActivity: IAgentBankingActivity = { id: 456 };
      const branchCode: IBankBranchCode = { id: 59795 };
      agentBankingActivity.branchCode = branchCode;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 52180 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [branchCode];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agentBankingActivity });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankTransactionType query and add missing value', () => {
      const agentBankingActivity: IAgentBankingActivity = { id: 456 };
      const transactionType: IBankTransactionType = { id: 54370 };
      agentBankingActivity.transactionType = transactionType;

      const bankTransactionTypeCollection: IBankTransactionType[] = [{ id: 52342 }];
      jest.spyOn(bankTransactionTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankTransactionTypeCollection })));
      const additionalBankTransactionTypes = [transactionType];
      const expectedCollection: IBankTransactionType[] = [...additionalBankTransactionTypes, ...bankTransactionTypeCollection];
      jest.spyOn(bankTransactionTypeService, 'addBankTransactionTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agentBankingActivity });
      comp.ngOnInit();

      expect(bankTransactionTypeService.query).toHaveBeenCalled();
      expect(bankTransactionTypeService.addBankTransactionTypeToCollectionIfMissing).toHaveBeenCalledWith(
        bankTransactionTypeCollection,
        ...additionalBankTransactionTypes.map(expect.objectContaining)
      );
      expect(comp.bankTransactionTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const agentBankingActivity: IAgentBankingActivity = { id: 456 };
      const bankCode: IInstitutionCode = { id: 37815 };
      agentBankingActivity.bankCode = bankCode;
      const branchCode: IBankBranchCode = { id: 54375 };
      agentBankingActivity.branchCode = branchCode;
      const transactionType: IBankTransactionType = { id: 8765 };
      agentBankingActivity.transactionType = transactionType;

      activatedRoute.data = of({ agentBankingActivity });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.bankBranchCodesSharedCollection).toContain(branchCode);
      expect(comp.bankTransactionTypesSharedCollection).toContain(transactionType);
      expect(comp.agentBankingActivity).toEqual(agentBankingActivity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgentBankingActivity>>();
      const agentBankingActivity = { id: 123 };
      jest.spyOn(agentBankingActivityFormService, 'getAgentBankingActivity').mockReturnValue(agentBankingActivity);
      jest.spyOn(agentBankingActivityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agentBankingActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agentBankingActivity }));
      saveSubject.complete();

      // THEN
      expect(agentBankingActivityFormService.getAgentBankingActivity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(agentBankingActivityService.update).toHaveBeenCalledWith(expect.objectContaining(agentBankingActivity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgentBankingActivity>>();
      const agentBankingActivity = { id: 123 };
      jest.spyOn(agentBankingActivityFormService, 'getAgentBankingActivity').mockReturnValue({ id: null });
      jest.spyOn(agentBankingActivityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agentBankingActivity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agentBankingActivity }));
      saveSubject.complete();

      // THEN
      expect(agentBankingActivityFormService.getAgentBankingActivity).toHaveBeenCalled();
      expect(agentBankingActivityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgentBankingActivity>>();
      const agentBankingActivity = { id: 123 };
      jest.spyOn(agentBankingActivityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agentBankingActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(agentBankingActivityService.update).toHaveBeenCalled();
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

    describe('compareBankTransactionType', () => {
      it('Should forward to bankTransactionTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(bankTransactionTypeService, 'compareBankTransactionType');
        comp.compareBankTransactionType(entity, entity2);
        expect(bankTransactionTypeService.compareBankTransactionType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
