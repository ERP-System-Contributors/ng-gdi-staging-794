import { Component } from '@angular/core';
import { Account } from '../../../core/auth/account.model';
import { LoginService } from '../../../login/login.service';
import { AccountService } from '../../../core/auth/account.service';
import { ProfileService } from '../../../layouts/profiles/profile.service';
import { Router } from '@angular/router';
import { VERSION } from '../../../app.constants';

@Component({
  selector: 'jhi-gdi-master-nav',
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
              <span>References</span>
            </span>
          </a>
          <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="entity-menu">
            <li>
              <a
                class="dropdown-item"
                routerLink="bank-branch-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Bank Branch Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="outlet-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Outlet Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="outlet-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Outlet Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="county-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>County Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="customer-id-document-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Customer ID Document Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="institution-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Institution Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="mfb-branch-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Mfb Branch Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="iso-country-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Iso Country Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="sub-county-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Sub County Code</span>
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
                routerLink="customer-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Customer Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="legal-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Legal Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="insider-category-types"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Insider Category Types</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="gender-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Gender Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="institution-contact-details"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Institution Contact Details</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="isic-economic-activity"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Isic Economic Activity</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="institution-status-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Institution Status Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="sna-sector-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Sna Sector Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="business-segment-types"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Business Segment Types</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="iso-currency-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Iso Currency Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="party-relation-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Party Relation Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="contract-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Contract Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="account-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Account Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="account-status-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Account Status Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="account-ownership-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Account Ownership Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-product-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Product Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-performance-classification"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Performance Classification</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="chart-of-accounts-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Chart Of Accounts Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-repayment-frequency"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Repayment Frequency</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="gl-mapping"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Gl Mapping</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="moratorium-item"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Moratorium Item</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="collateral-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Collateral Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-application-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Application Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-application-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Application Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-restructure-item"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Restructure Item</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-decline-reason"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Decline Reason</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-restructure-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Restructure Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-types"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Types</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-brand-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Brand Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-status-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Status Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-charges"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Charges</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-category-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Category Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-class-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Class Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-performance-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Performance Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="terminal-functions"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Terminal Functions</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="terminal-types"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Terminal Types</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="customer-complaint-status-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Customer Complaint Status Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="channel-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Channel Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fx-customer-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fx Customer Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fx-transaction-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fx Transaction Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fx-transaction-rate-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fx Transaction Rate Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fx-rate-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fx Rate Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fx-transaction-channel-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fx Transaction Channel Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fx-receipt-purpose-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fx Receipt Purpose Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fraud-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fraud Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="fraud-category-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Fraud Category Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="shareholder-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Shareholder Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="merchant-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Merchant Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="card-fraud-incident-category"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Card Fraud Incident Category</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="academic-qualification"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Academic Qualification</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="professional-qualification"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Professional Qualification</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="employment-terms"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Employment Terms</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="committee-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Committee Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="executive-category-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Executive Category Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="department-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Department Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="share-holding-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Share Holding Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="anticipated-maturity-periood"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Anticipated Maturity Periood</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="interest-calc-method"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Interest Calc Method</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="security-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Security Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="security-tenure"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Security Tenure</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="financial-derivative-type-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Financial Derivative Type Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="security-classification-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Security Classification Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="derivative-sub-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Derivative Sub Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="derivative-underlying-asset"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Derivative Underlying Asset</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="currency-authenticity-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Currency Authenticity Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="kenyan-currency-denomination"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Kenyan Currency Denomination</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="currency-serviceability-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Currency Serviceability Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="remittance-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Remittance Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="sources-of-funds-type-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Sources Of Funds Type Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="source-remittance-purpose-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Source Remittance Purpose Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="staff-current-employment-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Staff Current Employment Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="staff-role-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Staff Role Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="management-member-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Management Member Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="ultimate-beneficiary-types"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Ultimate Beneficiary Types</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="bounced-cheque-categories"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Bounced Cheque Categories</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="reasons-for-bounced-cheque"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Reasons For Bounced Cheque</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-account-holder-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Account Holder Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-account-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Account Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-submitting-institution-category"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Submitting Institution Category</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-amount-category-band"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Amount Category Band</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-report-request-reasons"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Report Request Reasons</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-complaint-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Complaint Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-complaint-status-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Complaint Status Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-record-file-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Record File Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-credit-application-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Credit Application Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-customer-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Customer Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-subscription-status-type-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Subscription Status Type Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-nature-of-information"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Nature Of Information</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-source-of-information-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Source Of Information Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-product-service-fee-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Product Service Fee Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-file-transmission-status"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb File Transmission Status</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-agent-service-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Agent Service Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-credit-facility-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Credit Facility Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-gl-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Gl Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-aging-bands"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Aging Bands</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-report-view-band"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Report View Band</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="crb-data-submitting-institutions"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Crb Data Submitting Institutions</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="bank-transaction-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Bank Transaction Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="agricultural-enterprise-activity-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Agricultural Enterprise Activity Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="interbank-sector-code"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Interbank Sector Code</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="ultimate-beneficiary-category"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Ultimate Beneficiary Category</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="issuers-of-securities"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Issuers Of Securities</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="loan-account-category"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Loan Account Category</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="counterparty-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Counterparty Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="counter-party-deal-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Counter Party Deal Type</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="counter-party-category"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Counter Party Category</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="acquiring-issuing-flag"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Acquiring Issuing Flag</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="credit-card-ownership"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Credit Card Ownership</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="category-of-security"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Category Of Security</span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                routerLink="nature-of-customer-complaints"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Nature Of Customer Complaints</span>
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
            <li>
              <a
                class="dropdown-item"
                routerLink="product-type"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="collapseNavbar()"
              >
                <fa-icon icon="asterisk" [fixedWidth]="true"></fa-icon>
                <span>Product Type</span>
              </a>
            </li>
          </ul>
        </li>
    </div>
  `,
})
export class GdiMasterComponent {

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
