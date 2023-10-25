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

import { sampleWithRequiredData, sampleWithNewData } from '../reasons-for-bounced-cheque.test-samples';

import { ReasonsForBouncedChequeFormService } from './reasons-for-bounced-cheque-form.service';

describe('ReasonsForBouncedCheque Form Service', () => {
  let service: ReasonsForBouncedChequeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonsForBouncedChequeFormService);
  });

  describe('Service methods', () => {
    describe('createReasonsForBouncedChequeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReasonsForBouncedChequeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bouncedChequeReasonsTypeCode: expect.any(Object),
            bouncedChequeReasonsType: expect.any(Object),
          })
        );
      });

      it('passing IReasonsForBouncedCheque should create a new form with FormGroup', () => {
        const formGroup = service.createReasonsForBouncedChequeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bouncedChequeReasonsTypeCode: expect.any(Object),
            bouncedChequeReasonsType: expect.any(Object),
          })
        );
      });
    });

    describe('getReasonsForBouncedCheque', () => {
      it('should return NewReasonsForBouncedCheque for default ReasonsForBouncedCheque initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReasonsForBouncedChequeFormGroup(sampleWithNewData);

        const reasonsForBouncedCheque = service.getReasonsForBouncedCheque(formGroup) as any;

        expect(reasonsForBouncedCheque).toMatchObject(sampleWithNewData);
      });

      it('should return NewReasonsForBouncedCheque for empty ReasonsForBouncedCheque initial value', () => {
        const formGroup = service.createReasonsForBouncedChequeFormGroup();

        const reasonsForBouncedCheque = service.getReasonsForBouncedCheque(formGroup) as any;

        expect(reasonsForBouncedCheque).toMatchObject({});
      });

      it('should return IReasonsForBouncedCheque', () => {
        const formGroup = service.createReasonsForBouncedChequeFormGroup(sampleWithRequiredData);

        const reasonsForBouncedCheque = service.getReasonsForBouncedCheque(formGroup) as any;

        expect(reasonsForBouncedCheque).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReasonsForBouncedCheque should not enable id FormControl', () => {
        const formGroup = service.createReasonsForBouncedChequeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReasonsForBouncedCheque should disable id FormControl', () => {
        const formGroup = service.createReasonsForBouncedChequeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
