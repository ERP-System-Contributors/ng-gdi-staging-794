import { Component } from '@angular/core';
import { Account } from '../../../core/auth/account.model';
import { LoginService } from '../../../login/login.service';
import { AccountService } from '../../../core/auth/account.service';
import { ProfileService } from '../../../layouts/profiles/profile.service';
import { Router } from '@angular/router';
import { VERSION } from '../../../app.constants';

@Component({
  selector: 'jhi-gdi-data-nav',
  template: `
    <div class="navbar-collapse collapse" id="navbarResponsive" [ngbCollapse]="isNavbarCollapsed" [ngSwitch]="account !== null">
      <li
          *ngSwitchCase="true"
          ngbDropdown
          class="nav-item dropdown pointer"
          display="dynamic"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="entity-menu" data-cy="entity">
            <span>
              <fa-icon icon="th-list"></fa-icon>
              <span>GDI</span>
            </span>
          </a>
          <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="entity-menu">
            <li>
              <a
                class="dropdown-item"
                routerLink="account-attribute"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Account Attribute</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="account-attribute-metadata"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Account Attribute Metadata</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="exchange-rate"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Exchange Rate</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="particulars-of-outlet"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Particulars Of Outlet</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="weekly-counterfeit-holding"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Weekly Counterfeit Holding</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="weekly-cash-holding"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Weekly Cash Holding</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="county-sub-county-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>County Sub County Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="related-party-relationship"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Related Party Relationship</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="terminals-and-pos"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Terminals And POS</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="performance-of-foreign-subsidiaries"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Performance Of Foreign Subsidiaries</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="account-balance"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Account Balance</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="agent-banking-activity"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Agent Banking Activity</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-acquiring-transaction"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Acquiring Transaction</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-issuer-charges"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Issuer Charges</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-fraud-information"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Fraud Information</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-usage-information"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Usage Information</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="collateral-information"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Collateral Information</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="credit-card-facility"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Credit Card Facility</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-state"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card State</span>
              </a>
            </li>
          </ul>
        </li>
    </div>
  `,
})
export class GdiDataComponent {

  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
