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

jest.mock('app/core/auth/account.service');

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';

import { ErpMainComponent } from './erp-main.component';

describe('MainComponent', () => {
  let comp: ErpMainComponent;
  let fixture: ComponentFixture<ErpMainComponent>;
  let titleService: Title;
  let mockAccountService: AccountService;
  const routerEventsSubject = new Subject<RouterEvent>();
  const routerState: any = { snapshot: { root: { data: {} } } };
  class MockRouter {
    events = routerEventsSubject;
    routerState = routerState;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErpMainComponent],
      providers: [
        Title,
        AccountService,
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    })
      .overrideTemplate(ErpMainComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpMainComponent);
    comp = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    mockAccountService = TestBed.inject(AccountService);
    mockAccountService.identity = jest.fn(() => of(null));
    mockAccountService.getAuthenticationState = jest.fn(() => of(null));
  });

  describe('page title', () => {
    const defaultPageTitle = 'Ng Gdi Staging 794';
    const parentRoutePageTitle = 'parentTitle';
    const childRoutePageTitle = 'childTitle';
    const navigationEnd = new NavigationEnd(1, '', '');
    const navigationStart = new NavigationStart(1, '');

    beforeEach(() => {
      routerState.snapshot.root = { data: {} };
      jest.spyOn(titleService, 'setTitle');
      comp.ngOnInit();
    });

    describe('navigation end', () => {
      it('should set page title to default title if pageTitle is missing on routes', () => {
        // WHEN
        routerEventsSubject.next(navigationEnd);

        // THEN
        expect(titleService.setTitle).toHaveBeenCalledWith(defaultPageTitle);
      });

      it('should set page title to root route pageTitle if there is no child routes', () => {
        // GIVEN
        routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };

        // WHEN
        routerEventsSubject.next(navigationEnd);

        // THEN
        expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle);
      });

      it('should set page title to child route pageTitle if child routes exist and pageTitle is set for child route', () => {
        // GIVEN
        routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
        routerState.snapshot.root.firstChild = { data: { pageTitle: childRoutePageTitle } };

        // WHEN
        routerEventsSubject.next(navigationEnd);

        // THEN
        expect(titleService.setTitle).toHaveBeenCalledWith(childRoutePageTitle);
      });

      it('should set page title to parent route pageTitle if child routes exists but pageTitle is not set for child route data', () => {
        // GIVEN
        routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
        routerState.snapshot.root.firstChild = { data: {} };

        // WHEN
        routerEventsSubject.next(navigationEnd);

        // THEN
        expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle);
      });
    });

    describe('navigation start', () => {
      it('should not set page title on navigation start', () => {
        // WHEN
        routerEventsSubject.next(navigationStart);

        // THEN
        expect(titleService.setTitle).not.toHaveBeenCalled();
      });
    });
  });
});
