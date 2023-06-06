///
/// Erp System - Mark III No 15 (Caleb Series) Client 1.3.5
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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

import { AssetWarrantyDetailComponent } from './asset-warranty-detail.component';

describe('AssetWarranty Management Detail Component', () => {
  let comp: AssetWarrantyDetailComponent;
  let fixture: ComponentFixture<AssetWarrantyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetWarrantyDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ assetWarranty: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AssetWarrantyDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AssetWarrantyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load assetWarranty on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.assetWarranty).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});