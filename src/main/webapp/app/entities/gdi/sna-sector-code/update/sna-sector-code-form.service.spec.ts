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

import { sampleWithRequiredData, sampleWithNewData } from '../sna-sector-code.test-samples';

import { SnaSectorCodeFormService } from './sna-sector-code-form.service';

describe('SnaSectorCode Form Service', () => {
  let service: SnaSectorCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnaSectorCodeFormService);
  });

  describe('Service methods', () => {
    describe('createSnaSectorCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSnaSectorCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sectorTypeCode: expect.any(Object),
            mainSectorCode: expect.any(Object),
            mainSectorTypeName: expect.any(Object),
            subSectorCode: expect.any(Object),
            subSectorName: expect.any(Object),
            subSubSectorCode: expect.any(Object),
            subSubSectorName: expect.any(Object),
          })
        );
      });

      it('passing ISnaSectorCode should create a new form with FormGroup', () => {
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sectorTypeCode: expect.any(Object),
            mainSectorCode: expect.any(Object),
            mainSectorTypeName: expect.any(Object),
            subSectorCode: expect.any(Object),
            subSectorName: expect.any(Object),
            subSubSectorCode: expect.any(Object),
            subSubSectorName: expect.any(Object),
          })
        );
      });
    });

    describe('getSnaSectorCode', () => {
      it('should return NewSnaSectorCode for default SnaSectorCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithNewData);

        const snaSectorCode = service.getSnaSectorCode(formGroup) as any;

        expect(snaSectorCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewSnaSectorCode for empty SnaSectorCode initial value', () => {
        const formGroup = service.createSnaSectorCodeFormGroup();

        const snaSectorCode = service.getSnaSectorCode(formGroup) as any;

        expect(snaSectorCode).toMatchObject({});
      });

      it('should return ISnaSectorCode', () => {
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithRequiredData);

        const snaSectorCode = service.getSnaSectorCode(formGroup) as any;

        expect(snaSectorCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISnaSectorCode should not enable id FormControl', () => {
        const formGroup = service.createSnaSectorCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSnaSectorCode should disable id FormControl', () => {
        const formGroup = service.createSnaSectorCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
