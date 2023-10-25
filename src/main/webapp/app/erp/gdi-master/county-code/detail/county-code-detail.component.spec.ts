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

import { CountyCodeDetailComponent } from './county-code-detail.component';

describe('CountyCode Management Detail Component', () => {
  let comp: CountyCodeDetailComponent;
  let fixture: ComponentFixture<CountyCodeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountyCodeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ countyCode: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CountyCodeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CountyCodeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load countyCode on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.countyCode).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
