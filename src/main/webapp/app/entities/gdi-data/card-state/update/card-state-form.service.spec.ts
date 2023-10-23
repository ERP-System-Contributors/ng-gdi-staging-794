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

import { sampleWithRequiredData, sampleWithNewData } from '../card-state.test-samples';

import { CardStateFormService } from './card-state-form.service';

describe('CardState Form Service', () => {
  let service: CardStateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStateFormService);
  });

  describe('Service methods', () => {
    describe('createCardStateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardStateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStateFlag: expect.any(Object),
            cardStateFlagDetails: expect.any(Object),
            cardStateFlagDescription: expect.any(Object),
          })
        );
      });

      it('passing ICardState should create a new form with FormGroup', () => {
        const formGroup = service.createCardStateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cardStateFlag: expect.any(Object),
            cardStateFlagDetails: expect.any(Object),
            cardStateFlagDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCardState', () => {
      it('should return NewCardState for default CardState initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardStateFormGroup(sampleWithNewData);

        const cardState = service.getCardState(formGroup) as any;

        expect(cardState).toMatchObject(sampleWithNewData);
      });

      it('should return NewCardState for empty CardState initial value', () => {
        const formGroup = service.createCardStateFormGroup();

        const cardState = service.getCardState(formGroup) as any;

        expect(cardState).toMatchObject({});
      });

      it('should return ICardState', () => {
        const formGroup = service.createCardStateFormGroup(sampleWithRequiredData);

        const cardState = service.getCardState(formGroup) as any;

        expect(cardState).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICardState should not enable id FormControl', () => {
        const formGroup = service.createCardStateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCardState should disable id FormControl', () => {
        const formGroup = service.createCardStateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
