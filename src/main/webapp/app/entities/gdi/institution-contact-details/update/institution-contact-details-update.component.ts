import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { InstitutionContactDetailsFormService, InstitutionContactDetailsFormGroup } from './institution-contact-details-form.service';
import { IInstitutionContactDetails } from '../institution-contact-details.model';
import { InstitutionContactDetailsService } from '../service/institution-contact-details.service';

@Component({
  selector: 'jhi-institution-contact-details-update',
  templateUrl: './institution-contact-details-update.component.html',
})
export class InstitutionContactDetailsUpdateComponent implements OnInit {
  isSaving = false;
  institutionContactDetails: IInstitutionContactDetails | null = null;

  editForm: InstitutionContactDetailsFormGroup = this.institutionContactDetailsFormService.createInstitutionContactDetailsFormGroup();

  constructor(
    protected institutionContactDetailsService: InstitutionContactDetailsService,
    protected institutionContactDetailsFormService: InstitutionContactDetailsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ institutionContactDetails }) => {
      this.institutionContactDetails = institutionContactDetails;
      if (institutionContactDetails) {
        this.updateForm(institutionContactDetails);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const institutionContactDetails = this.institutionContactDetailsFormService.getInstitutionContactDetails(this.editForm);
    if (institutionContactDetails.id !== null) {
      this.subscribeToSaveResponse(this.institutionContactDetailsService.update(institutionContactDetails));
    } else {
      this.subscribeToSaveResponse(this.institutionContactDetailsService.create(institutionContactDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstitutionContactDetails>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(institutionContactDetails: IInstitutionContactDetails): void {
    this.institutionContactDetails = institutionContactDetails;
    this.institutionContactDetailsFormService.resetForm(this.editForm, institutionContactDetails);
  }
}
