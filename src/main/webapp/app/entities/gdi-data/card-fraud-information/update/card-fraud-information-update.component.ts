///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
