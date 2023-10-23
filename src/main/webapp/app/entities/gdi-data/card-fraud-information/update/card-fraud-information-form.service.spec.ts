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

import { sampleWithRequiredData, sampleWithNewData } from '../card-fraud-information.test-samples';

import { CardFraudInformationFormService } from './card-fraud-information-form.service';

describe('CardFraudInformation Form Service', () => {
  let service: CardFraudInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFraudInformationFormService);
  });

  describe('Service methods', () => {
    describe('createCardFraudInformationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardFraudInformationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfFraudIncidents: expect.any(Object),
            valueOfFraudIncedentsInLCY: expect.any(Object),
          })
        );
      });

      it('passing ICardFraudInformation should create a new form with FormGroup', () => {
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            totalNumberOfFraudIncidents: expect.any(Object),
            valueOfFraudIncedentsInLCY: expect.any(Object),
          })
        );
      });
    });

    describe('getCardFraudInformation', () => {
      it('should return NewCardFraudInformation for default CardFraudInformation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithNewData);

        const cardFraudInformation = service.getCardFraudInformation(formGroup) as any;

        expect(cardFraudInformation).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardFraudInformation for empty CardFraudInformation initial value', () => {
        const formGroup = service.createCardFraudInformationFormGroup();

        const cardFraudInformation = service.getCardFraudInformation(formGroup) as any;

        expect(cardFraudInformation).toMatchObject({});
      });

      it('should return ICardFraudInformation', () => {
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithRequiredData);

        const cardFraudInformation = service.getCardFraudInformation(formGroup) as any;

        expect(cardFraudInformation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardFraudInformation should not enable id FormControl', () => {
        const formGroup = service.createCardFraudInformationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardFraudInformation should disable id FormControl', () => {
        const formGroup = service.createCardFraudInformationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
