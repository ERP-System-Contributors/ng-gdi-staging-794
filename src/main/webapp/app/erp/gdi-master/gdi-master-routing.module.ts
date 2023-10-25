import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const gdiMasterRoutes: Routes = [
  {
    path: 'bank-branch-code',
    data: { pageTitle: 'BankBranchCodes' },
    loadChildren: () => import('./bank-branch-code/bank-branch-code.module').then(m => m.BankBranchCodeModule),
  },
  {
    path: 'outlet-status',
    data: { pageTitle: 'OutletStatuses' },
    loadChildren: () => import('./outlet-status/outlet-status.module').then(m => m.OutletStatusModule),
  },
  {
    path: 'outlet-type',
    data: { pageTitle: 'OutletTypes' },
    loadChildren: () => import('./outlet-type/outlet-type.module').then(m => m.OutletTypeModule),
  },
  {
    path: 'county-code',
    data: { pageTitle: 'CountyCodes' },
    loadChildren: () => import('./county-code/county-code.module').then(m => m.CountyCodeModule),
  },
  {
    path: 'customer-id-document-type',
    data: { pageTitle: 'CustomerIDDocumentTypes' },
    loadChildren: () =>
      import('./customer-id-document-type/customer-id-document-type.module').then(m => m.CustomerIDDocumentTypeModule),
  },
  {
    path: 'institution-code',
    data: { pageTitle: 'InstitutionCodes' },
    loadChildren: () => import('./institution-code/institution-code.module').then(m => m.InstitutionCodeModule),
  },
  {
    path: 'mfb-branch-code',
    data: { pageTitle: 'MfbBranchCodes' },
    loadChildren: () => import('./mfb-branch-code/mfb-branch-code.module').then(m => m.MfbBranchCodeModule),
  },
  {
    path: 'iso-country-code',
    data: { pageTitle: 'IsoCountryCodes' },
    loadChildren: () => import('./iso-country-code/iso-country-code.module').then(m => m.IsoCountryCodeModule),
  },
  {
    path: 'sub-county-code',
    data: { pageTitle: 'SubCountyCodes' },
    loadChildren: () => import('./sub-county-code/sub-county-code.module').then(m => m.SubCountyCodeModule),
  },
  {
    path: 'customer-type',
    data: { pageTitle: 'CustomerTypes' },
    loadChildren: () => import('./customer-type/customer-type.module').then(m => m.CustomerTypeModule),
  },
  {
    path: 'legal-status',
    data: { pageTitle: 'LegalStatuses' },
    loadChildren: () => import('./legal-status/legal-status.module').then(m => m.LegalStatusModule),
  },
  {
    path: 'insider-category-types',
    data: { pageTitle: 'InsiderCategoryTypes' },
    loadChildren: () => import('./insider-category-types/insider-category-types.module').then(m => m.InsiderCategoryTypesModule),
  },
  {
    path: 'gender-type',
    data: { pageTitle: 'GenderTypes' },
    loadChildren: () => import('./gender-type/gender-type.module').then(m => m.GenderTypeModule),
  },
  {
    path: 'institution-contact-details',
    data: { pageTitle: 'InstitutionContactDetails' },
    loadChildren: () =>
      import('./institution-contact-details/institution-contact-details.module').then(m => m.InstitutionContactDetailsModule),
  },
  {
    path: 'isic-economic-activity',
    data: { pageTitle: 'IsicEconomicActivities' },
    loadChildren: () => import('./isic-economic-activity/isic-economic-activity.module').then(m => m.IsicEconomicActivityModule),
  },
  {
    path: 'institution-status-type',
    data: { pageTitle: 'InstitutionStatusTypes' },
    loadChildren: () => import('./institution-status-type/institution-status-type.module').then(m => m.InstitutionStatusTypeModule),
  },
  {
    path: 'sna-sector-code',
    data: { pageTitle: 'SnaSectorCodes' },
    loadChildren: () => import('./sna-sector-code/sna-sector-code.module').then(m => m.SnaSectorCodeModule),
  },
  {
    path: 'business-segment-types',
    data: { pageTitle: 'BusinessSegmentTypes' },
    loadChildren: () => import('./business-segment-types/business-segment-types.module').then(m => m.BusinessSegmentTypesModule),
  },
  {
    path: 'iso-currency-code',
    data: { pageTitle: 'IsoCurrencyCodes' },
    loadChildren: () => import('./iso-currency-code/iso-currency-code.module').then(m => m.IsoCurrencyCodeModule),
  },
  {
    path: 'party-relation-type',
    data: { pageTitle: 'PartyRelationTypes' },
    loadChildren: () => import('./party-relation-type/party-relation-type.module').then(m => m.PartyRelationTypeModule),
  },
  {
    path: 'contract-status',
    data: { pageTitle: 'ContractStatuses' },
    loadChildren: () => import('./contract-status/contract-status.module').then(m => m.ContractStatusModule),
  },
  {
    path: 'account-type',
    data: { pageTitle: 'AccountTypes' },
    loadChildren: () => import('./account-type/account-type.module').then(m => m.AccountTypeModule),
  },
  {
    path: 'account-status-type',
    data: { pageTitle: 'AccountStatusTypes' },
    loadChildren: () => import('./account-status-type/account-status-type.module').then(m => m.AccountStatusTypeModule),
  },
  {
    path: 'account-ownership-type',
    data: { pageTitle: 'AccountOwnershipTypes' },
    loadChildren: () => import('./account-ownership-type/account-ownership-type.module').then(m => m.AccountOwnershipTypeModule),
  },
  {
    path: 'loan-product-type',
    data: { pageTitle: 'LoanProductTypes' },
    loadChildren: () => import('./loan-product-type/loan-product-type.module').then(m => m.LoanProductTypeModule),
  },
  {
    path: 'loan-performance-classification',
    data: { pageTitle: 'LoanPerformanceClassifications' },
    loadChildren: () =>
      import('./loan-performance-classification/loan-performance-classification.module').then(
        m => m.LoanPerformanceClassificationModule
      ),
  },
  {
    path: 'chart-of-accounts-code',
    data: { pageTitle: 'ChartOfAccountsCodes' },
    loadChildren: () => import('./chart-of-accounts-code/chart-of-accounts-code.module').then(m => m.ChartOfAccountsCodeModule),
  },
  {
    path: 'loan-repayment-frequency',
    data: { pageTitle: 'LoanRepaymentFrequencies' },
    loadChildren: () =>
      import('./loan-repayment-frequency/loan-repayment-frequency.module').then(m => m.LoanRepaymentFrequencyModule),
  },
  {
    path: 'gl-mapping',
    data: { pageTitle: 'GlMappings' },
    loadChildren: () => import('./gl-mapping/gl-mapping.module').then(m => m.GlMappingModule),
  },
  {
    path: 'moratorium-item',
    data: { pageTitle: 'MoratoriumItems' },
    loadChildren: () => import('./moratorium-item/moratorium-item.module').then(m => m.MoratoriumItemModule),
  },
  {
    path: 'collateral-type',
    data: { pageTitle: 'CollateralTypes' },
    loadChildren: () => import('./collateral-type/collateral-type.module').then(m => m.CollateralTypeModule),
  },
  {
    path: 'loan-application-type',
    data: { pageTitle: 'LoanApplicationTypes' },
    loadChildren: () => import('./loan-application-type/loan-application-type.module').then(m => m.LoanApplicationTypeModule),
  },
  {
    path: 'loan-application-status',
    data: { pageTitle: 'LoanApplicationStatuses' },
    loadChildren: () => import('./loan-application-status/loan-application-status.module').then(m => m.LoanApplicationStatusModule),
  },
  {
    path: 'loan-restructure-item',
    data: { pageTitle: 'LoanRestructureItems' },
    loadChildren: () => import('./loan-restructure-item/loan-restructure-item.module').then(m => m.LoanRestructureItemModule),
  },
  {
    path: 'loan-decline-reason',
    data: { pageTitle: 'LoanDeclineReasons' },
    loadChildren: () => import('./loan-decline-reason/loan-decline-reason.module').then(m => m.LoanDeclineReasonModule),
  },
  {
    path: 'loan-restructure-flag',
    data: { pageTitle: 'LoanRestructureFlags' },
    loadChildren: () => import('./loan-restructure-flag/loan-restructure-flag.module').then(m => m.LoanRestructureFlagModule),
  },
  {
    path: 'card-types',
    data: { pageTitle: 'CardTypes' },
    loadChildren: () => import('./card-types/card-types.module').then(m => m.CardTypesModule),
  },
  {
    path: 'card-brand-type',
    data: { pageTitle: 'CardBrandTypes' },
    loadChildren: () => import('./card-brand-type/card-brand-type.module').then(m => m.CardBrandTypeModule),
  },
  {
    path: 'card-status-flag',
    data: { pageTitle: 'CardStatusFlags' },
    loadChildren: () => import('./card-status-flag/card-status-flag.module').then(m => m.CardStatusFlagModule),
  },
  {
    path: 'card-charges',
    data: { pageTitle: 'CardCharges' },
    loadChildren: () => import('./card-charges/card-charges.module').then(m => m.CardChargesModule),
  },
  {
    path: 'card-category-type',
    data: { pageTitle: 'CardCategoryTypes' },
    loadChildren: () => import('./card-category-type/card-category-type.module').then(m => m.CardCategoryTypeModule),
  },
  {
    path: 'card-class-type',
    data: { pageTitle: 'CardClassTypes' },
    loadChildren: () => import('./card-class-type/card-class-type.module').then(m => m.CardClassTypeModule),
  },
  {
    path: 'card-performance-flag',
    data: { pageTitle: 'CardPerformanceFlags' },
    loadChildren: () => import('./card-performance-flag/card-performance-flag.module').then(m => m.CardPerformanceFlagModule),
  },
  {
    path: 'terminal-functions',
    data: { pageTitle: 'TerminalFunctions' },
    loadChildren: () => import('./terminal-functions/terminal-functions.module').then(m => m.TerminalFunctionsModule),
  },
  {
    path: 'terminal-types',
    data: { pageTitle: 'TerminalTypes' },
    loadChildren: () => import('./terminal-types/terminal-types.module').then(m => m.TerminalTypesModule),
  },
  {
    path: 'customer-complaint-status-type',
    data: { pageTitle: 'CustomerComplaintStatusTypes' },
    loadChildren: () =>
      import('./customer-complaint-status-type/customer-complaint-status-type.module').then(
        m => m.CustomerComplaintStatusTypeModule
      ),
  },
  {
    path: 'channel-type',
    data: { pageTitle: 'ChannelTypes' },
    loadChildren: () => import('./channel-type/channel-type.module').then(m => m.ChannelTypeModule),
  },
  {
    path: 'fx-customer-type',
    data: { pageTitle: 'FxCustomerTypes' },
    loadChildren: () => import('./fx-customer-type/fx-customer-type.module').then(m => m.FxCustomerTypeModule),
  },
  {
    path: 'fx-transaction-type',
    data: { pageTitle: 'FxTransactionTypes' },
    loadChildren: () => import('./fx-transaction-type/fx-transaction-type.module').then(m => m.FxTransactionTypeModule),
  },
  {
    path: 'fx-transaction-rate-type',
    data: { pageTitle: 'FxTransactionRateTypes' },
    loadChildren: () =>
      import('./fx-transaction-rate-type/fx-transaction-rate-type.module').then(m => m.FxTransactionRateTypeModule),
  },
  {
    path: 'fx-rate-type',
    data: { pageTitle: 'FxRateTypes' },
    loadChildren: () => import('./fx-rate-type/fx-rate-type.module').then(m => m.FxRateTypeModule),
  },
  {
    path: 'fx-transaction-channel-type',
    data: { pageTitle: 'FxTransactionChannelTypes' },
    loadChildren: () =>
      import('./fx-transaction-channel-type/fx-transaction-channel-type.module').then(m => m.FxTransactionChannelTypeModule),
  },
  {
    path: 'fx-receipt-purpose-type',
    data: { pageTitle: 'FxReceiptPurposeTypes' },
    loadChildren: () => import('./fx-receipt-purpose-type/fx-receipt-purpose-type.module').then(m => m.FxReceiptPurposeTypeModule),
  },
  {
    path: 'fraud-type',
    data: { pageTitle: 'FraudTypes' },
    loadChildren: () => import('./fraud-type/fraud-type.module').then(m => m.FraudTypeModule),
  },
  {
    path: 'fraud-category-flag',
    data: { pageTitle: 'FraudCategoryFlags' },
    loadChildren: () => import('./fraud-category-flag/fraud-category-flag.module').then(m => m.FraudCategoryFlagModule),
  },
  {
    path: 'shareholder-type',
    data: { pageTitle: 'ShareholderTypes' },
    loadChildren: () => import('./shareholder-type/shareholder-type.module').then(m => m.ShareholderTypeModule),
  },
  {
    path: 'merchant-type',
    data: { pageTitle: 'MerchantTypes' },
    loadChildren: () => import('./merchant-type/merchant-type.module').then(m => m.MerchantTypeModule),
  },
  {
    path: 'card-fraud-incident-category',
    data: { pageTitle: 'CardFraudIncidentCategories' },
    loadChildren: () =>
      import('./card-fraud-incident-category/card-fraud-incident-category.module').then(m => m.CardFraudIncidentCategoryModule),
  },
  {
    path: 'academic-qualification',
    data: { pageTitle: 'AcademicQualifications' },
    loadChildren: () => import('./academic-qualification/academic-qualification.module').then(m => m.AcademicQualificationModule),
  },
  {
    path: 'professional-qualification',
    data: { pageTitle: 'ProfessionalQualifications' },
    loadChildren: () =>
      import('./professional-qualification/professional-qualification.module').then(m => m.ProfessionalQualificationModule),
  },
  {
    path: 'employment-terms',
    data: { pageTitle: 'EmploymentTerms' },
    loadChildren: () => import('./employment-terms/employment-terms.module').then(m => m.EmploymentTermsModule),
  },
  {
    path: 'committee-type',
    data: { pageTitle: 'CommitteeTypes' },
    loadChildren: () => import('./committee-type/committee-type.module').then(m => m.CommitteeTypeModule),
  },
  {
    path: 'executive-category-type',
    data: { pageTitle: 'ExecutiveCategoryTypes' },
    loadChildren: () => import('./executive-category-type/executive-category-type.module').then(m => m.ExecutiveCategoryTypeModule),
  },
  {
    path: 'department-type',
    data: { pageTitle: 'DepartmentTypes' },
    loadChildren: () => import('./department-type/department-type.module').then(m => m.DepartmentTypeModule),
  },
  {
    path: 'share-holding-flag',
    data: { pageTitle: 'ShareHoldingFlags' },
    loadChildren: () => import('./share-holding-flag/share-holding-flag.module').then(m => m.ShareHoldingFlagModule),
  },
  {
    path: 'anticipated-maturity-periood',
    data: { pageTitle: 'AnticipatedMaturityPerioods' },
    loadChildren: () =>
      import('./anticipated-maturity-periood/anticipated-maturity-periood.module').then(m => m.AnticipatedMaturityPerioodModule),
  },
  {
    path: 'interest-calc-method',
    data: { pageTitle: 'InterestCalcMethods' },
    loadChildren: () => import('./interest-calc-method/interest-calc-method.module').then(m => m.InterestCalcMethodModule),
  },
  {
    path: 'security-type',
    data: { pageTitle: 'SecurityTypes' },
    loadChildren: () => import('./security-type/security-type.module').then(m => m.SecurityTypeModule),
  },
  {
    path: 'security-tenure',
    data: { pageTitle: 'SecurityTenures' },
    loadChildren: () => import('./security-tenure/security-tenure.module').then(m => m.SecurityTenureModule),
  },
  {
    path: 'financial-derivative-type-code',
    data: { pageTitle: 'FinancialDerivativeTypeCodes' },
    loadChildren: () =>
      import('./financial-derivative-type-code/financial-derivative-type-code.module').then(
        m => m.FinancialDerivativeTypeCodeModule
      ),
  },
  {
    path: 'security-classification-type',
    data: { pageTitle: 'SecurityClassificationTypes' },
    loadChildren: () =>
      import('./security-classification-type/security-classification-type.module').then(m => m.SecurityClassificationTypeModule),
  },
  {
    path: 'derivative-sub-type',
    data: { pageTitle: 'DerivativeSubTypes' },
    loadChildren: () => import('./derivative-sub-type/derivative-sub-type.module').then(m => m.DerivativeSubTypeModule),
  },
  {
    path: 'derivative-underlying-asset',
    data: { pageTitle: 'DerivativeUnderlyingAssets' },
    loadChildren: () =>
      import('./derivative-underlying-asset/derivative-underlying-asset.module').then(m => m.DerivativeUnderlyingAssetModule),
  },
  {
    path: 'currency-authenticity-flag',
    data: { pageTitle: 'CurrencyAuthenticityFlags' },
    loadChildren: () =>
      import('./currency-authenticity-flag/currency-authenticity-flag.module').then(m => m.CurrencyAuthenticityFlagModule),
  },
  {
    path: 'kenyan-currency-denomination',
    data: { pageTitle: 'KenyanCurrencyDenominations' },
    loadChildren: () =>
      import('./kenyan-currency-denomination/kenyan-currency-denomination.module').then(m => m.KenyanCurrencyDenominationModule),
  },
  {
    path: 'currency-serviceability-flag',
    data: { pageTitle: 'CurrencyServiceabilityFlags' },
    loadChildren: () =>
      import('./currency-serviceability-flag/currency-serviceability-flag.module').then(m => m.CurrencyServiceabilityFlagModule),
  },
  {
    path: 'remittance-flag',
    data: { pageTitle: 'RemittanceFlags' },
    loadChildren: () => import('./remittance-flag/remittance-flag.module').then(m => m.RemittanceFlagModule),
  },
  {
    path: 'sources-of-funds-type-code',
    data: { pageTitle: 'SourcesOfFundsTypeCodes' },
    loadChildren: () =>
      import('./sources-of-funds-type-code/sources-of-funds-type-code.module').then(m => m.SourcesOfFundsTypeCodeModule),
  },
  {
    path: 'source-remittance-purpose-type',
    data: { pageTitle: 'SourceRemittancePurposeTypes' },
    loadChildren: () =>
      import('./source-remittance-purpose-type/source-remittance-purpose-type.module').then(
        m => m.SourceRemittancePurposeTypeModule
      ),
  },
  {
    path: 'staff-current-employment-status',
    data: { pageTitle: 'StaffCurrentEmploymentStatuses' },
    loadChildren: () =>
      import('./staff-current-employment-status/staff-current-employment-status.module').then(
        m => m.StaffCurrentEmploymentStatusModule
      ),
  },
  {
    path: 'staff-role-type',
    data: { pageTitle: 'StaffRoleTypes' },
    loadChildren: () => import('./staff-role-type/staff-role-type.module').then(m => m.StaffRoleTypeModule),
  },
  {
    path: 'management-member-type',
    data: { pageTitle: 'ManagementMemberTypes' },
    loadChildren: () => import('./management-member-type/management-member-type.module').then(m => m.ManagementMemberTypeModule),
  },
  {
    path: 'ultimate-beneficiary-types',
    data: { pageTitle: 'UltimateBeneficiaryTypes' },
    loadChildren: () =>
      import('./ultimate-beneficiary-types/ultimate-beneficiary-types.module').then(m => m.UltimateBeneficiaryTypesModule),
  },
  {
    path: 'bounced-cheque-categories',
    data: { pageTitle: 'BouncedChequeCategories' },
    loadChildren: () =>
      import('./bounced-cheque-categories/bounced-cheque-categories.module').then(m => m.BouncedChequeCategoriesModule),
  },
  {
    path: 'reasons-for-bounced-cheque',
    data: { pageTitle: 'ReasonsForBouncedCheques' },
    loadChildren: () =>
      import('./reasons-for-bounced-cheque/reasons-for-bounced-cheque.module').then(m => m.ReasonsForBouncedChequeModule),
  },
  {
    path: 'crb-account-holder-type',
    data: { pageTitle: 'CrbAccountHolderTypes' },
    loadChildren: () => import('./crb-account-holder-type/crb-account-holder-type.module').then(m => m.CrbAccountHolderTypeModule),
  },
  {
    path: 'crb-account-status',
    data: { pageTitle: 'CrbAccountStatuses' },
    loadChildren: () => import('./crb-account-status/crb-account-status.module').then(m => m.CrbAccountStatusModule),
  },
  {
    path: 'crb-submitting-institution-category',
    data: { pageTitle: 'CrbSubmittingInstitutionCategories' },
    loadChildren: () =>
      import('./crb-submitting-institution-category/crb-submitting-institution-category.module').then(
        m => m.CrbSubmittingInstitutionCategoryModule
      ),
  },
  {
    path: 'crb-amount-category-band',
    data: { pageTitle: 'CrbAmountCategoryBands' },
    loadChildren: () =>
      import('./crb-amount-category-band/crb-amount-category-band.module').then(m => m.CrbAmountCategoryBandModule),
  },
  {
    path: 'crb-report-request-reasons',
    data: { pageTitle: 'CrbReportRequestReasons' },
    loadChildren: () =>
      import('./crb-report-request-reasons/crb-report-request-reasons.module').then(m => m.CrbReportRequestReasonsModule),
  },
  {
    path: 'crb-complaint-type',
    data: { pageTitle: 'CrbComplaintTypes' },
    loadChildren: () => import('./crb-complaint-type/crb-complaint-type.module').then(m => m.CrbComplaintTypeModule),
  },
  {
    path: 'crb-complaint-status-type',
    data: { pageTitle: 'CrbComplaintStatusTypes' },
    loadChildren: () =>
      import('./crb-complaint-status-type/crb-complaint-status-type.module').then(m => m.CrbComplaintStatusTypeModule),
  },
  {
    path: 'crb-record-file-type',
    data: { pageTitle: 'CrbRecordFileTypes' },
    loadChildren: () => import('./crb-record-file-type/crb-record-file-type.module').then(m => m.CrbRecordFileTypeModule),
  },
  {
    path: 'crb-credit-application-status',
    data: { pageTitle: 'CrbCreditApplicationStatuses' },
    loadChildren: () =>
      import('./crb-credit-application-status/crb-credit-application-status.module').then(m => m.CrbCreditApplicationStatusModule),
  },
  {
    path: 'crb-customer-type',
    data: { pageTitle: 'CrbCustomerTypes' },
    loadChildren: () => import('./crb-customer-type/crb-customer-type.module').then(m => m.CrbCustomerTypeModule),
  },
  {
    path: 'crb-subscription-status-type-code',
    data: { pageTitle: 'CrbSubscriptionStatusTypeCodes' },
    loadChildren: () =>
      import('./crb-subscription-status-type-code/crb-subscription-status-type-code.module').then(
        m => m.CrbSubscriptionStatusTypeCodeModule
      ),
  },
  {
    path: 'crb-nature-of-information',
    data: { pageTitle: 'CrbNatureOfInformations' },
    loadChildren: () =>
      import('./crb-nature-of-information/crb-nature-of-information.module').then(m => m.CrbNatureOfInformationModule),
  },
  {
    path: 'crb-source-of-information-type',
    data: { pageTitle: 'CrbSourceOfInformationTypes' },
    loadChildren: () =>
      import('./crb-source-of-information-type/crb-source-of-information-type.module').then(
        m => m.CrbSourceOfInformationTypeModule
      ),
  },
  {
    path: 'crb-product-service-fee-type',
    data: { pageTitle: 'CrbProductServiceFeeTypes' },
    loadChildren: () =>
      import('./crb-product-service-fee-type/crb-product-service-fee-type.module').then(m => m.CrbProductServiceFeeTypeModule),
  },
  {
    path: 'crb-file-transmission-status',
    data: { pageTitle: 'CrbFileTransmissionStatuses' },
    loadChildren: () =>
      import('./crb-file-transmission-status/crb-file-transmission-status.module').then(m => m.CrbFileTransmissionStatusModule),
  },
  {
    path: 'crb-agent-service-type',
    data: { pageTitle: 'CrbAgentServiceTypes' },
    loadChildren: () => import('./crb-agent-service-type/crb-agent-service-type.module').then(m => m.CrbAgentServiceTypeModule),
  },
  {
    path: 'crb-credit-facility-type',
    data: { pageTitle: 'CrbCreditFacilityTypes' },
    loadChildren: () =>
      import('./crb-credit-facility-type/crb-credit-facility-type.module').then(m => m.CrbCreditFacilityTypeModule),
  },
  {
    path: 'crb-gl-code',
    data: { pageTitle: 'CrbGlCodes' },
    loadChildren: () => import('./crb-gl-code/crb-gl-code.module').then(m => m.CrbGlCodeModule),
  },
  {
    path: 'crb-aging-bands',
    data: { pageTitle: 'CrbAgingBands' },
    loadChildren: () => import('./crb-aging-bands/crb-aging-bands.module').then(m => m.CrbAgingBandsModule),
  },
  {
    path: 'crb-report-view-band',
    data: { pageTitle: 'CrbReportViewBands' },
    loadChildren: () => import('./crb-report-view-band/crb-report-view-band.module').then(m => m.CrbReportViewBandModule),
  },
  {
    path: 'crb-data-submitting-institutions',
    data: { pageTitle: 'CrbDataSubmittingInstitutions' },
    loadChildren: () =>
      import('./crb-data-submitting-institutions/crb-data-submitting-institutions.module').then(
        m => m.CrbDataSubmittingInstitutionsModule
      ),
  },
  {
    path: 'bank-transaction-type',
    data: { pageTitle: 'BankTransactionTypes' },
    loadChildren: () => import('./bank-transaction-type/bank-transaction-type.module').then(m => m.BankTransactionTypeModule),
  },
  {
    path: 'agricultural-enterprise-activity-type',
    data: { pageTitle: 'AgriculturalEnterpriseActivityTypes' },
    loadChildren: () =>
      import('./agricultural-enterprise-activity-type/agricultural-enterprise-activity-type.module').then(
        m => m.AgriculturalEnterpriseActivityTypeModule
      ),
  },
  {
    path: 'interbank-sector-code',
    data: { pageTitle: 'InterbankSectorCodes' },
    loadChildren: () => import('./interbank-sector-code/interbank-sector-code.module').then(m => m.InterbankSectorCodeModule),
  },
  {
    path: 'ultimate-beneficiary-category',
    data: { pageTitle: 'UltimateBeneficiaryCategories' },
    loadChildren: () =>
      import('./ultimate-beneficiary-category/ultimate-beneficiary-category.module').then(m => m.UltimateBeneficiaryCategoryModule),
  },
  {
    path: 'issuers-of-securities',
    data: { pageTitle: 'IssuersOfSecurities' },
    loadChildren: () => import('./issuers-of-securities/issuers-of-securities.module').then(m => m.IssuersOfSecuritiesModule),
  },
  {
    path: 'loan-account-category',
    data: { pageTitle: 'LoanAccountCategories' },
    loadChildren: () => import('./loan-account-category/loan-account-category.module').then(m => m.LoanAccountCategoryModule),
  },
  {
    path: 'counterparty-type',
    data: { pageTitle: 'CounterpartyTypes' },
    loadChildren: () => import('./counterparty-type/counterparty-type.module').then(m => m.CounterpartyTypeModule),
  },
  {
    path: 'counter-party-deal-type',
    data: { pageTitle: 'CounterPartyDealTypes' },
    loadChildren: () => import('./counter-party-deal-type/counter-party-deal-type.module').then(m => m.CounterPartyDealTypeModule),
  },
  {
    path: 'counter-party-category',
    data: { pageTitle: 'CounterPartyCategories' },
    loadChildren: () => import('./counter-party-category/counter-party-category.module').then(m => m.CounterPartyCategoryModule),
  },
  {
    path: 'acquiring-issuing-flag',
    data: { pageTitle: 'AcquiringIssuingFlags' },
    loadChildren: () => import('./acquiring-issuing-flag/acquiring-issuing-flag.module').then(m => m.AcquiringIssuingFlagModule),
  },
  {
    path: 'credit-card-ownership',
    data: { pageTitle: 'CreditCardOwnerships' },
    loadChildren: () => import('./credit-card-ownership/credit-card-ownership.module').then(m => m.CreditCardOwnershipModule),
  },
  {
    path: 'category-of-security',
    data: { pageTitle: 'CategoryOfSecurities' },
    loadChildren: () => import('./category-of-security/category-of-security.module').then(m => m.CategoryOfSecurityModule),
  },
  {
    path: 'nature-of-customer-complaints',
    data: { pageTitle: 'NatureOfCustomerComplaints' },
    loadChildren: () =>
      import('./nature-of-customer-complaints/nature-of-customer-complaints.module').then(m => m.NatureOfCustomerComplaintsModule),
  },
  {
    path: 'gdi-master-data-index',
    data: { pageTitle: 'GdiMasterDataIndices' },
    loadChildren: () => import('./gdi-master-data-index/gdi-master-data-index.module').then(m => m.GdiMasterDataIndexModule),
  },
  {
    path: 'gdi-transaction-data-index',
    data: { pageTitle: 'GdiTransactionDataIndices' },
    loadChildren: () =>
      import('./gdi-transaction-data-index/gdi-transaction-data-index.module').then(m => m.GdiTransactionDataIndexModule),
  },
  {
    path: 'product-type',
    data: { pageTitle: 'ProductTypes' },
    loadChildren: () => import('./product-type/product-type.module').then(m => m.ProductTypeModule),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(gdiMasterRoutes)]
})
export class GdiMasterRoutingModule {
}
