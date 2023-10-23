import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDerivativeSubType } from '../derivative-sub-type.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-derivative-sub-type-detail',
  templateUrl: './derivative-sub-type-detail.component.html',
})
export class DerivativeSubTypeDetailComponent implements OnInit {
  derivativeSubType: IDerivativeSubType | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ derivativeSubType }) => {
      this.derivativeSubType = derivativeSubType;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
