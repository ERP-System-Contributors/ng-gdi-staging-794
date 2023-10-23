import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITerminalsAndPOS } from '../terminals-and-pos.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../terminals-and-pos.test-samples';

import { TerminalsAndPOSService, RestTerminalsAndPOS } from './terminals-and-pos.service';

const requireRestSample: RestTerminalsAndPOS = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
  terminalOpeningDate: sampleWithRequiredData.terminalOpeningDate?.format(DATE_FORMAT),
  terminalClosureDate: sampleWithRequiredData.terminalClosureDate?.format(DATE_FORMAT),
};

describe('TerminalsAndPOS Service', () => {
  let service: TerminalsAndPOSService;
  let httpMock: HttpTestingController;
  let expectedResult: ITerminalsAndPOS | ITerminalsAndPOS[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerminalsAndPOSService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TerminalsAndPOS', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const terminalsAndPOS = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(terminalsAndPOS).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TerminalsAndPOS', () => {
      const terminalsAndPOS = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(terminalsAndPOS).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TerminalsAndPOS', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TerminalsAndPOS', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TerminalsAndPOS', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTerminalsAndPOSToCollectionIfMissing', () => {
      it('should add a TerminalsAndPOS to an empty array', () => {
        const terminalsAndPOS: ITerminalsAndPOS = sampleWithRequiredData;
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing([], terminalsAndPOS);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terminalsAndPOS);
      });

      it('should not add a TerminalsAndPOS to an array that contains it', () => {
        const terminalsAndPOS: ITerminalsAndPOS = sampleWithRequiredData;
        const terminalsAndPOSCollection: ITerminalsAndPOS[] = [
          {
            ...terminalsAndPOS,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing(terminalsAndPOSCollection, terminalsAndPOS);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TerminalsAndPOS to an array that doesn't contain it", () => {
        const terminalsAndPOS: ITerminalsAndPOS = sampleWithRequiredData;
        const terminalsAndPOSCollection: ITerminalsAndPOS[] = [sampleWithPartialData];
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing(terminalsAndPOSCollection, terminalsAndPOS);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terminalsAndPOS);
      });

      it('should add only unique TerminalsAndPOS to an array', () => {
        const terminalsAndPOSArray: ITerminalsAndPOS[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const terminalsAndPOSCollection: ITerminalsAndPOS[] = [sampleWithRequiredData];
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing(terminalsAndPOSCollection, ...terminalsAndPOSArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const terminalsAndPOS: ITerminalsAndPOS = sampleWithRequiredData;
        const terminalsAndPOS2: ITerminalsAndPOS = sampleWithPartialData;
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing([], terminalsAndPOS, terminalsAndPOS2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terminalsAndPOS);
        expect(expectedResult).toContain(terminalsAndPOS2);
      });

      it('should accept null and undefined values', () => {
        const terminalsAndPOS: ITerminalsAndPOS = sampleWithRequiredData;
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing([], null, terminalsAndPOS, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terminalsAndPOS);
      });

      it('should return initial array if no TerminalsAndPOS is added', () => {
        const terminalsAndPOSCollection: ITerminalsAndPOS[] = [sampleWithRequiredData];
        expectedResult = service.addTerminalsAndPOSToCollectionIfMissing(terminalsAndPOSCollection, undefined, null);
        expect(expectedResult).toEqual(terminalsAndPOSCollection);
      });
    });

    describe('compareTerminalsAndPOS', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTerminalsAndPOS(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTerminalsAndPOS(entity1, entity2);
        const compareResult2 = service.compareTerminalsAndPOS(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTerminalsAndPOS(entity1, entity2);
        const compareResult2 = service.compareTerminalsAndPOS(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTerminalsAndPOS(entity1, entity2);
        const compareResult2 = service.compareTerminalsAndPOS(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
