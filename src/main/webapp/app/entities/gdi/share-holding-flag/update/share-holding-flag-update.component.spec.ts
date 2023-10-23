import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ShareHoldingFlagFormService } from './share-holding-flag-form.service';
import { ShareHoldingFlagService } from '../service/share-holding-flag.service';
import { IShareHoldingFlag } from '../share-holding-flag.model';

import { ShareHoldingFlagUpdateComponent } from './share-holding-flag-update.component';

describe('ShareHoldingFlag Management Update Component', () => {
  let comp: ShareHoldingFlagUpdateComponent;
  let fixture: ComponentFixture<ShareHoldingFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shareHoldingFlagFormService: ShareHoldingFlagFormService;
  let shareHoldingFlagService: ShareHoldingFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ShareHoldingFlagUpdateComponent],
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
      .overrideTemplate(ShareHoldingFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShareHoldingFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shareHoldingFlagFormService = TestBed.inject(ShareHoldingFlagFormService);
    shareHoldingFlagService = TestBed.inject(ShareHoldingFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shareHoldingFlag: IShareHoldingFlag = { id: 456 };

      activatedRoute.data = of({ shareHoldingFlag });
      comp.ngOnInit();

      expect(comp.shareHoldingFlag).toEqual(shareHoldingFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShareHoldingFlag>>();
      const shareHoldingFlag = { id: 123 };
      jest.spyOn(shareHoldingFlagFormService, 'getShareHoldingFlag').mockReturnValue(shareHoldingFlag);
      jest.spyOn(shareHoldingFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shareHoldingFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shareHoldingFlag }));
      saveSubject.complete();

      // THEN
      expect(shareHoldingFlagFormService.getShareHoldingFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(shareHoldingFlagService.update).toHaveBeenCalledWith(expect.objectContaining(shareHoldingFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShareHoldingFlag>>();
      const shareHoldingFlag = { id: 123 };
      jest.spyOn(shareHoldingFlagFormService, 'getShareHoldingFlag').mockReturnValue({ id: null });
      jest.spyOn(shareHoldingFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shareHoldingFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shareHoldingFlag }));
      saveSubject.complete();

      // THEN
      expect(shareHoldingFlagFormService.getShareHoldingFlag).toHaveBeenCalled();
      expect(shareHoldingFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShareHoldingFlag>>();
      const shareHoldingFlag = { id: 123 };
      jest.spyOn(shareHoldingFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shareHoldingFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shareHoldingFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
