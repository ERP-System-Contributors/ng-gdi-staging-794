import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CreditCardOwnershipFormService } from './credit-card-ownership-form.service';
import { CreditCardOwnershipService } from '../service/credit-card-ownership.service';
import { ICreditCardOwnership } from '../credit-card-ownership.model';

import { CreditCardOwnershipUpdateComponent } from './credit-card-ownership-update.component';

describe('CreditCardOwnership Management Update Component', () => {
  let comp: CreditCardOwnershipUpdateComponent;
  let fixture: ComponentFixture<CreditCardOwnershipUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let creditCardOwnershipFormService: CreditCardOwnershipFormService;
  let creditCardOwnershipService: CreditCardOwnershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CreditCardOwnershipUpdateComponent],
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
      .overrideTemplate(CreditCardOwnershipUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CreditCardOwnershipUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    creditCardOwnershipFormService = TestBed.inject(CreditCardOwnershipFormService);
    creditCardOwnershipService = TestBed.inject(CreditCardOwnershipService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const creditCardOwnership: ICreditCardOwnership = { id: 456 };

      activatedRoute.data = of({ creditCardOwnership });
      comp.ngOnInit();

      expect(comp.creditCardOwnership).toEqual(creditCardOwnership);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditCardOwnership>>();
      const creditCardOwnership = { id: 123 };
      jest.spyOn(creditCardOwnershipFormService, 'getCreditCardOwnership').mockReturnValue(creditCardOwnership);
      jest.spyOn(creditCardOwnershipService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditCardOwnership });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: creditCardOwnership }));
      saveSubject.complete();

      // THEN
      expect(creditCardOwnershipFormService.getCreditCardOwnership).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(creditCardOwnershipService.update).toHaveBeenCalledWith(expect.objectContaining(creditCardOwnership));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditCardOwnership>>();
      const creditCardOwnership = { id: 123 };
      jest.spyOn(creditCardOwnershipFormService, 'getCreditCardOwnership').mockReturnValue({ id: null });
      jest.spyOn(creditCardOwnershipService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditCardOwnership: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: creditCardOwnership }));
      saveSubject.complete();

      // THEN
      expect(creditCardOwnershipFormService.getCreditCardOwnership).toHaveBeenCalled();
      expect(creditCardOwnershipService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditCardOwnership>>();
      const creditCardOwnership = { id: 123 };
      jest.spyOn(creditCardOwnershipService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditCardOwnership });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(creditCardOwnershipService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
