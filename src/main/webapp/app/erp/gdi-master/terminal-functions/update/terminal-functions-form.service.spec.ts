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

import { sampleWithRequiredData, sampleWithNewData } from '../terminal-functions.test-samples';

import { TerminalFunctionsFormService } from './terminal-functions-form.service';

describe('TerminalFunctions Form Service', () => {
  let service: TerminalFunctionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalFunctionsFormService);
  });

  describe('Service methods', () => {
    describe('createTerminalFunctionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTerminalFunctionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            functionCode: expect.any(Object),
            terminalFunctionality: expect.any(Object),
          })
        );
      });

      it('passing ITerminalFunctions should create a new form with FormGroup', () => {
        const formGroup = service.createTerminalFunctionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            functionCode: expect.any(Object),
            terminalFunctionality: expect.any(Object),
          })
        );
      });
    });

    describe('getTerminalFunctions', () => {
      it('should return NewTerminalFunctions for default TerminalFunctions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTerminalFunctionsFormGroup(sampleWithNewData);

        const terminalFunctions = service.getTerminalFunctions(formGroup) as any;

        expect(terminalFunctions).toMatchObject(sampleWithNewData);
      });

      it('should return NewTerminalFunctions for empty TerminalFunctions initial value', () => {
        const formGroup = service.createTerminalFunctionsFormGroup();

        const terminalFunctions = service.getTerminalFunctions(formGroup) as any;

        expect(terminalFunctions).toMatchObject({});
      });

      it('should return ITerminalFunctions', () => {
        const formGroup = service.createTerminalFunctionsFormGroup(sampleWithRequiredData);

        const terminalFunctions = service.getTerminalFunctions(formGroup) as any;

        expect(terminalFunctions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITerminalFunctions should not enable id FormControl', () => {
        const formGroup = service.createTerminalFunctionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTerminalFunctions should disable id FormControl', () => {
        const formGroup = service.createTerminalFunctionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
