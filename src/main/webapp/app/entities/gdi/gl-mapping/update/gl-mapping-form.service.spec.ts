import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../gl-mapping.test-samples';

import { GlMappingFormService } from './gl-mapping-form.service';

describe('GlMapping Form Service', () => {
  let service: GlMappingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlMappingFormService);
  });

  describe('Service methods', () => {
    describe('createGlMappingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGlMappingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subGLCode: expect.any(Object),
            subGLDescription: expect.any(Object),
            mainGLCode: expect.any(Object),
            mainGLDescription: expect.any(Object),
            glType: expect.any(Object),
          })
        );
      });

      it('passing IGlMapping should create a new form with FormGroup', () => {
        const formGroup = service.createGlMappingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subGLCode: expect.any(Object),
            subGLDescription: expect.any(Object),
            mainGLCode: expect.any(Object),
            mainGLDescription: expect.any(Object),
            glType: expect.any(Object),
          })
        );
      });
    });

    describe('getGlMapping', () => {
      it('should return NewGlMapping for default GlMapping initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGlMappingFormGroup(sampleWithNewData);

        const glMapping = service.getGlMapping(formGroup) as any;

        expect(glMapping).toMatchObject(sampleWithNewData);
      });

      it('should return NewGlMapping for empty GlMapping initial value', () => {
        const formGroup = service.createGlMappingFormGroup();

        const glMapping = service.getGlMapping(formGroup) as any;

        expect(glMapping).toMatchObject({});
      });

      it('should return IGlMapping', () => {
        const formGroup = service.createGlMappingFormGroup(sampleWithRequiredData);

        const glMapping = service.getGlMapping(formGroup) as any;

        expect(glMapping).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGlMapping should not enable id FormControl', () => {
        const formGroup = service.createGlMappingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGlMapping should disable id FormControl', () => {
        const formGroup = service.createGlMappingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
