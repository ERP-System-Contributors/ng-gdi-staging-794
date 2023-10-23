import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BankTransactionTypeFormService } from './bank-transaction-type-form.service';
import { BankTransactionTypeService } from '../service/bank-transaction-type.service';
import { IBankTransactionType } from '../bank-transaction-type.model';

import { BankTransactionTypeUpdateComponent } from './bank-transaction-type-update.component';

describe('BankTransactionType Management Update Component', () => {
  let comp: BankTransactionTypeUpdateComponent;
  let fixture: ComponentFixture<BankTransactionTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bankTransactionTypeFormService: BankTransactionTypeFormService;
  let bankTransactionTypeService: BankTransactionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BankTransactionTypeUpdateComponent],
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
      .overrideTemplate(BankTransactionTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BankTransactionTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bankTransactionTypeFormService = TestBed.inject(BankTransactionTypeFormService);
    bankTransactionTypeService = TestBed.inject(BankTransactionTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const bankTransactionType: IBankTransactionType = { id: 456 };

      activatedRoute.data = of({ bankTransactionType });
      comp.ngOnInit();

      expect(comp.bankTransactionType).toEqual(bankTransactionType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankTransactionType>>();
      const bankTransactionType = { id: 123 };
      jest.spyOn(bankTransactionTypeFormService, 'getBankTransactionType').mockReturnValue(bankTransactionType);
      jest.spyOn(bankTransactionTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankTransactionType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bankTransactionType }));
      saveSubject.complete();

      // THEN
      expect(bankTransactionTypeFormService.getBankTransactionType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bankTransactionTypeService.update).toHaveBeenCalledWith(expect.objectContaining(bankTransactionType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankTransactionType>>();
      const bankTransactionType = { id: 123 };
      jest.spyOn(bankTransactionTypeFormService, 'getBankTransactionType').mockReturnValue({ id: null });
      jest.spyOn(bankTransactionTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankTransactionType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bankTransactionType }));
      saveSubject.complete();

      // THEN
      expect(bankTransactionTypeFormService.getBankTransactionType).toHaveBeenCalled();
      expect(bankTransactionTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankTransactionType>>();
      const bankTransactionType = { id: 123 };
      jest.spyOn(bankTransactionTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankTransactionType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bankTransactionTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
