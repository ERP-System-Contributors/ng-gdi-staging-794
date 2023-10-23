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

import { TerminalsAndPOSFormService } from './terminals-and-pos-form.service';
import { TerminalsAndPOSService } from '../service/terminals-and-pos.service';
import { ITerminalsAndPOS } from '../terminals-and-pos.model';
import { ITerminalTypes } from 'app/entities/gdi/terminal-types/terminal-types.model';
import { TerminalTypesService } from 'app/entities/gdi/terminal-types/service/terminal-types.service';
import { ITerminalFunctions } from 'app/entities/gdi/terminal-functions/terminal-functions.model';
import { TerminalFunctionsService } from 'app/entities/gdi/terminal-functions/service/terminal-functions.service';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';

import { TerminalsAndPOSUpdateComponent } from './terminals-and-pos-update.component';

describe('TerminalsAndPOS Management Update Component', () => {
  let comp: TerminalsAndPOSUpdateComponent;
  let fixture: ComponentFixture<TerminalsAndPOSUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let terminalsAndPOSFormService: TerminalsAndPOSFormService;
  let terminalsAndPOSService: TerminalsAndPOSService;
  let terminalTypesService: TerminalTypesService;
  let terminalFunctionsService: TerminalFunctionsService;
  let countySubCountyCodeService: CountySubCountyCodeService;
  let institutionCodeService: InstitutionCodeService;
  let bankBranchCodeService: BankBranchCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TerminalsAndPOSUpdateComponent],
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
      .overrideTemplate(TerminalsAndPOSUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerminalsAndPOSUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    terminalsAndPOSFormService = TestBed.inject(TerminalsAndPOSFormService);
    terminalsAndPOSService = TestBed.inject(TerminalsAndPOSService);
    terminalTypesService = TestBed.inject(TerminalTypesService);
    terminalFunctionsService = TestBed.inject(TerminalFunctionsService);
    countySubCountyCodeService = TestBed.inject(CountySubCountyCodeService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TerminalTypes query and add missing value', () => {
      const terminalsAndPOS: ITerminalsAndPOS = { id: 456 };
      const terminalType: ITerminalTypes = { id: 63730 };
      terminalsAndPOS.terminalType = terminalType;

      const terminalTypesCollection: ITerminalTypes[] = [{ id: 53086 }];
      jest.spyOn(terminalTypesService, 'query').mockReturnValue(of(new HttpResponse({ body: terminalTypesCollection })));
      const additionalTerminalTypes = [terminalType];
      const expectedCollection: ITerminalTypes[] = [...additionalTerminalTypes, ...terminalTypesCollection];
      jest.spyOn(terminalTypesService, 'addTerminalTypesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      expect(terminalTypesService.query).toHaveBeenCalled();
      expect(terminalTypesService.addTerminalTypesToCollectionIfMissing).toHaveBeenCalledWith(
        terminalTypesCollection,
        ...additionalTerminalTypes.map(expect.objectContaining)
      );
      expect(comp.terminalTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TerminalFunctions query and add missing value', () => {
      const terminalsAndPOS: ITerminalsAndPOS = { id: 456 };
      const terminalFunctionality: ITerminalFunctions = { id: 69434 };
      terminalsAndPOS.terminalFunctionality = terminalFunctionality;

      const terminalFunctionsCollection: ITerminalFunctions[] = [{ id: 59792 }];
      jest.spyOn(terminalFunctionsService, 'query').mockReturnValue(of(new HttpResponse({ body: terminalFunctionsCollection })));
      const additionalTerminalFunctions = [terminalFunctionality];
      const expectedCollection: ITerminalFunctions[] = [...additionalTerminalFunctions, ...terminalFunctionsCollection];
      jest.spyOn(terminalFunctionsService, 'addTerminalFunctionsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      expect(terminalFunctionsService.query).toHaveBeenCalled();
      expect(terminalFunctionsService.addTerminalFunctionsToCollectionIfMissing).toHaveBeenCalledWith(
        terminalFunctionsCollection,
        ...additionalTerminalFunctions.map(expect.objectContaining)
      );
      expect(comp.terminalFunctionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CountySubCountyCode query and add missing value', () => {
      const terminalsAndPOS: ITerminalsAndPOS = { id: 456 };
      const physicalLocation: ICountySubCountyCode = { id: 8455 };
      terminalsAndPOS.physicalLocation = physicalLocation;

      const countySubCountyCodeCollection: ICountySubCountyCode[] = [{ id: 59731 }];
      jest.spyOn(countySubCountyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: countySubCountyCodeCollection })));
      const additionalCountySubCountyCodes = [physicalLocation];
      const expectedCollection: ICountySubCountyCode[] = [...additionalCountySubCountyCodes, ...countySubCountyCodeCollection];
      jest.spyOn(countySubCountyCodeService, 'addCountySubCountyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      expect(countySubCountyCodeService.query).toHaveBeenCalled();
      expect(countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        countySubCountyCodeCollection,
        ...additionalCountySubCountyCodes.map(expect.objectContaining)
      );
      expect(comp.countySubCountyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call InstitutionCode query and add missing value', () => {
      const terminalsAndPOS: ITerminalsAndPOS = { id: 456 };
      const bankId: IInstitutionCode = { id: 5803 };
      terminalsAndPOS.bankId = bankId;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 69432 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankId];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const terminalsAndPOS: ITerminalsAndPOS = { id: 456 };
      const branchId: IBankBranchCode = { id: 96926 };
      terminalsAndPOS.branchId = branchId;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 58442 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [branchId];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const terminalsAndPOS: ITerminalsAndPOS = { id: 456 };
      const terminalType: ITerminalTypes = { id: 71303 };
      terminalsAndPOS.terminalType = terminalType;
      const terminalFunctionality: ITerminalFunctions = { id: 27705 };
      terminalsAndPOS.terminalFunctionality = terminalFunctionality;
      const physicalLocation: ICountySubCountyCode = { id: 1637 };
      terminalsAndPOS.physicalLocation = physicalLocation;
      const bankId: IInstitutionCode = { id: 49472 };
      terminalsAndPOS.bankId = bankId;
      const branchId: IBankBranchCode = { id: 89679 };
      terminalsAndPOS.branchId = branchId;

      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      expect(comp.terminalTypesSharedCollection).toContain(terminalType);
      expect(comp.terminalFunctionsSharedCollection).toContain(terminalFunctionality);
      expect(comp.countySubCountyCodesSharedCollection).toContain(physicalLocation);
      expect(comp.institutionCodesSharedCollection).toContain(bankId);
      expect(comp.bankBranchCodesSharedCollection).toContain(branchId);
      expect(comp.terminalsAndPOS).toEqual(terminalsAndPOS);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalsAndPOS>>();
      const terminalsAndPOS = { id: 123 };
      jest.spyOn(terminalsAndPOSFormService, 'getTerminalsAndPOS').mockReturnValue(terminalsAndPOS);
      jest.spyOn(terminalsAndPOSService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalsAndPOS }));
      saveSubject.complete();

      // THEN
      expect(terminalsAndPOSFormService.getTerminalsAndPOS).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(terminalsAndPOSService.update).toHaveBeenCalledWith(expect.objectContaining(terminalsAndPOS));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalsAndPOS>>();
      const terminalsAndPOS = { id: 123 };
      jest.spyOn(terminalsAndPOSFormService, 'getTerminalsAndPOS').mockReturnValue({ id: null });
      jest.spyOn(terminalsAndPOSService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalsAndPOS: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalsAndPOS }));
      saveSubject.complete();

      // THEN
      expect(terminalsAndPOSFormService.getTerminalsAndPOS).toHaveBeenCalled();
      expect(terminalsAndPOSService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerminalsAndPOS>>();
      const terminalsAndPOS = { id: 123 };
      jest.spyOn(terminalsAndPOSService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalsAndPOS });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(terminalsAndPOSService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTerminalTypes', () => {
      it('Should forward to terminalTypesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(terminalTypesService, 'compareTerminalTypes');
        comp.compareTerminalTypes(entity, entity2);
        expect(terminalTypesService.compareTerminalTypes).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTerminalFunctions', () => {
      it('Should forward to terminalFunctionsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(terminalFunctionsService, 'compareTerminalFunctions');
        comp.compareTerminalFunctions(entity, entity2);
        expect(terminalFunctionsService.compareTerminalFunctions).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCountySubCountyCode', () => {
      it('Should forward to countySubCountyCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(countySubCountyCodeService, 'compareCountySubCountyCode');
        comp.compareCountySubCountyCode(entity, entity2);
        expect(countySubCountyCodeService.compareCountySubCountyCode).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
  });
});
