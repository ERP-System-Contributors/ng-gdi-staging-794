import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CardFraudInformationFormService, CardFraudInformationFormGroup } from './card-fraud-information-form.service';
import { ICardFraudInformation } from '../card-fraud-information.model';
import { CardFraudInformationService } from '../service/card-fraud-information.service';

@Component({
  selector: 'jhi-card-fraud-information-update',
  templateUrl: './card-fraud-information-update.component.html',
})
export class CardFraudInformationUpdateComponent implements OnInit {
  isSaving = false;
  cardFraudInformation: ICardFraudInformation | null = null;

  editForm: CardFraudInformationFormGroup = this.cardFraudInformationFormService.createCardFraudInformationFormGroup();

  constructor(
    protected cardFraudInformationService: CardFraudInformationService,
    protected cardFraudInformationFormService: CardFraudInformationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardFraudInformation }) => {
      this.cardFraudInformation = cardFraudInformation;
      if (cardFraudInformation) {
        this.updateForm(cardFraudInformation);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardFraudInformation = this.cardFraudInformationFormService.getCardFraudInformation(this.editForm);
    if (cardFraudInformation.id !== null) {
      this.subscribeToSaveResponse(this.cardFraudInformationService.update(cardFraudInformation));
    } else {
      this.subscribeToSaveResponse(this.cardFraudInformationService.create(cardFraudInformation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardFraudInformation>>): void {
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

  protected updateForm(cardFraudInformation: ICardFraudInformation): void {
    this.cardFraudInformation = cardFraudInformation;
    this.cardFraudInformationFormService.resetForm(this.editForm, cardFraudInformation);
  }
}
