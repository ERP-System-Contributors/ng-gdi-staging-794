import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContractStatusFormService } from './contract-status-form.service';
import { ContractStatusService } from '../service/contract-status.service';
import { IContractStatus } from '../contract-status.model';

import { ContractStatusUpdateComponent } from './contract-status-update.component';

describe('ContractStatus Management Update Component', () => {
  let comp: ContractStatusUpdateComponent;
  let fixture: ComponentFixture<ContractStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contractStatusFormService: ContractStatusFormService;
  let contractStatusService: ContractStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContractStatusUpdateComponent],
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
      .overrideTemplate(ContractStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContractStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contractStatusFormService = TestBed.inject(ContractStatusFormService);
    contractStatusService = TestBed.inject(ContractStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const contractStatus: IContractStatus = { id: 456 };

      activatedRoute.data = of({ contractStatus });
      comp.ngOnInit();

      expect(comp.contractStatus).toEqual(contractStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContractStatus>>();
      const contractStatus = { id: 123 };
      jest.spyOn(contractStatusFormService, 'getContractStatus').mockReturnValue(contractStatus);
      jest.spyOn(contractStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contractStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contractStatus }));
      saveSubject.complete();

      // THEN
      expect(contractStatusFormService.getContractStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contractStatusService.update).toHaveBeenCalledWith(expect.objectContaining(contractStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContractStatus>>();
      const contractStatus = { id: 123 };
      jest.spyOn(contractStatusFormService, 'getContractStatus').mockReturnValue({ id: null });
      jest.spyOn(contractStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contractStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contractStatus }));
      saveSubject.complete();

      // THEN
      expect(contractStatusFormService.getContractStatus).toHaveBeenCalled();
      expect(contractStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContractStatus>>();
      const contractStatus = { id: 123 };
      jest.spyOn(contractStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contractStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contractStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
