import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LoanRestructureItemFormService } from './loan-restructure-item-form.service';
import { LoanRestructureItemService } from '../service/loan-restructure-item.service';
import { ILoanRestructureItem } from '../loan-restructure-item.model';

import { LoanRestructureItemUpdateComponent } from './loan-restructure-item-update.component';

describe('LoanRestructureItem Management Update Component', () => {
  let comp: LoanRestructureItemUpdateComponent;
  let fixture: ComponentFixture<LoanRestructureItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loanRestructureItemFormService: LoanRestructureItemFormService;
  let loanRestructureItemService: LoanRestructureItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LoanRestructureItemUpdateComponent],
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
      .overrideTemplate(LoanRestructureItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoanRestructureItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loanRestructureItemFormService = TestBed.inject(LoanRestructureItemFormService);
    loanRestructureItemService = TestBed.inject(LoanRestructureItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loanRestructureItem: ILoanRestructureItem = { id: 456 };

      activatedRoute.data = of({ loanRestructureItem });
      comp.ngOnInit();

      expect(comp.loanRestructureItem).toEqual(loanRestructureItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRestructureItem>>();
      const loanRestructureItem = { id: 123 };
      jest.spyOn(loanRestructureItemFormService, 'getLoanRestructureItem').mockReturnValue(loanRestructureItem);
      jest.spyOn(loanRestructureItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRestructureItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanRestructureItem }));
      saveSubject.complete();

      // THEN
      expect(loanRestructureItemFormService.getLoanRestructureItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loanRestructureItemService.update).toHaveBeenCalledWith(expect.objectContaining(loanRestructureItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRestructureItem>>();
      const loanRestructureItem = { id: 123 };
      jest.spyOn(loanRestructureItemFormService, 'getLoanRestructureItem').mockReturnValue({ id: null });
      jest.spyOn(loanRestructureItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRestructureItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loanRestructureItem }));
      saveSubject.complete();

      // THEN
      expect(loanRestructureItemFormService.getLoanRestructureItem).toHaveBeenCalled();
      expect(loanRestructureItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoanRestructureItem>>();
      const loanRestructureItem = { id: 123 };
      jest.spyOn(loanRestructureItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loanRestructureItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loanRestructureItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
