import { Account } from '../../../core/auth/account.model';
import { LoginService } from '../../../login/login.service';
import { AccountService } from '../../../core/auth/account.service';
import { ProfileService } from '../../../layouts/profiles/profile.service';
import { Router } from '@angular/router';
import { VERSION } from '../../../app.constants';
import { Component } from '@angular/core';

@Component({
  selector: 'jhi-gdi-commons',
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
              <span>GDI Commons</span>
            </span>
          </a>
          <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="entity-menu">

            <li>
              <a
                class="dropdown-item"
                routerLink="placeholder"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Placeholder</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="file-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>File Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="file-upload"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>File Upload</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="dealer"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Dealer</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="transaction-account"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Transaction Account</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="report-template"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Report Template</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="xlsx-report-requisition"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Xlsx Report Requisition</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="universally-unique-mapping"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Universally Unique Mapping</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="report-requisition"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Report Requisition</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="system-content-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>System Content Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="report-content-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Report Content Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="excel-report-export"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Excel Report Export</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="process-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Process Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="report-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Report Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="algorithm"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Algorithm</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="security-clearance"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Security Clearance</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="application-user"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Application User</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="report-design"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Report Design</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="system-module"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>System Module</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="business-document"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Business Document</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="contract-metadata"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Contract Metadata</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fiscal-year"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fiscal Year</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fiscal-quarter"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fiscal Quarter</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fiscal-month"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fiscal Month</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="gdi-master-data-index"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Gdi Master Data Index</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="gdi-transaction-data-index"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Gdi Transaction Data Index</span>
              </a>
            </li>
          </ul>
        </li>
    </div>
  `,
})
export class GdiCommonsComponent {

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
