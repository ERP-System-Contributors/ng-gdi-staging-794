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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaceholderDetailComponent } from './placeholder-detail.component';

describe('Placeholder Management Detail Component', () => {
  let comp: PlaceholderDetailComponent;
  let fixture: ComponentFixture<PlaceholderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ placeholder: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PlaceholderDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlaceholderDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load placeholder on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.placeholder).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});