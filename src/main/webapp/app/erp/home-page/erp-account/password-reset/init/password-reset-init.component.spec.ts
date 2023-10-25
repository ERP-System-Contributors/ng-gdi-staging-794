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

import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ErpPasswordResetInitComponent } from './erp-password-reset-init.component';
import { PasswordResetInitService } from './password-reset-init.service';

describe('PasswordResetInitComponent', () => {
  let fixture: ComponentFixture<ErpPasswordResetInitComponent>;
  let comp: ErpPasswordResetInitComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ErpPasswordResetInitComponent],
      providers: [FormBuilder],
    })
      .overrideTemplate(ErpPasswordResetInitComponent, '')
      .createComponent(ErpPasswordResetInitComponent);
    comp = fixture.componentInstance;
  });

  it('sets focus after the view has been initialized', () => {
    const node = {
      focus: jest.fn(),
    };
    comp.email = new ElementRef(node);

    comp.ngAfterViewInit();

    expect(node.focus).toHaveBeenCalled();
  });

  it('notifies of success upon successful requestReset', inject([PasswordResetInitService], (service: PasswordResetInitService) => {
    jest.spyOn(service, 'save').mockReturnValue(of({}));
    comp.resetRequestForm.patchValue({
      email: 'user@domain.com',
    });

    comp.requestReset();

    expect(service.save).toHaveBeenCalledWith('user@domain.com');
    expect(comp.success).toBe(true);
  }));

  it('no notification of success upon error response', inject([PasswordResetInitService], (service: PasswordResetInitService) => {
    jest.spyOn(service, 'save').mockReturnValue(
      throwError({
        status: 503,
        data: 'something else',
      })
    );
    comp.resetRequestForm.patchValue({
      email: 'user@domain.com',
    });
    comp.requestReset();

    expect(service.save).toHaveBeenCalledWith('user@domain.com');
    expect(comp.success).toBe(false);
  }));
});
