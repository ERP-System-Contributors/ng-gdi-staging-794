import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChartOfAccountsCodeFormService } from './chart-of-accounts-code-form.service';
import { ChartOfAccountsCodeService } from '../service/chart-of-accounts-code.service';
import { IChartOfAccountsCode } from '../chart-of-accounts-code.model';

import { ChartOfAccountsCodeUpdateComponent } from './chart-of-accounts-code-update.component';

describe('ChartOfAccountsCode Management Update Component', () => {
  let comp: ChartOfAccountsCodeUpdateComponent;
  let fixture: ComponentFixture<ChartOfAccountsCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chartOfAccountsCodeFormService: ChartOfAccountsCodeFormService;
  let chartOfAccountsCodeService: ChartOfAccountsCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChartOfAccountsCodeUpdateComponent],
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
      .overrideTemplate(ChartOfAccountsCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChartOfAccountsCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chartOfAccountsCodeFormService = TestBed.inject(ChartOfAccountsCodeFormService);
    chartOfAccountsCodeService = TestBed.inject(ChartOfAccountsCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const chartOfAccountsCode: IChartOfAccountsCode = { id: 456 };

      activatedRoute.data = of({ chartOfAccountsCode });
      comp.ngOnInit();

      expect(comp.chartOfAccountsCode).toEqual(chartOfAccountsCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChartOfAccountsCode>>();
      const chartOfAccountsCode = { id: 123 };
      jest.spyOn(chartOfAccountsCodeFormService, 'getChartOfAccountsCode').mockReturnValue(chartOfAccountsCode);
      jest.spyOn(chartOfAccountsCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chartOfAccountsCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chartOfAccountsCode }));
      saveSubject.complete();

      // THEN
      expect(chartOfAccountsCodeFormService.getChartOfAccountsCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chartOfAccountsCodeService.update).toHaveBeenCalledWith(expect.objectContaining(chartOfAccountsCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChartOfAccountsCode>>();
      const chartOfAccountsCode = { id: 123 };
      jest.spyOn(chartOfAccountsCodeFormService, 'getChartOfAccountsCode').mockReturnValue({ id: null });
      jest.spyOn(chartOfAccountsCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chartOfAccountsCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chartOfAccountsCode }));
      saveSubject.complete();

      // THEN
      expect(chartOfAccountsCodeFormService.getChartOfAccountsCode).toHaveBeenCalled();
      expect(chartOfAccountsCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChartOfAccountsCode>>();
      const chartOfAccountsCode = { id: 123 };
      jest.spyOn(chartOfAccountsCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chartOfAccountsCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chartOfAccountsCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
