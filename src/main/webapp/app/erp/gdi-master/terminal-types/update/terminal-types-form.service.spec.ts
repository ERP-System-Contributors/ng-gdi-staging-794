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

import { sampleWithRequiredData, sampleWithNewData } from '../terminal-types.test-samples';

import { TerminalTypesFormService } from './terminal-types-form.service';

describe('TerminalTypes Form Service', () => {
  let service: TerminalTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalTypesFormService);
  });

  describe('Service methods', () => {
    describe('createTerminalTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTerminalTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            txnTerminalTypeCode: expect.any(Object),
            txnChannelType: expect.any(Object),
            txnChannelTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ITerminalTypes should create a new form with FormGroup', () => {
        const formGroup = service.createTerminalTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            txnTerminalTypeCode: expect.any(Object),
            txnChannelType: expect.any(Object),
            txnChannelTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getTerminalTypes', () => {
      it('should return NewTerminalTypes for default TerminalTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTerminalTypesFormGroup(sampleWithNewData);

        const terminalTypes = service.getTerminalTypes(formGroup) as any;

        expect(terminalTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewTerminalTypes for empty TerminalTypes initial value', () => {
        const formGroup = service.createTerminalTypesFormGroup();

        const terminalTypes = service.getTerminalTypes(formGroup) as any;

        expect(terminalTypes).toMatchObject({});
      });

      it('should return ITerminalTypes', () => {
        const formGroup = service.createTerminalTypesFormGroup(sampleWithRequiredData);

        const terminalTypes = service.getTerminalTypes(formGroup) as any;

        expect(terminalTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITerminalTypes should not enable id FormControl', () => {
        const formGroup = service.createTerminalTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTerminalTypes should disable id FormControl', () => {
        const formGroup = service.createTerminalTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
