import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITerminalTypes } from '../terminal-types.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../terminal-types.test-samples';

import { TerminalTypesService } from './terminal-types.service';

const requireRestSample: ITerminalTypes = {
  ...sampleWithRequiredData,
};

describe('TerminalTypes Service', () => {
  let service: TerminalTypesService;
  let httpMock: HttpTestingController;
  let expectedResult: ITerminalTypes | ITerminalTypes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerminalTypesService);
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

    it('should create a TerminalTypes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const terminalTypes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(terminalTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TerminalTypes', () => {
      const terminalTypes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(terminalTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TerminalTypes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TerminalTypes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TerminalTypes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTerminalTypesToCollectionIfMissing', () => {
      it('should add a TerminalTypes to an empty array', () => {
        const terminalTypes: ITerminalTypes = sampleWithRequiredData;
        expectedResult = service.addTerminalTypesToCollectionIfMissing([], terminalTypes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terminalTypes);
      });

      it('should not add a TerminalTypes to an array that contains it', () => {
        const terminalTypes: ITerminalTypes = sampleWithRequiredData;
        const terminalTypesCollection: ITerminalTypes[] = [
          {
            ...terminalTypes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTerminalTypesToCollectionIfMissing(terminalTypesCollection, terminalTypes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TerminalTypes to an array that doesn't contain it", () => {
        const terminalTypes: ITerminalTypes = sampleWithRequiredData;
        const terminalTypesCollection: ITerminalTypes[] = [sampleWithPartialData];
        expectedResult = service.addTerminalTypesToCollectionIfMissing(terminalTypesCollection, terminalTypes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terminalTypes);
      });

      it('should add only unique TerminalTypes to an array', () => {
        const terminalTypesArray: ITerminalTypes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const terminalTypesCollection: ITerminalTypes[] = [sampleWithRequiredData];
        expectedResult = service.addTerminalTypesToCollectionIfMissing(terminalTypesCollection, ...terminalTypesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const terminalTypes: ITerminalTypes = sampleWithRequiredData;
        const terminalTypes2: ITerminalTypes = sampleWithPartialData;
        expectedResult = service.addTerminalTypesToCollectionIfMissing([], terminalTypes, terminalTypes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terminalTypes);
        expect(expectedResult).toContain(terminalTypes2);
      });

      it('should accept null and undefined values', () => {
        const terminalTypes: ITerminalTypes = sampleWithRequiredData;
        expectedResult = service.addTerminalTypesToCollectionIfMissing([], null, terminalTypes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terminalTypes);
      });

      it('should return initial array if no TerminalTypes is added', () => {
        const terminalTypesCollection: ITerminalTypes[] = [sampleWithRequiredData];
        expectedResult = service.addTerminalTypesToCollectionIfMissing(terminalTypesCollection, undefined, null);
        expect(expectedResult).toEqual(terminalTypesCollection);
      });
    });

    describe('compareTerminalTypes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTerminalTypes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTerminalTypes(entity1, entity2);
        const compareResult2 = service.compareTerminalTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTerminalTypes(entity1, entity2);
        const compareResult2 = service.compareTerminalTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTerminalTypes(entity1, entity2);
        const compareResult2 = service.compareTerminalTypes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
