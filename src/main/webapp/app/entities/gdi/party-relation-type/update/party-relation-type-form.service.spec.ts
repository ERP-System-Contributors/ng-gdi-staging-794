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
