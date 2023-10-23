import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ParticularsOfOutletFormService } from './particulars-of-outlet-form.service';
import { ParticularsOfOutletService } from '../service/particulars-of-outlet.service';
import { IParticularsOfOutlet } from '../particulars-of-outlet.model';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IOutletType } from 'app/entities/gdi/outlet-type/outlet-type.model';
import { OutletTypeService } from 'app/entities/gdi/outlet-type/service/outlet-type.service';
import { IOutletStatus } from 'app/entities/gdi/outlet-status/outlet-status.model';
import { OutletStatusService } from 'app/entities/gdi/outlet-status/service/outlet-status.service';

import { ParticularsOfOutletUpdateComponent } from './particulars-of-outlet-update.component';

describe('ParticularsOfOutlet Management Update Component', () => {
  let comp: ParticularsOfOutletUpdateComponent;
  let fixture: ComponentFixture<ParticularsOfOutletUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let particularsOfOutletFormService: ParticularsOfOutletFormService;
  let particularsOfOutletService: ParticularsOfOutletService;
  let countySubCountyCodeService: CountySubCountyCodeService;
  let institutionCodeService: InstitutionCodeService;
  let bankBranchCodeService: BankBranchCodeService;
  let outletTypeService: OutletTypeService;
  let outletStatusService: OutletStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ParticularsOfOutletUpdateComponent],
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
      .overrideTemplate(ParticularsOfOutletUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParticularsOfOutletUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    particularsOfOutletFormService = TestBed.inject(ParticularsOfOutletFormService);
    particularsOfOutletService = TestBed.inject(ParticularsOfOutletService);
    countySubCountyCodeService = TestBed.inject(CountySubCountyCodeService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    outletTypeService = TestBed.inject(OutletTypeService);
    outletStatusService = TestBed.inject(OutletStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CountySubCountyCode query and add missing value', () => {
      const particularsOfOutlet: IParticularsOfOutlet = { id: 456 };
      const subCountyCode: ICountySubCountyCode = { id: 63976 };
      particularsOfOutlet.subCountyCode = subCountyCode;

      const countySubCountyCodeCollection: ICountySubCountyCode[] = [{ id: 33680 }];
      jest.spyOn(countySubCountyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: countySubCountyCodeCollection })));
      const additionalCountySubCountyCodes = [subCountyCode];
      const expectedCollection: ICountySubCountyCode[] = [...additionalCountySubCountyCodes, ...countySubCountyCodeCollection];
      jest.spyOn(countySubCountyCodeService, 'addCountySubCountyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      expect(countySubCountyCodeService.query).toHaveBeenCalled();
      expect(countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        countySubCountyCodeCollection,
        ...additionalCountySubCountyCodes.map(expect.objectContaining)
      );
      expect(comp.countySubCountyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call InstitutionCode query and add missing value', () => {
      const particularsOfOutlet: IParticularsOfOutlet = { id: 456 };
      const bankCode: IInstitutionCode = { id: 70973 };
      particularsOfOutlet.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 76989 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankBranchCode query and add missing value', () => {
      const particularsOfOutlet: IParticularsOfOutlet = { id: 456 };
      const outletId: IBankBranchCode = { id: 48970 };
      particularsOfOutlet.outletId = outletId;

      const bankBranchCodeCollection: IBankBranchCode[] = [{ id: 26027 }];
      jest.spyOn(bankBranchCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankBranchCodeCollection })));
      const additionalBankBranchCodes = [outletId];
      const expectedCollection: IBankBranchCode[] = [...additionalBankBranchCodes, ...bankBranchCodeCollection];
      jest.spyOn(bankBranchCodeService, 'addBankBranchCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      expect(bankBranchCodeService.query).toHaveBeenCalled();
      expect(bankBranchCodeService.addBankBranchCodeToCollectionIfMissing).toHaveBeenCalledWith(
        bankBranchCodeCollection,
        ...additionalBankBranchCodes.map(expect.objectContaining)
      );
      expect(comp.bankBranchCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call OutletType query and add missing value', () => {
      const particularsOfOutlet: IParticularsOfOutlet = { id: 456 };
      const typeOfOutlet: IOutletType = { id: 96106 };
      particularsOfOutlet.typeOfOutlet = typeOfOutlet;

      const outletTypeCollection: IOutletType[] = [{ id: 63175 }];
      jest.spyOn(outletTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: outletTypeCollection })));
      const additionalOutletTypes = [typeOfOutlet];
      const expectedCollection: IOutletType[] = [...additionalOutletTypes, ...outletTypeCollection];
      jest.spyOn(outletTypeService, 'addOutletTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      expect(outletTypeService.query).toHaveBeenCalled();
      expect(outletTypeService.addOutletTypeToCollectionIfMissing).toHaveBeenCalledWith(
        outletTypeCollection,
        ...additionalOutletTypes.map(expect.objectContaining)
      );
      expect(comp.outletTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call OutletStatus query and add missing value', () => {
      const particularsOfOutlet: IParticularsOfOutlet = { id: 456 };
      const outletStatus: IOutletStatus = { id: 1356 };
      particularsOfOutlet.outletStatus = outletStatus;

      const outletStatusCollection: IOutletStatus[] = [{ id: 90390 }];
      jest.spyOn(outletStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: outletStatusCollection })));
      const additionalOutletStatuses = [outletStatus];
      const expectedCollection: IOutletStatus[] = [...additionalOutletStatuses, ...outletStatusCollection];
      jest.spyOn(outletStatusService, 'addOutletStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      expect(outletStatusService.query).toHaveBeenCalled();
      expect(outletStatusService.addOutletStatusToCollectionIfMissing).toHaveBeenCalledWith(
        outletStatusCollection,
        ...additionalOutletStatuses.map(expect.objectContaining)
      );
      expect(comp.outletStatusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const particularsOfOutlet: IParticularsOfOutlet = { id: 456 };
      const subCountyCode: ICountySubCountyCode = { id: 52223 };
      particularsOfOutlet.subCountyCode = subCountyCode;
      const bankCode: IInstitutionCode = { id: 52328 };
      particularsOfOutlet.bankCode = bankCode;
      const outletId: IBankBranchCode = { id: 47931 };
      particularsOfOutlet.outletId = outletId;
      const typeOfOutlet: IOutletType = { id: 85887 };
      particularsOfOutlet.typeOfOutlet = typeOfOutlet;
      const outletStatus: IOutletStatus = { id: 92708 };
      particularsOfOutlet.outletStatus = outletStatus;

      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      expect(comp.countySubCountyCodesSharedCollection).toContain(subCountyCode);
      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.bankBranchCodesSharedCollection).toContain(outletId);
      expect(comp.outletTypesSharedCollection).toContain(typeOfOutlet);
      expect(comp.outletStatusesSharedCollection).toContain(outletStatus);
      expect(comp.particularsOfOutlet).toEqual(particularsOfOutlet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParticularsOfOutlet>>();
      const particularsOfOutlet = { id: 123 };
      jest.spyOn(particularsOfOutletFormService, 'getParticularsOfOutlet').mockReturnValue(particularsOfOutlet);
      jest.spyOn(particularsOfOutletService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: particularsOfOutlet }));
      saveSubject.complete();

      // THEN
      expect(particularsOfOutletFormService.getParticularsOfOutlet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(particularsOfOutletService.update).toHaveBeenCalledWith(expect.objectContaining(particularsOfOutlet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParticularsOfOutlet>>();
      const particularsOfOutlet = { id: 123 };
      jest.spyOn(particularsOfOutletFormService, 'getParticularsOfOutlet').mockReturnValue({ id: null });
      jest.spyOn(particularsOfOutletService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ particularsOfOutlet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: particularsOfOutlet }));
      saveSubject.complete();

      // THEN
      expect(particularsOfOutletFormService.getParticularsOfOutlet).toHaveBeenCalled();
      expect(particularsOfOutletService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParticularsOfOutlet>>();
      const particularsOfOutlet = { id: 123 };
      jest.spyOn(particularsOfOutletService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ particularsOfOutlet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(particularsOfOutletService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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

    describe('compareOutletType', () => {
      it('Should forward to outletTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(outletTypeService, 'compareOutletType');
        comp.compareOutletType(entity, entity2);
        expect(outletTypeService.compareOutletType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOutletStatus', () => {
      it('Should forward to outletStatusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(outletStatusService, 'compareOutletStatus');
        comp.compareOutletStatus(entity, entity2);
        expect(outletStatusService.compareOutletStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
