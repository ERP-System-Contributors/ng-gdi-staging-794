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
