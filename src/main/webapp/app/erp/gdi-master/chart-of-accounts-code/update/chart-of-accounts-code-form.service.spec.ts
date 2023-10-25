///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chart-of-accounts-code.test-samples';

import { ChartOfAccountsCodeFormService } from './chart-of-accounts-code-form.service';

describe('ChartOfAccountsCode Form Service', () => {
  let service: ChartOfAccountsCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartOfAccountsCodeFormService);
  });

  describe('Service methods', () => {
    describe('createChartOfAccountsCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chartOfAccountsCode: expect.any(Object),
            chartOfAccountsClass: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IChartOfAccountsCode should create a new form with FormGroup', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            chartOfAccountsCode: expect.any(Object),
            chartOfAccountsClass: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getChartOfAccountsCode', () => {
      it('should return NewChartOfAccountsCode for default ChartOfAccountsCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithNewData);

        const chartOfAccountsCode = service.getChartOfAccountsCode(formGroup) as any;

        expect(chartOfAccountsCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewChartOfAccountsCode for empty ChartOfAccountsCode initial value', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup();

        const chartOfAccountsCode = service.getChartOfAccountsCode(formGroup) as any;

        expect(chartOfAccountsCode).toMatchObject({});
      });

      it('should return IChartOfAccountsCode', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithRequiredData);

        const chartOfAccountsCode = service.getChartOfAccountsCode(formGroup) as any;

        expect(chartOfAccountsCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChartOfAccountsCode should not enable id FormControl', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChartOfAccountsCode should disable id FormControl', () => {
        const formGroup = service.createChartOfAccountsCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
