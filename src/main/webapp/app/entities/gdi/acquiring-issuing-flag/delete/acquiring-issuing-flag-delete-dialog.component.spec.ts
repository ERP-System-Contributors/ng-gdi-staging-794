jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AcquiringIssuingFlagService } from '../service/acquiring-issuing-flag.service';

import { AcquiringIssuingFlagDeleteDialogComponent } from './acquiring-issuing-flag-delete-dialog.component';

describe('AcquiringIssuingFlag Management Delete Component', () => {
  let comp: AcquiringIssuingFlagDeleteDialogComponent;
  let fixture: ComponentFixture<AcquiringIssuingFlagDeleteDialogComponent>;
  let service: AcquiringIssuingFlagService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AcquiringIssuingFlagDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(AcquiringIssuingFlagDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AcquiringIssuingFlagDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AcquiringIssuingFlagService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
