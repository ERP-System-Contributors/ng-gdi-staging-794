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

import { sampleWithRequiredData, sampleWithNewData } from '../issuers-of-securities.test-samples';

import { IssuersOfSecuritiesFormService } from './issuers-of-securities-form.service';

describe('IssuersOfSecurities Form Service', () => {
  let service: IssuersOfSecuritiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuersOfSecuritiesFormService);
  });

  describe('Service methods', () => {
    describe('createIssuersOfSecuritiesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            issuerOfSecuritiesCode: expect.any(Object),
            issuerOfSecurities: expect.any(Object),
            issuerOfSecuritiesDescription: expect.any(Object),
          })
        );
      });

      it('passing IIssuersOfSecurities should create a new form with FormGroup', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            issuerOfSecuritiesCode: expect.any(Object),
            issuerOfSecurities: expect.any(Object),
            issuerOfSecuritiesDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getIssuersOfSecurities', () => {
      it('should return NewIssuersOfSecurities for default IssuersOfSecurities initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithNewData);

        const issuersOfSecurities = service.getIssuersOfSecurities(formGroup) as any;

        expect(issuersOfSecurities).toMatchObject(sampleWithNewData);
      });

      it('should return NewIssuersOfSecurities for empty IssuersOfSecurities initial value', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup();

        const issuersOfSecurities = service.getIssuersOfSecurities(formGroup) as any;

        expect(issuersOfSecurities).toMatchObject({});
      });

      it('should return IIssuersOfSecurities', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithRequiredData);

        const issuersOfSecurities = service.getIssuersOfSecurities(formGroup) as any;

        expect(issuersOfSecurities).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIssuersOfSecurities should not enable id FormControl', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIssuersOfSecurities should disable id FormControl', () => {
        const formGroup = service.createIssuersOfSecuritiesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
