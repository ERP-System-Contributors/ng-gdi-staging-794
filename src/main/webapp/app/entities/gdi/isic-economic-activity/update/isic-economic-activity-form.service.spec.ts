import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../isic-economic-activity.test-samples';

import { IsicEconomicActivityFormService } from './isic-economic-activity-form.service';

describe('IsicEconomicActivity Form Service', () => {
  let service: IsicEconomicActivityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsicEconomicActivityFormService);
  });

  describe('Service methods', () => {
    describe('createIsicEconomicActivityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIsicEconomicActivityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessEconomicActivityCode: expect.any(Object),
            section: expect.any(Object),
            sectionLabel: expect.any(Object),
            division: expect.any(Object),
            divisionLabel: expect.any(Object),
            groupCode: expect.any(Object),
            groupLabel: expect.any(Object),
            classCode: expect.any(Object),
            businessEconomicActivityType: expect.any(Object),
            businessEconomicActivityTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IIsicEconomicActivity should create a new form with FormGroup', () => {
        const formGroup = service.createIsicEconomicActivityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            businessEconomicActivityCode: expect.any(Object),
            section: expect.any(Object),
            sectionLabel: expect.any(Object),
            division: expect.any(Object),
            divisionLabel: expect.any(Object),
            groupCode: expect.any(Object),
            groupLabel: expect.any(Object),
            classCode: expect.any(Object),
            businessEconomicActivityType: expect.any(Object),
            businessEconomicActivityTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getIsicEconomicActivity', () => {
      it('should return NewIsicEconomicActivity for default IsicEconomicActivity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIsicEconomicActivityFormGroup(sampleWithNewData);

        const isicEconomicActivity = service.getIsicEconomicActivity(formGroup) as any;

        expect(isicEconomicActivity).toMatchObject(sampleWithNewData);
      });

      it('should return NewIsicEconomicActivity for empty IsicEconomicActivity initial value', () => {
        const formGroup = service.createIsicEconomicActivityFormGroup();

        const isicEconomicActivity = service.getIsicEconomicActivity(formGroup) as any;

        expect(isicEconomicActivity).toMatchObject({});
      });

      it('should return IIsicEconomicActivity', () => {
        const formGroup = service.createIsicEconomicActivityFormGroup(sampleWithRequiredData);

        const isicEconomicActivity = service.getIsicEconomicActivity(formGroup) as any;

        expect(isicEconomicActivity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIsicEconomicActivity should not enable id FormControl', () => {
        const formGroup = service.createIsicEconomicActivityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIsicEconomicActivity should disable id FormControl', () => {
        const formGroup = service.createIsicEconomicActivityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
