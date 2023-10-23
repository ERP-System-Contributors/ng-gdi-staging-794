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

import { sampleWithRequiredData, sampleWithNewData } from '../related-party-relationship.test-samples';

import { RelatedPartyRelationshipFormService } from './related-party-relationship-form.service';

describe('RelatedPartyRelationship Form Service', () => {
  let service: RelatedPartyRelationshipFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedPartyRelationshipFormService);
  });

  describe('Service methods', () => {
    describe('createRelatedPartyRelationshipFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRelatedPartyRelationshipFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            customerId: expect.any(Object),
            relatedPartyId: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            relationshipType: expect.any(Object),
          })
        );
      });

      it('passing IRelatedPartyRelationship should create a new form with FormGroup', () => {
        const formGroup = service.createRelatedPartyRelationshipFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            customerId: expect.any(Object),
            relatedPartyId: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            relationshipType: expect.any(Object),
          })
        );
      });
    });

    describe('getRelatedPartyRelationship', () => {
      it('should return NewRelatedPartyRelationship for default RelatedPartyRelationship initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRelatedPartyRelationshipFormGroup(sampleWithNewData);

        const relatedPartyRelationship = service.getRelatedPartyRelationship(formGroup) as any;

        expect(relatedPartyRelationship).toMatchObject(sampleWithNewData);
      });

      it('should return NewRelatedPartyRelationship for empty RelatedPartyRelationship initial value', () => {
        const formGroup = service.createRelatedPartyRelationshipFormGroup();

        const relatedPartyRelationship = service.getRelatedPartyRelationship(formGroup) as any;

        expect(relatedPartyRelationship).toMatchObject({});
      });

      it('should return IRelatedPartyRelationship', () => {
        const formGroup = service.createRelatedPartyRelationshipFormGroup(sampleWithRequiredData);

        const relatedPartyRelationship = service.getRelatedPartyRelationship(formGroup) as any;

        expect(relatedPartyRelationship).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRelatedPartyRelationship should not enable id FormControl', () => {
        const formGroup = service.createRelatedPartyRelationshipFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRelatedPartyRelationship should disable id FormControl', () => {
        const formGroup = service.createRelatedPartyRelationshipFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
