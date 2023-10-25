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

import { sampleWithRequiredData, sampleWithNewData } from '../party-relation-type.test-samples';

import { PartyRelationTypeFormService } from './party-relation-type-form.service';

describe('PartyRelationType Form Service', () => {
  let service: PartyRelationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyRelationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createPartyRelationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPartyRelationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            partyRelationTypeCode: expect.any(Object),
            partyRelationType: expect.any(Object),
            partyRelationTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IPartyRelationType should create a new form with FormGroup', () => {
        const formGroup = service.createPartyRelationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            partyRelationTypeCode: expect.any(Object),
            partyRelationType: expect.any(Object),
            partyRelationTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getPartyRelationType', () => {
      it('should return NewPartyRelationType for default PartyRelationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPartyRelationTypeFormGroup(sampleWithNewData);

        const partyRelationType = service.getPartyRelationType(formGroup) as any;

        expect(partyRelationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewPartyRelationType for empty PartyRelationType initial value', () => {
        const formGroup = service.createPartyRelationTypeFormGroup();

        const partyRelationType = service.getPartyRelationType(formGroup) as any;

        expect(partyRelationType).toMatchObject({});
      });

      it('should return IPartyRelationType', () => {
        const formGroup = service.createPartyRelationTypeFormGroup(sampleWithRequiredData);

        const partyRelationType = service.getPartyRelationType(formGroup) as any;

        expect(partyRelationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPartyRelationType should not enable id FormControl', () => {
        const formGroup = service.createPartyRelationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPartyRelationType should disable id FormControl', () => {
        const formGroup = service.createPartyRelationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
