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

import { sampleWithRequiredData, sampleWithNewData } from '../card-status-flag.test-samples';

import { CardStatusFlagFormService } from './card-status-flag-form.service';

describe('CardStatusFlag Form Service', () => {
  let service: CardStatusFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStatusFlagFormService);
  });

  describe('Service methods', () => {
    describe('createCardStatusFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardStatusFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStatusFlag: expect.any(Object),
            cardStatusFlagDescription: expect.any(Object),
            cardStatusFlagDetails: expect.any(Object),
          })
        );
      });

      it('passing ICardStatusFlag should create a new form with FormGroup', () => {
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStatusFlag: expect.any(Object),
            cardStatusFlagDescription: expect.any(Object),
            cardStatusFlagDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCardStatusFlag', () => {
      it('should return NewCardStatusFlag for default CardStatusFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithNewData);

        const cardStatusFlag = service.getCardStatusFlag(formGroup) as any;

        expect(cardStatusFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardStatusFlag for empty CardStatusFlag initial value', () => {
        const formGroup = service.createCardStatusFlagFormGroup();

        const cardStatusFlag = service.getCardStatusFlag(formGroup) as any;

        expect(cardStatusFlag).toMatchObject({});
      });

      it('should return ICardStatusFlag', () => {
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithRequiredData);

        const cardStatusFlag = service.getCardStatusFlag(formGroup) as any;

        expect(cardStatusFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardStatusFlag should not enable id FormControl', () => {
        const formGroup = service.createCardStatusFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardStatusFlag should disable id FormControl', () => {
        const formGroup = service.createCardStatusFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
