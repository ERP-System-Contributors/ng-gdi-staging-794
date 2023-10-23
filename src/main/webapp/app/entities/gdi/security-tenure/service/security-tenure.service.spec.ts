import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISecurityTenure } from '../security-tenure.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../security-tenure.test-samples';

import { SecurityTenureService } from './security-tenure.service';

const requireRestSample: ISecurityTenure = {
  ...sampleWithRequiredData,
};

describe('SecurityTenure Service', () => {
  let service: SecurityTenureService;
  let httpMock: HttpTestingController;
  let expectedResult: ISecurityTenure | ISecurityTenure[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SecurityTenureService);
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

    it('should create a SecurityTenure', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const securityTenure = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(securityTenure).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SecurityTenure', () => {
      const securityTenure = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(securityTenure).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SecurityTenure', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SecurityTenure', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SecurityTenure', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSecurityTenureToCollectionIfMissing', () => {
      it('should add a SecurityTenure to an empty array', () => {
        const securityTenure: ISecurityTenure = sampleWithRequiredData;
        expectedResult = service.addSecurityTenureToCollectionIfMissing([], securityTenure);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityTenure);
      });

      it('should not add a SecurityTenure to an array that contains it', () => {
        const securityTenure: ISecurityTenure = sampleWithRequiredData;
        const securityTenureCollection: ISecurityTenure[] = [
          {
            ...securityTenure,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSecurityTenureToCollectionIfMissing(securityTenureCollection, securityTenure);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SecurityTenure to an array that doesn't contain it", () => {
        const securityTenure: ISecurityTenure = sampleWithRequiredData;
        const securityTenureCollection: ISecurityTenure[] = [sampleWithPartialData];
        expectedResult = service.addSecurityTenureToCollectionIfMissing(securityTenureCollection, securityTenure);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityTenure);
      });

      it('should add only unique SecurityTenure to an array', () => {
        const securityTenureArray: ISecurityTenure[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const securityTenureCollection: ISecurityTenure[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityTenureToCollectionIfMissing(securityTenureCollection, ...securityTenureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const securityTenure: ISecurityTenure = sampleWithRequiredData;
        const securityTenure2: ISecurityTenure = sampleWithPartialData;
        expectedResult = service.addSecurityTenureToCollectionIfMissing([], securityTenure, securityTenure2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityTenure);
        expect(expectedResult).toContain(securityTenure2);
      });

      it('should accept null and undefined values', () => {
        const securityTenure: ISecurityTenure = sampleWithRequiredData;
        expectedResult = service.addSecurityTenureToCollectionIfMissing([], null, securityTenure, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityTenure);
      });

      it('should return initial array if no SecurityTenure is added', () => {
        const securityTenureCollection: ISecurityTenure[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityTenureToCollectionIfMissing(securityTenureCollection, undefined, null);
        expect(expectedResult).toEqual(securityTenureCollection);
      });
    });

    describe('compareSecurityTenure', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSecurityTenure(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSecurityTenure(entity1, entity2);
        const compareResult2 = service.compareSecurityTenure(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSecurityTenure(entity1, entity2);
        const compareResult2 = service.compareSecurityTenure(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSecurityTenure(entity1, entity2);
        const compareResult2 = service.compareSecurityTenure(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
