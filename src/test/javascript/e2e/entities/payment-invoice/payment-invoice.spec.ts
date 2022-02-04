import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PaymentInvoiceComponentsPage,
  /* PaymentInvoiceDeleteDialog, */
  PaymentInvoiceUpdatePage,
} from './payment-invoice.page-object';

const expect = chai.expect;

describe('PaymentInvoice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentInvoiceComponentsPage: PaymentInvoiceComponentsPage;
  let paymentInvoiceUpdatePage: PaymentInvoiceUpdatePage;
  /* let paymentInvoiceDeleteDialog: PaymentInvoiceDeleteDialog; */
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PaymentInvoices', async () => {
    await navBarPage.goToEntity('payment-invoice');
    paymentInvoiceComponentsPage = new PaymentInvoiceComponentsPage();
    await browser.wait(ec.visibilityOf(paymentInvoiceComponentsPage.title), 5000);
    expect(await paymentInvoiceComponentsPage.getTitle()).to.eq('Payment Invoices');
    await browser.wait(
      ec.or(ec.visibilityOf(paymentInvoiceComponentsPage.entities), ec.visibilityOf(paymentInvoiceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PaymentInvoice page', async () => {
    await paymentInvoiceComponentsPage.clickOnCreateButton();
    paymentInvoiceUpdatePage = new PaymentInvoiceUpdatePage();
    expect(await paymentInvoiceUpdatePage.getPageTitle()).to.eq('Create or edit a Payment Invoice');
    await paymentInvoiceUpdatePage.cancel();
  });

  /* it('should create and save PaymentInvoices', async () => {
        const nbButtonsBeforeCreate = await paymentInvoiceComponentsPage.countDeleteButtons();

        await paymentInvoiceComponentsPage.clickOnCreateButton();

        await promise.all([
            paymentInvoiceUpdatePage.setInvoiceNumberInput('invoiceNumber'),
            paymentInvoiceUpdatePage.setInvoiceDateInput('2000-12-31'),
            paymentInvoiceUpdatePage.setInvoiceAmountInput('5'),
            paymentInvoiceUpdatePage.setPaymentReferenceInput('paymentReference'),
            paymentInvoiceUpdatePage.setDealerNameInput('dealerName'),
            paymentInvoiceUpdatePage.setFileUploadTokenInput('fileUploadToken'),
            paymentInvoiceUpdatePage.setCompilationTokenInput('compilationToken'),
            // paymentInvoiceUpdatePage.purchaseOrderSelectLastOption(),
            // paymentInvoiceUpdatePage.placeholderSelectLastOption(),
            // paymentInvoiceUpdatePage.paymentLabelSelectLastOption(),
            paymentInvoiceUpdatePage.settlementCurrencySelectLastOption(),
        ]);

        await paymentInvoiceUpdatePage.save();
        expect(await paymentInvoiceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await paymentInvoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last PaymentInvoice', async () => {
        const nbButtonsBeforeDelete = await paymentInvoiceComponentsPage.countDeleteButtons();
        await paymentInvoiceComponentsPage.clickOnLastDeleteButton();

        paymentInvoiceDeleteDialog = new PaymentInvoiceDeleteDialog();
        expect(await paymentInvoiceDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Payment Invoice?');
        await paymentInvoiceDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(paymentInvoiceComponentsPage.title), 5000);

        expect(await paymentInvoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
