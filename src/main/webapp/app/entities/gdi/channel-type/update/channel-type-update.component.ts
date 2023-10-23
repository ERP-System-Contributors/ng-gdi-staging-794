import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ChannelTypeFormService, ChannelTypeFormGroup } from './channel-type-form.service';
import { IChannelType } from '../channel-type.model';
import { ChannelTypeService } from '../service/channel-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-channel-type-update',
  templateUrl: './channel-type-update.component.html',
})
export class ChannelTypeUpdateComponent implements OnInit {
  isSaving = false;
  channelType: IChannelType | null = null;

  editForm: ChannelTypeFormGroup = this.channelTypeFormService.createChannelTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected channelTypeService: ChannelTypeService,
    protected channelTypeFormService: ChannelTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ channelType }) => {
      this.channelType = channelType;
      if (channelType) {
        this.updateForm(channelType);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ngGdiStaging794App.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const channelType = this.channelTypeFormService.getChannelType(this.editForm);
    if (channelType.id !== null) {
      this.subscribeToSaveResponse(this.channelTypeService.update(channelType));
    } else {
      this.subscribeToSaveResponse(this.channelTypeService.create(channelType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChannelType>>): void {
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

  protected updateForm(channelType: IChannelType): void {
    this.channelType = channelType;
    this.channelTypeFormService.resetForm(this.editForm, channelType);
  }
}
