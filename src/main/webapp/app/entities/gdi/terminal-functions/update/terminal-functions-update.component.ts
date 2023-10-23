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

import { TerminalFunctionsFormService, TerminalFunctionsFormGroup } from './terminal-functions-form.service';
import { ITerminalFunctions } from '../terminal-functions.model';
import { TerminalFunctionsService } from '../service/terminal-functions.service';

@Component({
  selector: 'jhi-terminal-functions-update',
  templateUrl: './terminal-functions-update.component.html',
})
export class TerminalFunctionsUpdateComponent implements OnInit {
  isSaving = false;
  terminalFunctions: ITerminalFunctions | null = null;

  editForm: TerminalFunctionsFormGroup = this.terminalFunctionsFormService.createTerminalFunctionsFormGroup();

  constructor(
    protected terminalFunctionsService: TerminalFunctionsService,
    protected terminalFunctionsFormService: TerminalFunctionsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ terminalFunctions }) => {
      this.terminalFunctions = terminalFunctions;
      if (terminalFunctions) {
        this.updateForm(terminalFunctions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const terminalFunctions = this.terminalFunctionsFormService.getTerminalFunctions(this.editForm);
    if (terminalFunctions.id !== null) {
      this.subscribeToSaveResponse(this.terminalFunctionsService.update(terminalFunctions));
    } else {
      this.subscribeToSaveResponse(this.terminalFunctionsService.create(terminalFunctions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerminalFunctions>>): void {
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

  protected updateForm(terminalFunctions: ITerminalFunctions): void {
    this.terminalFunctions = terminalFunctions;
    this.terminalFunctionsFormService.resetForm(this.editForm, terminalFunctions);
  }
}
