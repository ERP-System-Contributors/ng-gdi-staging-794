import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPartyRelationType } from '../party-relation-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../party-relation-type.test-samples';

import { PartyRelationTypeService } from './party-relation-type.service';

const requireRestSample: IPartyRelationType = {
  ...sampleWithRequiredData,
};

describe('PartyRelationType Service', () => {
  let service: PartyRelationTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IPartyRelationType | IPartyRelationType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PartyRelationTypeService);
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

    it('should create a PartyRelationType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const partyRelationType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(partyRelationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PartyRelationType', () => {
      const partyRelationType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(partyRelationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PartyRelationType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PartyRelationType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PartyRelationType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPartyRelationTypeToCollectionIfMissing', () => {
      it('should add a PartyRelationType to an empty array', () => {
        const partyRelationType: IPartyRelationType = sampleWithRequiredData;
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing([], partyRelationType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(partyRelationType);
      });

      it('should not add a PartyRelationType to an array that contains it', () => {
        const partyRelationType: IPartyRelationType = sampleWithRequiredData;
        const partyRelationTypeCollection: IPartyRelationType[] = [
          {
            ...partyRelationType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing(partyRelationTypeCollection, partyRelationType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PartyRelationType to an array that doesn't contain it", () => {
        const partyRelationType: IPartyRelationType = sampleWithRequiredData;
        const partyRelationTypeCollection: IPartyRelationType[] = [sampleWithPartialData];
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing(partyRelationTypeCollection, partyRelationType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(partyRelationType);
      });

      it('should add only unique PartyRelationType to an array', () => {
        const partyRelationTypeArray: IPartyRelationType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const partyRelationTypeCollection: IPartyRelationType[] = [sampleWithRequiredData];
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing(partyRelationTypeCollection, ...partyRelationTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const partyRelationType: IPartyRelationType = sampleWithRequiredData;
        const partyRelationType2: IPartyRelationType = sampleWithPartialData;
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing([], partyRelationType, partyRelationType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(partyRelationType);
        expect(expectedResult).toContain(partyRelationType2);
      });

      it('should accept null and undefined values', () => {
        const partyRelationType: IPartyRelationType = sampleWithRequiredData;
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing([], null, partyRelationType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(partyRelationType);
      });

      it('should return initial array if no PartyRelationType is added', () => {
        const partyRelationTypeCollection: IPartyRelationType[] = [sampleWithRequiredData];
        expectedResult = service.addPartyRelationTypeToCollectionIfMissing(partyRelationTypeCollection, undefined, null);
        expect(expectedResult).toEqual(partyRelationTypeCollection);
      });
    });

    describe('comparePartyRelationType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePartyRelationType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePartyRelationType(entity1, entity2);
        const compareResult2 = service.comparePartyRelationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePartyRelationType(entity1, entity2);
        const compareResult2 = service.comparePartyRelationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePartyRelationType(entity1, entity2);
        const compareResult2 = service.comparePartyRelationType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
