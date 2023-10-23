import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../committee-type.test-samples';

import { CommitteeTypeFormService } from './committee-type-form.service';

describe('CommitteeType Form Service', () => {
  let service: CommitteeTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCommitteeTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommitteeTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            committeeTypeCode: expect.any(Object),
            committeeType: expect.any(Object),
            committeeTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICommitteeType should create a new form with FormGroup', () => {
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            committeeTypeCode: expect.any(Object),
            committeeType: expect.any(Object),
            committeeTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCommitteeType', () => {
      it('should return NewCommitteeType for default CommitteeType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithNewData);

        const committeeType = service.getCommitteeType(formGroup) as any;

        expect(committeeType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommitteeType for empty CommitteeType initial value', () => {
        const formGroup = service.createCommitteeTypeFormGroup();

        const committeeType = service.getCommitteeType(formGroup) as any;

        expect(committeeType).toMatchObject({});
      });

      it('should return ICommitteeType', () => {
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithRequiredData);

        const committeeType = service.getCommitteeType(formGroup) as any;

        expect(committeeType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommitteeType should not enable id FormControl', () => {
        const formGroup = service.createCommitteeTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommitteeType should disable id FormControl', () => {
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
