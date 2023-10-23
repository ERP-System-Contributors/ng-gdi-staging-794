import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccountAttributeMetadataFormService } from './account-attribute-metadata-form.service';
import { AccountAttributeMetadataService } from '../service/account-attribute-metadata.service';
import { IAccountAttributeMetadata } from '../account-attribute-metadata.model';
import { IGdiMasterDataIndex } from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.model';
import { GdiMasterDataIndexService } from 'app/entities/gdi/gdi-master-data-index/service/gdi-master-data-index.service';

import { AccountAttributeMetadataUpdateComponent } from './account-attribute-metadata-update.component';

describe('AccountAttributeMetadata Management Update Component', () => {
  let comp: AccountAttributeMetadataUpdateComponent;
  let fixture: ComponentFixture<AccountAttributeMetadataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountAttributeMetadataFormService: AccountAttributeMetadataFormService;
  let accountAttributeMetadataService: AccountAttributeMetadataService;
  let gdiMasterDataIndexService: GdiMasterDataIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccountAttributeMetadataUpdateComponent],
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
      .overrideTemplate(AccountAttributeMetadataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountAttributeMetadataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountAttributeMetadataFormService = TestBed.inject(AccountAttributeMetadataFormService);
    accountAttributeMetadataService = TestBed.inject(AccountAttributeMetadataService);
    gdiMasterDataIndexService = TestBed.inject(GdiMasterDataIndexService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GdiMasterDataIndex query and add missing value', () => {
      const accountAttributeMetadata: IAccountAttributeMetadata = { id: 456 };
      const standardInputTemplate: IGdiMasterDataIndex = { id: 12415 };
      accountAttributeMetadata.standardInputTemplate = standardInputTemplate;

      const gdiMasterDataIndexCollection: IGdiMasterDataIndex[] = [{ id: 19138 }];
      jest.spyOn(gdiMasterDataIndexService, 'query').mockReturnValue(of(new HttpResponse({ body: gdiMasterDataIndexCollection })));
      const additionalGdiMasterDataIndices = [standardInputTemplate];
      const expectedCollection: IGdiMasterDataIndex[] = [...additionalGdiMasterDataIndices, ...gdiMasterDataIndexCollection];
      jest.spyOn(gdiMasterDataIndexService, 'addGdiMasterDataIndexToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountAttributeMetadata });
      comp.ngOnInit();

      expect(gdiMasterDataIndexService.query).toHaveBeenCalled();
      expect(gdiMasterDataIndexService.addGdiMasterDataIndexToCollectionIfMissing).toHaveBeenCalledWith(
        gdiMasterDataIndexCollection,
        ...additionalGdiMasterDataIndices.map(expect.objectContaining)
      );
      expect(comp.gdiMasterDataIndicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const accountAttributeMetadata: IAccountAttributeMetadata = { id: 456 };
      const standardInputTemplate: IGdiMasterDataIndex = { id: 93126 };
      accountAttributeMetadata.standardInputTemplate = standardInputTemplate;

      activatedRoute.data = of({ accountAttributeMetadata });
      comp.ngOnInit();

      expect(comp.gdiMasterDataIndicesSharedCollection).toContain(standardInputTemplate);
      expect(comp.accountAttributeMetadata).toEqual(accountAttributeMetadata);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountAttributeMetadata>>();
      const accountAttributeMetadata = { id: 123 };
      jest.spyOn(accountAttributeMetadataFormService, 'getAccountAttributeMetadata').mockReturnValue(accountAttributeMetadata);
      jest.spyOn(accountAttributeMetadataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountAttributeMetadata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountAttributeMetadata }));
      saveSubject.complete();

      // THEN
      expect(accountAttributeMetadataFormService.getAccountAttributeMetadata).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountAttributeMetadataService.update).toHaveBeenCalledWith(expect.objectContaining(accountAttributeMetadata));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountAttributeMetadata>>();
      const accountAttributeMetadata = { id: 123 };
      jest.spyOn(accountAttributeMetadataFormService, 'getAccountAttributeMetadata').mockReturnValue({ id: null });
      jest.spyOn(accountAttributeMetadataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountAttributeMetadata: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountAttributeMetadata }));
      saveSubject.complete();

      // THEN
      expect(accountAttributeMetadataFormService.getAccountAttributeMetadata).toHaveBeenCalled();
      expect(accountAttributeMetadataService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountAttributeMetadata>>();
      const accountAttributeMetadata = { id: 123 };
      jest.spyOn(accountAttributeMetadataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountAttributeMetadata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountAttributeMetadataService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGdiMasterDataIndex', () => {
      it('Should forward to gdiMasterDataIndexService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(gdiMasterDataIndexService, 'compareGdiMasterDataIndex');
        comp.compareGdiMasterDataIndex(entity, entity2);
        expect(gdiMasterDataIndexService.compareGdiMasterDataIndex).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
