import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITerminalFunctions } from '../terminal-functions.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../terminal-functions.test-samples';

import { TerminalFunctionsService } from './terminal-functions.service';

const requireRestSample: ITerminalFunctions = {
  ...sampleWithRequiredData,
};

describe('TerminalFunctions Service', () => {
  let service: TerminalFunctionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ITerminalFunctions | ITerminalFunctions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerminalFunctionsService);
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

    it('should create a TerminalFunctions', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const terminalFunctions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(terminalFunctions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TerminalFunctions', () => {
      const terminalFunctions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(terminalFunctions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TerminalFunctions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TerminalFunctions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TerminalFunctions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTerminalFunctionsToCollectionIfMissing', () => {
      it('should add a TerminalFunctions to an empty array', () => {
        const terminalFunctions: ITerminalFunctions = sampleWithRequiredData;
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing([], terminalFunctions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terminalFunctions);
      });

      it('should not add a TerminalFunctions to an array that contains it', () => {
        const terminalFunctions: ITerminalFunctions = sampleWithRequiredData;
        const terminalFunctionsCollection: ITerminalFunctions[] = [
          {
            ...terminalFunctions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing(terminalFunctionsCollection, terminalFunctions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TerminalFunctions to an array that doesn't contain it", () => {
        const terminalFunctions: ITerminalFunctions = sampleWithRequiredData;
        const terminalFunctionsCollection: ITerminalFunctions[] = [sampleWithPartialData];
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing(terminalFunctionsCollection, terminalFunctions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terminalFunctions);
      });

      it('should add only unique TerminalFunctions to an array', () => {
        const terminalFunctionsArray: ITerminalFunctions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const terminalFunctionsCollection: ITerminalFunctions[] = [sampleWithRequiredData];
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing(terminalFunctionsCollection, ...terminalFunctionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const terminalFunctions: ITerminalFunctions = sampleWithRequiredData;
        const terminalFunctions2: ITerminalFunctions = sampleWithPartialData;
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing([], terminalFunctions, terminalFunctions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terminalFunctions);
        expect(expectedResult).toContain(terminalFunctions2);
      });

      it('should accept null and undefined values', () => {
        const terminalFunctions: ITerminalFunctions = sampleWithRequiredData;
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing([], null, terminalFunctions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terminalFunctions);
      });

      it('should return initial array if no TerminalFunctions is added', () => {
        const terminalFunctionsCollection: ITerminalFunctions[] = [sampleWithRequiredData];
        expectedResult = service.addTerminalFunctionsToCollectionIfMissing(terminalFunctionsCollection, undefined, null);
        expect(expectedResult).toEqual(terminalFunctionsCollection);
      });
    });

    describe('compareTerminalFunctions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTerminalFunctions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTerminalFunctions(entity1, entity2);
        const compareResult2 = service.compareTerminalFunctions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTerminalFunctions(entity1, entity2);
        const compareResult2 = service.compareTerminalFunctions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTerminalFunctions(entity1, entity2);
        const compareResult2 = service.compareTerminalFunctions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
