import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const erpCommonPageRoutes: Routes = [
  {
    path: 'placeholder',
    data: { pageTitle: 'Placeholders' },
    loadChildren: () => import('./system/placeholder/placeholder.module').then(m => m.ErpServicePlaceholderModule),
  },
  {
    path: 'file-type',
    data: { pageTitle: 'FileTypes' },
    loadChildren: () => import('./files/file-type/file-type.module').then(m => m.ErpServiceFileTypeModule),
  },
  {
    path: 'file-upload',
    data: { pageTitle: 'FileUploads' },
    loadChildren: () => import('./files/file-upload/file-upload.module').then(m => m.ErpServiceFileUploadModule),
  },
  {
    path: 'dealer',
    data: { pageTitle: 'Dealers' },
    loadChildren: () => import('./people/dealer/dealer.module').then(m => m.ErpServiceDealerModule),
  },
  {
    path: 'transaction-account',
    data: { pageTitle: 'TransactionAccounts' },
    loadChildren: () => import('./accounting/transaction-account/transaction-account.module').then(m => m.TransactionAccountModule),
  },
  {
    path: 'report-template',
    data: { pageTitle: 'ReportTemplates' },
    loadChildren: () => import('./reports/report-template/report-template.module').then(m => m.ReportTemplateModule),
  },
  {
    path: 'xlsx-report-requisition',
    data: { pageTitle: 'XlsxReportRequisitions' },
    loadChildren: () =>
      import('./reports/xlsx-report-requisition/xlsx-report-requisition.module').then(m => m.XlsxReportRequisitionModule),
  },
  {
    path: 'report-requisition',
    data: { pageTitle: 'ReportRequisitions' },
    loadChildren: () => import('./reports/report-requisition/report-requisition.module').then(m => m.ReportRequisitionModule),
  },
  {
    path: 'system-content-type',
    data: { pageTitle: 'SystemContentTypes' },
    loadChildren: () => import('./system/system-content-type/system-content-type.module').then(m => m.SystemContentTypeModule),
  },
  {
    path: 'report-content-type',
    data: { pageTitle: 'ReportContentTypes' },
    loadChildren: () => import('./reports/report-content-type/report-content-type.module').then(m => m.ReportContentTypeModule),
  },
  {
    path: 'excel-report-export',
    data: { pageTitle: 'ExcelReportExports' },
    loadChildren: () => import('./reports/excel-report-export/excel-report-export.module').then(m => m.ExcelReportExportModule),
  },
  {
    path: 'process-status',
    data: { pageTitle: 'ProcessStatuses' },
    loadChildren: () => import('./system/process-status/process-status.module').then(m => m.ProcessStatusModule),
  },
  {
    path: 'report-status',
    data: { pageTitle: 'ReportStatuses' },
    loadChildren: () => import('./reports/report-status/report-status.module').then(m => m.ReportStatusModule),
  },
  {
    path: 'algorithm',
    data: { pageTitle: 'Algorithms' },
    loadChildren: () => import('./system/algorithm/algorithm.module').then(m => m.AlgorithmModule),
  },
  {
    path: 'security-clearance',
    data: { pageTitle: 'SecurityClearances' },
    loadChildren: () => import('./people/security-clearance/security-clearance.module').then(m => m.SecurityClearanceModule),
  },
  {
    path: 'application-user',
    data: { pageTitle: 'ApplicationUsers' },
    loadChildren: () => import('./people/application-user/application-user.module').then(m => m.ApplicationUserModule),
  },
  {
    path: 'report-design',
    data: { pageTitle: 'ReportDesigns' },
    loadChildren: () => import('./reports/report-design/report-design.module').then(m => m.ReportDesignModule),
  },
  {
    path: 'system-module',
    data: { pageTitle: 'SystemModules' },
    loadChildren: () => import('./system/system-module/system-module.module').then(m => m.SystemModuleModule),
  },
  {
    path: 'business-document',
    data: { pageTitle: 'BusinessDocuments' },
    loadChildren: () => import('./documentation/business-document/business-document.module').then(m => m.BusinessDocumentModule),
  },
  {
    path: 'contract-metadata',
    data: { pageTitle: 'ContractMetadata' },
    loadChildren: () => import('./contract/contract-metadata/contract-metadata.module').then(m => m.ContractMetadataModule),
  },
  {
    path: 'fiscal-year',
    data: { pageTitle: 'FiscalYears' },
    loadChildren: () => import('./system/fiscal-year/fiscal-year.module').then(m => m.FiscalYearModule),
  },
  {
    path: 'fiscal-quarter',
    data: { pageTitle: 'FiscalQuarters' },
    loadChildren: () => import('./system/fiscal-quarter/fiscal-quarter.module').then(m => m.FiscalQuarterModule),
  },
  {
    path: 'fiscal-month',
    data: { pageTitle: 'FiscalMonths' },
    loadChildren: () => import('./system/fiscal-month/fiscal-month.module').then(m => m.FiscalMonthModule),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(erpCommonPageRoutes)]
})
export class ErpCommonPageRoutingModule {
}
