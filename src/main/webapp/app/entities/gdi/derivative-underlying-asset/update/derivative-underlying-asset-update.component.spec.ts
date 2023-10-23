import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DerivativeUnderlyingAssetFormService } from './derivative-underlying-asset-form.service';
import { DerivativeUnderlyingAssetService } from '../service/derivative-underlying-asset.service';
import { IDerivativeUnderlyingAsset } from '../derivative-underlying-asset.model';

import { DerivativeUnderlyingAssetUpdateComponent } from './derivative-underlying-asset-update.component';

describe('DerivativeUnderlyingAsset Management Update Component', () => {
  let comp: DerivativeUnderlyingAssetUpdateComponent;
  let fixture: ComponentFixture<DerivativeUnderlyingAssetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let derivativeUnderlyingAssetFormService: DerivativeUnderlyingAssetFormService;
  let derivativeUnderlyingAssetService: DerivativeUnderlyingAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DerivativeUnderlyingAssetUpdateComponent],
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
      .overrideTemplate(DerivativeUnderlyingAssetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DerivativeUnderlyingAssetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    derivativeUnderlyingAssetFormService = TestBed.inject(DerivativeUnderlyingAssetFormService);
    derivativeUnderlyingAssetService = TestBed.inject(DerivativeUnderlyingAssetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const derivativeUnderlyingAsset: IDerivativeUnderlyingAsset = { id: 456 };

      activatedRoute.data = of({ derivativeUnderlyingAsset });
      comp.ngOnInit();

      expect(comp.derivativeUnderlyingAsset).toEqual(derivativeUnderlyingAsset);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDerivativeUnderlyingAsset>>();
      const derivativeUnderlyingAsset = { id: 123 };
      jest.spyOn(derivativeUnderlyingAssetFormService, 'getDerivativeUnderlyingAsset').mockReturnValue(derivativeUnderlyingAsset);
      jest.spyOn(derivativeUnderlyingAssetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ derivativeUnderlyingAsset });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: derivativeUnderlyingAsset }));
      saveSubject.complete();

      // THEN
      expect(derivativeUnderlyingAssetFormService.getDerivativeUnderlyingAsset).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(derivativeUnderlyingAssetService.update).toHaveBeenCalledWith(expect.objectContaining(derivativeUnderlyingAsset));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDerivativeUnderlyingAsset>>();
      const derivativeUnderlyingAsset = { id: 123 };
      jest.spyOn(derivativeUnderlyingAssetFormService, 'getDerivativeUnderlyingAsset').mockReturnValue({ id: null });
      jest.spyOn(derivativeUnderlyingAssetService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ derivativeUnderlyingAsset: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: derivativeUnderlyingAsset }));
      saveSubject.complete();

      // THEN
      expect(derivativeUnderlyingAssetFormService.getDerivativeUnderlyingAsset).toHaveBeenCalled();
      expect(derivativeUnderlyingAssetService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDerivativeUnderlyingAsset>>();
      const derivativeUnderlyingAsset = { id: 123 };
      jest.spyOn(derivativeUnderlyingAssetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ derivativeUnderlyingAsset });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(derivativeUnderlyingAssetService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
