import { element, by, ElementFinder } from 'protractor';

export class PaymentInvoiceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-payment-invoice div table .btn-danger'));
  title = element.all(by.css('jhi-payment-invoice div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class PaymentInvoiceUpdatePage {
  pageTitle = element(by.id('jhi-payment-invoice-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  invoiceNumberInput = element(by.id('field_invoiceNumber'));
  invoiceDateInput = element(by.id('field_invoiceDate'));
  invoiceAmountInput = element(by.id('field_invoiceAmount'));
  paymentReferenceInput = element(by.id('field_paymentReference'));
  dealerNameInput = element(by.id('field_dealerName'));
  fileUploadTokenInput = element(by.id('field_fileUploadToken'));
  compilationTokenInput = element(by.id('field_compilationToken'));

  purchaseOrderSelect = element(by.id('field_purchaseOrder'));
  placeholderSelect = element(by.id('field_placeholder'));
  paymentLabelSelect = element(by.id('field_paymentLabel'));
  settlementCurrencySelect = element(by.id('field_settlementCurrency'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setInvoiceNumberInput(invoiceNumber: string): Promise<void> {
    await this.invoiceNumberInput.sendKeys(invoiceNumber);
  }

  async getInvoiceNumberInput(): Promise<string> {
    return await this.invoiceNumberInput.getAttribute('value');
  }

  async setInvoiceDateInput(invoiceDate: string): Promise<void> {
    await this.invoiceDateInput.sendKeys(invoiceDate);
  }

  async getInvoiceDateInput(): Promise<string> {
    return await this.invoiceDateInput.getAttribute('value');
  }

  async setInvoiceAmountInput(invoiceAmount: string): Promise<void> {
    await this.invoiceAmountInput.sendKeys(invoiceAmount);
  }

  async getInvoiceAmountInput(): Promise<string> {
    return await this.invoiceAmountInput.getAttribute('value');
  }

  async setPaymentReferenceInput(paymentReference: string): Promise<void> {
    await this.paymentReferenceInput.sendKeys(paymentReference);
  }

  async getPaymentReferenceInput(): Promise<string> {
    return await this.paymentReferenceInput.getAttribute('value');
  }

  async setDealerNameInput(dealerName: string): Promise<void> {
    await this.dealerNameInput.sendKeys(dealerName);
  }

  async getDealerNameInput(): Promise<string> {
    return await this.dealerNameInput.getAttribute('value');
  }

  async setFileUploadTokenInput(fileUploadToken: string): Promise<void> {
    await this.fileUploadTokenInput.sendKeys(fileUploadToken);
  }

  async getFileUploadTokenInput(): Promise<string> {
    return await this.fileUploadTokenInput.getAttribute('value');
  }

  async setCompilationTokenInput(compilationToken: string): Promise<void> {
    await this.compilationTokenInput.sendKeys(compilationToken);
  }

  async getCompilationTokenInput(): Promise<string> {
    return await this.compilationTokenInput.getAttribute('value');
  }

  async purchaseOrderSelectLastOption(): Promise<void> {
    await this.purchaseOrderSelect.all(by.tagName('option')).last().click();
  }

  async purchaseOrderSelectOption(option: string): Promise<void> {
    await this.purchaseOrderSelect.sendKeys(option);
  }

  getPurchaseOrderSelect(): ElementFinder {
    return this.purchaseOrderSelect;
  }

  async getPurchaseOrderSelectedOption(): Promise<string> {
    return await this.purchaseOrderSelect.element(by.css('option:checked')).getText();
  }

  async placeholderSelectLastOption(): Promise<void> {
    await this.placeholderSelect.all(by.tagName('option')).last().click();
  }

  async placeholderSelectOption(option: string): Promise<void> {
    await this.placeholderSelect.sendKeys(option);
  }

  getPlaceholderSelect(): ElementFinder {
    return this.placeholderSelect;
  }

  async getPlaceholderSelectedOption(): Promise<string> {
    return await this.placeholderSelect.element(by.css('option:checked')).getText();
  }

  async paymentLabelSelectLastOption(): Promise<void> {
    await this.paymentLabelSelect.all(by.tagName('option')).last().click();
  }

  async paymentLabelSelectOption(option: string): Promise<void> {
    await this.paymentLabelSelect.sendKeys(option);
  }

  getPaymentLabelSelect(): ElementFinder {
    return this.paymentLabelSelect;
  }

  async getPaymentLabelSelectedOption(): Promise<string> {
    return await this.paymentLabelSelect.element(by.css('option:checked')).getText();
  }

  async settlementCurrencySelectLastOption(): Promise<void> {
    await this.settlementCurrencySelect.all(by.tagName('option')).last().click();
  }

  async settlementCurrencySelectOption(option: string): Promise<void> {
    await this.settlementCurrencySelect.sendKeys(option);
  }

  getSettlementCurrencySelect(): ElementFinder {
    return this.settlementCurrencySelect;
  }

  async getSettlementCurrencySelectedOption(): Promise<string> {
    return await this.settlementCurrencySelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PaymentInvoiceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paymentInvoice-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paymentInvoice'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}