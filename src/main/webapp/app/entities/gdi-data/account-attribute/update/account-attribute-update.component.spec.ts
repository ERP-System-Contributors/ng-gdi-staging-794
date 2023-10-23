///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccountAttributeFormService } from './account-attribute-form.service';
import { AccountAttributeService } from '../service/account-attribute.service';
import { IAccountAttribute } from '../account-attribute.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IAccountOwnershipType } from 'app/entities/gdi/account-ownership-type/account-ownership-type.model';
import { AccountOwnershipTypeService } from 'app/entities/gdi/account-ownership-type/service/account-ownership-type.service';

import { AccountAttributeUpdateComponent } from './account-attribute-update.component';

describe('AccountAttribute Management Update Component', () => {
  let comp: AccountAttributeUpdateComponent;
  let fixture: ComponentFixture<AccountAttributeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountAttributeFormService: AccountAttributeFormService;
  let accountAttributeService: AccountAttributeService;
  let institutionCodeService: InstitutionCodeService;
  let bankBranchCodeService: BankBranchCodeService;
  let accountOwnershipTypeService: AccountOwnershipTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccountAttributeUpdateComponent],
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
      .overrideTemplate(AccountAttributeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountAttributeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountAttributeFormService = TestBed.inject(AccountAttributeFormService);
    accountAttributeService = TestBed.inject(AccountAttributeService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    accountOwnershipTypeService = TestBed.inject(AccountOwnershipTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const accountAttribute: IAccountAttribute = { id: 456 };
      const bankCode: IInstitutionCode = { id: 46315 };
      accountAttribute.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 30178 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountAttribute });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const accountAttribute: IAccountAttribute = { id: 456 };
      const branchCode: IBankBranchCode = { id: 92534 };
      accountAttribute.branchCode = branchCode;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 31821 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [branchCode];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountAttribute });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AccountOwnershipType query and add missing value', () => {
      const accountAttribute: IAccountAttribute = { id: 456 };
      const accountOwnershipType: IAccountOwnershipType = { id: 48664 };
      accountAttribute.accountOwnershipType = accountOwnershipType;

      const accountOwnershipTypeCollection: IAccountOwnershipType[] = [{ id: 30485 }];
      jest.spyOn(accountOwnershipTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: accountOwnershipTypeCollection })));
      const additionalAccountOwnershipTypes = [accountOwnershipType];
      const expectedCollection: IAccountOwnershipType[] = [...additionalAccountOwnershipTypes, ...accountOwnershipTypeCollection];
      jest.spyOn(accountOwnershipTypeService, 'addAccountOwnershipTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountAttribute });
      comp.ngOnInit();

      expect(accountOwnershipTypeService.query).toHaveBeenCalled();
      expect(accountOwnershipTypeService.addAccountOwnershipTypeToCollectionIfMissing).toHaveBeenCalledWith(
        accountOwnershipTypeCollection,
        ...additionalAccountOwnershipTypes.map(expect.objectContaining)
      );
      expect(comp.accountOwnershipTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const accountAttribute: IAccountAttribute = { id: 456 };
      const bankCode: IInstitutionCode = { id: 87278 };
      accountAttribute.bankCode = bankCode;
      const branchCode: IBankBranchCode = { id: 48656 };
      accountAttribute.branchCode = branchCode;
      const accountOwnershipType: IAccountOwnershipType = { id: 63759 };
      accountAttribute.accountOwnershipType = accountOwnershipType;

      activatedRoute.data = of({ accountAttribute });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.bankBranchCodesSharedCollection).toContain(branchCode);
      expect(comp.accountOwnershipTypesSharedCollection).toContain(accountOwnershipType);
      expect(comp.accountAttribute).toEqual(accountAttribute);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountAttribute>>();
      const accountAttribute = { id: 123 };
      jest.spyOn(accountAttributeFormService, 'getAccountAttribute').mockReturnValue(accountAttribute);
      jest.spyOn(accountAttributeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountAttribute });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountAttribute }));
      saveSubject.complete();

      // THEN
      expect(accountAttributeFormService.getAccountAttribute).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountAttributeService.update).toHaveBeenCalledWith(expect.objectContaining(accountAttribute));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountAttribute>>();
      const accountAttribute = { id: 123 };
      jest.spyOn(accountAttributeFormService, 'getAccountAttribute').mockReturnValue({ id: null });
      jest.spyOn(accountAttributeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountAttribute: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountAttribute }));
      saveSubject.complete();

      // THEN
      expect(accountAttributeFormService.getAccountAttribute).toHaveBeenCalled();
      expect(accountAttributeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountAttribute>>();
      const accountAttribute = { id: 123 };
      jest.spyOn(accountAttributeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountAttribute });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountAttributeService.update).toHaveBeenCalled();
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

    describe('compareAccountOwnershipType', () => {
      it('Should forward to accountOwnershipTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(accountOwnershipTypeService, 'compareAccountOwnershipType');
        comp.compareAccountOwnershipType(entity, entity2);
        expect(accountOwnershipTypeService.compareAccountOwnershipType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
