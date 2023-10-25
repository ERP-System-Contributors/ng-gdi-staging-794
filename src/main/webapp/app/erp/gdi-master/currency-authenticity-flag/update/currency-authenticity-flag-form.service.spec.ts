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

import { sampleWithRequiredData, sampleWithNewData } from '../currency-authenticity-flag.test-samples';

import { CurrencyAuthenticityFlagFormService } from './currency-authenticity-flag-form.service';

describe('CurrencyAuthenticityFlag Form Service', () => {
  let service: CurrencyAuthenticityFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyAuthenticityFlagFormService);
  });

  describe('Service methods', () => {
    describe('createCurrencyAuthenticityFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyAuthenticityFlag: expect.any(Object),
            currencyAuthenticityType: expect.any(Object),
            currencyAuthenticityTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICurrencyAuthenticityFlag should create a new form with FormGroup', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            currencyAuthenticityFlag: expect.any(Object),
            currencyAuthenticityType: expect.any(Object),
            currencyAuthenticityTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCurrencyAuthenticityFlag', () => {
      it('should return NewCurrencyAuthenticityFlag for default CurrencyAuthenticityFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithNewData);

        const currencyAuthenticityFlag = service.getCurrencyAuthenticityFlag(formGroup) as any;

        expect(currencyAuthenticityFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCurrencyAuthenticityFlag for empty CurrencyAuthenticityFlag initial value', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup();

        const currencyAuthenticityFlag = service.getCurrencyAuthenticityFlag(formGroup) as any;

        expect(currencyAuthenticityFlag).toMatchObject({});
      });

      it('should return ICurrencyAuthenticityFlag', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithRequiredData);

        const currencyAuthenticityFlag = service.getCurrencyAuthenticityFlag(formGroup) as any;

        expect(currencyAuthenticityFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICurrencyAuthenticityFlag should not enable id FormControl', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCurrencyAuthenticityFlag should disable id FormControl', () => {
        const formGroup = service.createCurrencyAuthenticityFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
