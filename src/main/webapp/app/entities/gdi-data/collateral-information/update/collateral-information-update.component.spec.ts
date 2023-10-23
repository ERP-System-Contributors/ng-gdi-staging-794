import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CollateralInformationFormService } from './collateral-information-form.service';
import { CollateralInformationService } from '../service/collateral-information.service';
import { ICollateralInformation } from '../collateral-information.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { ICollateralType } from 'app/entities/gdi/collateral-type/collateral-type.model';
import { CollateralTypeService } from 'app/entities/gdi/collateral-type/service/collateral-type.service';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';

import { CollateralInformationUpdateComponent } from './collateral-information-update.component';

describe('CollateralInformation Management Update Component', () => {
  let comp: CollateralInformationUpdateComponent;
  let fixture: ComponentFixture<CollateralInformationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let collateralInformationFormService: CollateralInformationFormService;
  let collateralInformationService: CollateralInformationService;
  let institutionCodeService: InstitutionCodeService;
  let bankBranchCodeService: BankBranchCodeService;
  let collateralTypeService: CollateralTypeService;
  let countySubCountyCodeService: CountySubCountyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CollateralInformationUpdateComponent],
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
      .overrideTemplate(CollateralInformationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CollateralInformationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    collateralInformationFormService = TestBed.inject(CollateralInformationFormService);
    collateralInformationService = TestBed.inject(CollateralInformationService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    collateralTypeService = TestBed.inject(CollateralTypeService);
    countySubCountyCodeService = TestBed.inject(CountySubCountyCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const collateralInformation: ICollateralInformation = { id: 456 };
      const bankCode: IInstitutionCode = { id: 48614 };
      collateralInformation.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 8114 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const collateralInformation: ICollateralInformation = { id: 456 };
      const branchCode: IBankBranchCode = { id: 86719 };
      collateralInformation.branchCode = branchCode;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 26757 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [branchCode];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CollateralType query and add missing value', () => {
      const collateralInformation: ICollateralInformation = { id: 456 };
      const collateralType: ICollateralType = { id: 43407 };
      collateralInformation.collateralType = collateralType;

      const collateralTypeCollection: ICollateralType[] = [{ id: 66940 }];
      jest.spyOn(collateralTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: collateralTypeCollection })));
      const additionalCollateralTypes = [collateralType];
      const expectedCollection: ICollateralType[] = [...additionalCollateralTypes, ...collateralTypeCollection];
      jest.spyOn(collateralTypeService, 'addCollateralTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      expect(collateralTypeService.query).toHaveBeenCalled();
      expect(collateralTypeService.addCollateralTypeToCollectionIfMissing).toHaveBeenCalledWith(
        collateralTypeCollection,
        ...additionalCollateralTypes.map(expect.objectContaining)
      );
      expect(comp.collateralTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CountySubCountyCode query and add missing value', () => {
      const collateralInformation: ICollateralInformation = { id: 456 };
      const countyCode: ICountySubCountyCode = { id: 52616 };
      collateralInformation.countyCode = countyCode;

      const countySubCountyCodeCollection: ICountySubCountyCode[] = [{ id: 59676 }];
      jest.spyOn(countySubCountyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: countySubCountyCodeCollection })));
      const additionalCountySubCountyCodes = [countyCode];
      const expectedCollection: ICountySubCountyCode[] = [...additionalCountySubCountyCodes, ...countySubCountyCodeCollection];
      jest.spyOn(countySubCountyCodeService, 'addCountySubCountyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      expect(countySubCountyCodeService.query).toHaveBeenCalled();
      expect(countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        countySubCountyCodeCollection,
        ...additionalCountySubCountyCodes.map(expect.objectContaining)
      );
      expect(comp.countySubCountyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const collateralInformation: ICollateralInformation = { id: 456 };
      const bankCode: IInstitutionCode = { id: 39046 };
      collateralInformation.bankCode = bankCode;
      const branchCode: IBankBranchCode = { id: 35142 };
      collateralInformation.branchCode = branchCode;
      const collateralType: ICollateralType = { id: 15253 };
      collateralInformation.collateralType = collateralType;
      const countyCode: ICountySubCountyCode = { id: 4461 };
      collateralInformation.countyCode = countyCode;

      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.bankBranchCodesSharedCollection).toContain(branchCode);
      expect(comp.collateralTypesSharedCollection).toContain(collateralType);
      expect(comp.countySubCountyCodesSharedCollection).toContain(countyCode);
      expect(comp.collateralInformation).toEqual(collateralInformation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICollateralInformation>>();
      const collateralInformation = { id: 123 };
      jest.spyOn(collateralInformationFormService, 'getCollateralInformation').mockReturnValue(collateralInformation);
      jest.spyOn(collateralInformationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: collateralInformation }));
      saveSubject.complete();

      // THEN
      expect(collateralInformationFormService.getCollateralInformation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(collateralInformationService.update).toHaveBeenCalledWith(expect.objectContaining(collateralInformation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICollateralInformation>>();
      const collateralInformation = { id: 123 };
      jest.spyOn(collateralInformationFormService, 'getCollateralInformation').mockReturnValue({ id: null });
      jest.spyOn(collateralInformationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ collateralInformation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: collateralInformation }));
      saveSubject.complete();

      // THEN
      expect(collateralInformationFormService.getCollateralInformation).toHaveBeenCalled();
      expect(collateralInformationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICollateralInformation>>();
      const collateralInformation = { id: 123 };
      jest.spyOn(collateralInformationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ collateralInformation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(collateralInformationService.update).toHaveBeenCalled();
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

    describe('compareCollateralType', () => {
      it('Should forward to collateralTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(collateralTypeService, 'compareCollateralType');
        comp.compareCollateralType(entity, entity2);
        expect(collateralTypeService.compareCollateralType).toHaveBeenCalledWith(entity, entity2);
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
  });
});
