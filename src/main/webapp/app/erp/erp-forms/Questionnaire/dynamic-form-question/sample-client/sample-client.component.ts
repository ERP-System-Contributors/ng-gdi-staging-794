///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import { Component } from '@angular/core';
import { QuestionService } from '../../question.service';
import { Observable } from 'rxjs';
import { DynamicQuestion } from '../../dynamic-question.model';

@Component({
  selector: 'jhi-sample-client',
  templateUrl: './sample-client.component.html',
  providers:  [QuestionService]
})
export class SampleClientComponent {
  questions$: Observable<DynamicQuestion<any>[]>;

  constructor(service: QuestionService) {
    // Apply mapping using the QuestionBase entity
    this.questions$ = service.getQuestions();
  }
}