import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICardUsageInformation } from '../card-usage-information.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../card-usage-information.test-samples';

import { CardUsageInformationService, RestCardUsageInformation } from './card-usage-information.service';

const requireRestSample: RestCardUsageInformation = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('CardUsageInformation Service', () => {
  let service: CardUsageInformationService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardUsageInformation | ICardUsageInformation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardUsageInformationService);
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

    it('should create a CardUsageInformation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardUsageInformation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardUsageInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardUsageInformation', () => {
      const cardUsageInformation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardUsageInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardUsageInformation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardUsageInformation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardUsageInformation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardUsageInformationToCollectionIfMissing', () => {
      it('should add a CardUsageInformation to an empty array', () => {
        const cardUsageInformation: ICardUsageInformation = sampleWithRequiredData;
        expectedResult = service.addCardUsageInformationToCollectionIfMissing([], cardUsageInformation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardUsageInformation);
      });

      it('should not add a CardUsageInformation to an array that contains it', () => {
        const cardUsageInformation: ICardUsageInformation = sampleWithRequiredData;
        const cardUsageInformationCollection: ICardUsageInformation[] = [
          {
            ...cardUsageInformation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardUsageInformationToCollectionIfMissing(cardUsageInformationCollection, cardUsageInformation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardUsageInformation to an array that doesn't contain it", () => {
        const cardUsageInformation: ICardUsageInformation = sampleWithRequiredData;
        const cardUsageInformationCollection: ICardUsageInformation[] = [sampleWithPartialData];
        expectedResult = service.addCardUsageInformationToCollectionIfMissing(cardUsageInformationCollection, cardUsageInformation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardUsageInformation);
      });

      it('should add only unique CardUsageInformation to an array', () => {
        const cardUsageInformationArray: ICardUsageInformation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardUsageInformationCollection: ICardUsageInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCardUsageInformationToCollectionIfMissing(cardUsageInformationCollection, ...cardUsageInformationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardUsageInformation: ICardUsageInformation = sampleWithRequiredData;
        const cardUsageInformation2: ICardUsageInformation = sampleWithPartialData;
        expectedResult = service.addCardUsageInformationToCollectionIfMissing([], cardUsageInformation, cardUsageInformation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardUsageInformation);
        expect(expectedResult).toContain(cardUsageInformation2);
      });

      it('should accept null and undefined values', () => {
        const cardUsageInformation: ICardUsageInformation = sampleWithRequiredData;
        expectedResult = service.addCardUsageInformationToCollectionIfMissing([], null, cardUsageInformation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardUsageInformation);
      });

      it('should return initial array if no CardUsageInformation is added', () => {
        const cardUsageInformationCollection: ICardUsageInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCardUsageInformationToCollectionIfMissing(cardUsageInformationCollection, undefined, null);
        expect(expectedResult).toEqual(cardUsageInformationCollection);
      });
    });

    describe('compareCardUsageInformation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardUsageInformation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardUsageInformation(entity1, entity2);
        const compareResult2 = service.compareCardUsageInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardUsageInformation(entity1, entity2);
        const compareResult2 = service.compareCardUsageInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardUsageInformation(entity1, entity2);
        const compareResult2 = service.compareCardUsageInformation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
