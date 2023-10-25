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

import { sampleWithRequiredData, sampleWithNewData } from '../terminals-and-pos.test-samples';

import { TerminalsAndPOSFormService } from './terminals-and-pos-form.service';

describe('TerminalsAndPOS Form Service', () => {
  let service: TerminalsAndPOSFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalsAndPOSFormService);
  });

  describe('Service methods', () => {
    describe('createTerminalsAndPOSFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTerminalsAndPOSFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            terminalId: expect.any(Object),
            merchantId: expect.any(Object),
            terminalName: expect.any(Object),
            terminalLocation: expect.any(Object),
            iso6709Latitute: expect.any(Object),
            iso6709Longitude: expect.any(Object),
            terminalOpeningDate: expect.any(Object),
            terminalClosureDate: expect.any(Object),
            terminalType: expect.any(Object),
            terminalFunctionality: expect.any(Object),
            physicalLocation: expect.any(Object),
            bankId: expect.any(Object),
            branchId: expect.any(Object),
          })
        );
      });

      it('passing ITerminalsAndPOS should create a new form with FormGroup', () => {
        const formGroup = service.createTerminalsAndPOSFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            terminalId: expect.any(Object),
            merchantId: expect.any(Object),
            terminalName: expect.any(Object),
            terminalLocation: expect.any(Object),
            iso6709Latitute: expect.any(Object),
            iso6709Longitude: expect.any(Object),
            terminalOpeningDate: expect.any(Object),
            terminalClosureDate: expect.any(Object),
            terminalType: expect.any(Object),
            terminalFunctionality: expect.any(Object),
            physicalLocation: expect.any(Object),
            bankId: expect.any(Object),
            branchId: expect.any(Object),
          })
        );
      });
    });

    describe('getTerminalsAndPOS', () => {
      it('should return NewTerminalsAndPOS for default TerminalsAndPOS initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTerminalsAndPOSFormGroup(sampleWithNewData);

        const terminalsAndPOS = service.getTerminalsAndPOS(formGroup) as any;

        expect(terminalsAndPOS).toMatchObject(sampleWithNewData);
      });

      it('should return NewTerminalsAndPOS for empty TerminalsAndPOS initial value', () => {
        const formGroup = service.createTerminalsAndPOSFormGroup();

        const terminalsAndPOS = service.getTerminalsAndPOS(formGroup) as any;

        expect(terminalsAndPOS).toMatchObject({});
      });

      it('should return ITerminalsAndPOS', () => {
        const formGroup = service.createTerminalsAndPOSFormGroup(sampleWithRequiredData);

        const terminalsAndPOS = service.getTerminalsAndPOS(formGroup) as any;

        expect(terminalsAndPOS).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITerminalsAndPOS should not enable id FormControl', () => {
        const formGroup = service.createTerminalsAndPOSFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTerminalsAndPOS should disable id FormControl', () => {
        const formGroup = service.createTerminalsAndPOSFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
