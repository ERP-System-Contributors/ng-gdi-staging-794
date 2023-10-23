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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-report-view-band.test-samples';

import { CrbReportViewBandFormService } from './crb-report-view-band-form.service';

describe('CrbReportViewBand Form Service', () => {
  let service: CrbReportViewBandFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbReportViewBandFormService);
  });

  describe('Service methods', () => {
    describe('createCrbReportViewBandFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbReportViewBandFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportViewCode: expect.any(Object),
            reportViewCategory: expect.any(Object),
            reportViewCategoryDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbReportViewBand should create a new form with FormGroup', () => {
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportViewCode: expect.any(Object),
            reportViewCategory: expect.any(Object),
            reportViewCategoryDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbReportViewBand', () => {
      it('should return NewCrbReportViewBand for default CrbReportViewBand initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithNewData);

        const crbReportViewBand = service.getCrbReportViewBand(formGroup) as any;

        expect(crbReportViewBand).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbReportViewBand for empty CrbReportViewBand initial value', () => {
        const formGroup = service.createCrbReportViewBandFormGroup();

        const crbReportViewBand = service.getCrbReportViewBand(formGroup) as any;

        expect(crbReportViewBand).toMatchObject({});
      });

      it('should return ICrbReportViewBand', () => {
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithRequiredData);

        const crbReportViewBand = service.getCrbReportViewBand(formGroup) as any;

        expect(crbReportViewBand).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbReportViewBand should not enable id FormControl', () => {
        const formGroup = service.createCrbReportViewBandFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbReportViewBand should disable id FormControl', () => {
        const formGroup = service.createCrbReportViewBandFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
