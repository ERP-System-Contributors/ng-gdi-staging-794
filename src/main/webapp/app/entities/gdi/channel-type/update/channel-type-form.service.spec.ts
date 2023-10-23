import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../channel-type.test-samples';

import { ChannelTypeFormService } from './channel-type-form.service';

describe('ChannelType Form Service', () => {
  let service: ChannelTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelTypeFormService);
  });

  describe('Service methods', () => {
    describe('createChannelTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChannelTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            channelsTypeCode: expect.any(Object),
            channelTypes: expect.any(Object),
            channelTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IChannelType should create a new form with FormGroup', () => {
        const formGroup = service.createChannelTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            channelsTypeCode: expect.any(Object),
            channelTypes: expect.any(Object),
            channelTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getChannelType', () => {
      it('should return NewChannelType for default ChannelType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createChannelTypeFormGroup(sampleWithNewData);

        const channelType = service.getChannelType(formGroup) as any;

        expect(channelType).toMatchObject(sampleWithNewData);
      });

      it('should return NewChannelType for empty ChannelType initial value', () => {
        const formGroup = service.createChannelTypeFormGroup();

        const channelType = service.getChannelType(formGroup) as any;

        expect(channelType).toMatchObject({});
      });

      it('should return IChannelType', () => {
        const formGroup = service.createChannelTypeFormGroup(sampleWithRequiredData);

        const channelType = service.getChannelType(formGroup) as any;

        expect(channelType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChannelType should not enable id FormControl', () => {
        const formGroup = service.createChannelTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChannelType should disable id FormControl', () => {
        const formGroup = service.createChannelTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
