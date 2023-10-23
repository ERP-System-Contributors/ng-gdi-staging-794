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
