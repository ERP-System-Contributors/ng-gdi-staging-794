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

import { TestBed, waitForAsync, tick, fakeAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ActivateService } from './activate.service';
import { ErpActivateComponent } from './erp-activate.component';

describe('ActivateComponent', () => {
  let comp: ErpActivateComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ErpActivateComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ key: 'ABC123' }) },
        },
      ],
    })
      .overrideTemplate(ErpActivateComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(ErpActivateComponent);
    comp = fixture.componentInstance;
  });

  it('calls activate.get with the key from params', inject(
    [ActivateService],
    fakeAsync((service: ActivateService) => {
      jest.spyOn(service, 'get').mockReturnValue(of());

      comp.ngOnInit();
      tick();

      expect(service.get).toHaveBeenCalledWith('ABC123');
    })
  ));

  it('should set set success to true upon successful activation', inject(
    [ActivateService],
    fakeAsync((service: ActivateService) => {
      jest.spyOn(service, 'get').mockReturnValue(of({}));

      comp.ngOnInit();
      tick();

      expect(comp.error).toBe(false);
      expect(comp.success).toBe(true);
    })
  ));

  it('should set set error to true upon activation failure', inject(
    [ActivateService],
    fakeAsync((service: ActivateService) => {
      jest.spyOn(service, 'get').mockReturnValue(throwError('ERROR'));

      comp.ngOnInit();
      tick();

      expect(comp.error).toBe(true);
      expect(comp.success).toBe(false);
    })
  ));
});
