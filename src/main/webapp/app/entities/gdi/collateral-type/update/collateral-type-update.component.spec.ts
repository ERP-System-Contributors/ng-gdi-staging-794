import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CollateralTypeFormService } from './collateral-type-form.service';
import { CollateralTypeService } from '../service/collateral-type.service';
import { ICollateralType } from '../collateral-type.model';

import { CollateralTypeUpdateComponent } from './collateral-type-update.component';

describe('CollateralType Management Update Component', () => {
  let comp: CollateralTypeUpdateComponent;
  let fixture: ComponentFixture<CollateralTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let collateralTypeFormService: CollateralTypeFormService;
  let collateralTypeService: CollateralTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CollateralTypeUpdateComponent],
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
      .overrideTemplate(CollateralTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CollateralTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    collateralTypeFormService = TestBed.inject(CollateralTypeFormService);
    collateralTypeService = TestBed.inject(CollateralTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const collateralType: ICollateralType = { id: 456 };

      activatedRoute.data = of({ collateralType });
      comp.ngOnInit();

      expect(comp.collateralType).toEqual(collateralType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICollateralType>>();
      const collateralType = { id: 123 };
      jest.spyOn(collateralTypeFormService, 'getCollateralType').mockReturnValue(collateralType);
      jest.spyOn(collateralTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ collateralType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: collateralType }));
      saveSubject.complete();

      // THEN
      expect(collateralTypeFormService.getCollateralType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(collateralTypeService.update).toHaveBeenCalledWith(expect.objectContaining(collateralType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICollateralType>>();
      const collateralType = { id: 123 };
      jest.spyOn(collateralTypeFormService, 'getCollateralType').mockReturnValue({ id: null });
      jest.spyOn(collateralTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ collateralType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: collateralType }));
      saveSubject.complete();

      // THEN
      expect(collateralTypeFormService.getCollateralType).toHaveBeenCalled();
      expect(collateralTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICollateralType>>();
      const collateralType = { id: 123 };
      jest.spyOn(collateralTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ collateralType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(collateralTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
