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

import { sampleWithRequiredData, sampleWithNewData } from '../performance-of-foreign-subsidiaries.test-samples';

import { PerformanceOfForeignSubsidiariesFormService } from './performance-of-foreign-subsidiaries-form.service';

describe('PerformanceOfForeignSubsidiaries Form Service', () => {
  let service: PerformanceOfForeignSubsidiariesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceOfForeignSubsidiariesFormService);
  });

  describe('Service methods', () => {
    describe('createPerformanceOfForeignSubsidiariesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subsidiaryName: expect.any(Object),
            reportingDate: expect.any(Object),
            subsidiaryId: expect.any(Object),
            grossLoansAmount: expect.any(Object),
            grossNPALoanAmount: expect.any(Object),
            grossAssetsAmount: expect.any(Object),
            grossDepositsAmount: expect.any(Object),
            profitBeforeTax: expect.any(Object),
            totalCapitalAdequacyRatio: expect.any(Object),
            liquidityRatio: expect.any(Object),
            generalProvisions: expect.any(Object),
            specificProvisions: expect.any(Object),
            interestInSuspenseAmount: expect.any(Object),
            totalNumberOfStaff: expect.any(Object),
            numberOfBranches: expect.any(Object),
            bankCode: expect.any(Object),
            subsidiaryCountryCode: expect.any(Object),
          })
        );
      });

      it('passing IPerformanceOfForeignSubsidiaries should create a new form with FormGroup', () => {
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subsidiaryName: expect.any(Object),
            reportingDate: expect.any(Object),
            subsidiaryId: expect.any(Object),
            grossLoansAmount: expect.any(Object),
            grossNPALoanAmount: expect.any(Object),
            grossAssetsAmount: expect.any(Object),
            grossDepositsAmount: expect.any(Object),
            profitBeforeTax: expect.any(Object),
            totalCapitalAdequacyRatio: expect.any(Object),
            liquidityRatio: expect.any(Object),
            generalProvisions: expect.any(Object),
            specificProvisions: expect.any(Object),
            interestInSuspenseAmount: expect.any(Object),
            totalNumberOfStaff: expect.any(Object),
            numberOfBranches: expect.any(Object),
            bankCode: expect.any(Object),
            subsidiaryCountryCode: expect.any(Object),
          })
        );
      });
    });

    describe('getPerformanceOfForeignSubsidiaries', () => {
      it('should return NewPerformanceOfForeignSubsidiaries for default PerformanceOfForeignSubsidiaries initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup(sampleWithNewData);

        const performanceOfForeignSubsidiaries = service.getPerformanceOfForeignSubsidiaries(formGroup) as any;

        expect(performanceOfForeignSubsidiaries).toMatchObject(sampleWithNewData);
      });

      it('should return NewPerformanceOfForeignSubsidiaries for empty PerformanceOfForeignSubsidiaries initial value', () => {
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup();

        const performanceOfForeignSubsidiaries = service.getPerformanceOfForeignSubsidiaries(formGroup) as any;

        expect(performanceOfForeignSubsidiaries).toMatchObject({});
      });

      it('should return IPerformanceOfForeignSubsidiaries', () => {
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup(sampleWithRequiredData);

        const performanceOfForeignSubsidiaries = service.getPerformanceOfForeignSubsidiaries(formGroup) as any;

        expect(performanceOfForeignSubsidiaries).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPerformanceOfForeignSubsidiaries should not enable id FormControl', () => {
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPerformanceOfForeignSubsidiaries should disable id FormControl', () => {
        const formGroup = service.createPerformanceOfForeignSubsidiariesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
