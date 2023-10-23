import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GdiTransactionDataIndexFormService } from './gdi-transaction-data-index-form.service';
import { GdiTransactionDataIndexService } from '../service/gdi-transaction-data-index.service';
import { IGdiTransactionDataIndex } from '../gdi-transaction-data-index.model';
import { IGdiMasterDataIndex } from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.model';
import { GdiMasterDataIndexService } from 'app/entities/gdi/gdi-master-data-index/service/gdi-master-data-index.service';

import { GdiTransactionDataIndexUpdateComponent } from './gdi-transaction-data-index-update.component';

describe('GdiTransactionDataIndex Management Update Component', () => {
  let comp: GdiTransactionDataIndexUpdateComponent;
  let fixture: ComponentFixture<GdiTransactionDataIndexUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gdiTransactionDataIndexFormService: GdiTransactionDataIndexFormService;
  let gdiTransactionDataIndexService: GdiTransactionDataIndexService;
  let gdiMasterDataIndexService: GdiMasterDataIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GdiTransactionDataIndexUpdateComponent],
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
      .overrideTemplate(GdiTransactionDataIndexUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GdiTransactionDataIndexUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gdiTransactionDataIndexFormService = TestBed.inject(GdiTransactionDataIndexFormService);
    gdiTransactionDataIndexService = TestBed.inject(GdiTransactionDataIndexService);
    gdiMasterDataIndexService = TestBed.inject(GdiMasterDataIndexService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GdiMasterDataIndex query and add missing value', () => {
      const gdiTransactionDataIndex: IGdiTransactionDataIndex = { id: 456 };
      const masterDataItems: IGdiMasterDataIndex[] = [{ id: 72602 }];
      gdiTransactionDataIndex.masterDataItems = masterDataItems;

      const gdiMasterDataIndexCollection: IGdiMasterDataIndex[] = [{ id: 24767 }];
      jest.spyOn(gdiMasterDataIndexService, 'query').mockReturnValue(of(new HttpResponse({ body: gdiMasterDataIndexCollection })));
      const additionalGdiMasterDataIndices = [...masterDataItems];
      const expectedCollection: IGdiMasterDataIndex[] = [...additionalGdiMasterDataIndices, ...gdiMasterDataIndexCollection];
      jest.spyOn(gdiMasterDataIndexService, 'addGdiMasterDataIndexToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ gdiTransactionDataIndex });
      comp.ngOnInit();

      expect(gdiMasterDataIndexService.query).toHaveBeenCalled();
      expect(gdiMasterDataIndexService.addGdiMasterDataIndexToCollectionIfMissing).toHaveBeenCalledWith(
        gdiMasterDataIndexCollection,
        ...additionalGdiMasterDataIndices.map(expect.objectContaining)
      );
      expect(comp.gdiMasterDataIndicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const gdiTransactionDataIndex: IGdiTransactionDataIndex = { id: 456 };
      const masterDataItem: IGdiMasterDataIndex = { id: 81067 };
      gdiTransactionDataIndex.masterDataItems = [masterDataItem];

      activatedRoute.data = of({ gdiTransactionDataIndex });
      comp.ngOnInit();

      expect(comp.gdiMasterDataIndicesSharedCollection).toContain(masterDataItem);
      expect(comp.gdiTransactionDataIndex).toEqual(gdiTransactionDataIndex);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGdiTransactionDataIndex>>();
      const gdiTransactionDataIndex = { id: 123 };
      jest.spyOn(gdiTransactionDataIndexFormService, 'getGdiTransactionDataIndex').mockReturnValue(gdiTransactionDataIndex);
      jest.spyOn(gdiTransactionDataIndexService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gdiTransactionDataIndex });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gdiTransactionDataIndex }));
      saveSubject.complete();

      // THEN
      expect(gdiTransactionDataIndexFormService.getGdiTransactionDataIndex).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(gdiTransactionDataIndexService.update).toHaveBeenCalledWith(expect.objectContaining(gdiTransactionDataIndex));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGdiTransactionDataIndex>>();
      const gdiTransactionDataIndex = { id: 123 };
      jest.spyOn(gdiTransactionDataIndexFormService, 'getGdiTransactionDataIndex').mockReturnValue({ id: null });
      jest.spyOn(gdiTransactionDataIndexService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gdiTransactionDataIndex: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gdiTransactionDataIndex }));
      saveSubject.complete();

      // THEN
      expect(gdiTransactionDataIndexFormService.getGdiTransactionDataIndex).toHaveBeenCalled();
      expect(gdiTransactionDataIndexService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGdiTransactionDataIndex>>();
      const gdiTransactionDataIndex = { id: 123 };
      jest.spyOn(gdiTransactionDataIndexService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gdiTransactionDataIndex });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gdiTransactionDataIndexService.update).toHaveBeenCalled();
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
