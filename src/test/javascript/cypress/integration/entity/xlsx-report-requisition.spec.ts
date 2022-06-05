import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('XlsxReportRequisition e2e test', () => {
  const xlsxReportRequisitionPageUrl = '/xlsx-report-requisition';
  const xlsxReportRequisitionPageUrlPattern = new RegExp('/xlsx-report-requisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const xlsxReportRequisitionSample = { reportName: 'transition Legacy', reportId: 'a297d3b8-8367-4883-aa88-4c54a5a979bd' };

  let xlsxReportRequisition: any;
  let reportTemplate: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/report-templates',
      body: {
        catalogueNumber: 'transmit Hat',
        description: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        notes: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
        notesContentType: 'unknown',
        reportFile: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
        reportFileContentType: 'unknown',
        compileReportFile: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
        compileReportFileContentType: 'unknown',
      },
    }).then(({ body }) => {
      reportTemplate = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/xlsx-report-requisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/xlsx-report-requisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/xlsx-report-requisitions/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/report-templates', {
      statusCode: 200,
      body: [reportTemplate],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (xlsxReportRequisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/xlsx-report-requisitions/${xlsxReportRequisition.id}`,
      }).then(() => {
        xlsxReportRequisition = undefined;
      });
    }
  });

  afterEach(() => {
    if (reportTemplate) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-templates/${reportTemplate.id}`,
      }).then(() => {
        reportTemplate = undefined;
      });
    }
  });

  it('XlsxReportRequisitions menu should load XlsxReportRequisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('xlsx-report-requisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('XlsxReportRequisition').should('exist');
    cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
  });

  describe('XlsxReportRequisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(xlsxReportRequisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create XlsxReportRequisition page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/xlsx-report-requisition/new$'));
        cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/xlsx-report-requisitions',

          body: {
            ...xlsxReportRequisitionSample,
            reportTemplate: reportTemplate,
          },
        }).then(({ body }) => {
          xlsxReportRequisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/xlsx-report-requisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [xlsxReportRequisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(xlsxReportRequisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details XlsxReportRequisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('xlsxReportRequisition');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });

      it('edit button click should load edit XlsxReportRequisition page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });

      it('last delete button click should delete instance of XlsxReportRequisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('xlsxReportRequisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);

        xlsxReportRequisition = undefined;
      });
    });
  });

  describe('new XlsxReportRequisition page', () => {
    beforeEach(() => {
      cy.visit(`${xlsxReportRequisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
    });

    it('should create an instance of XlsxReportRequisition', () => {
      cy.get(`[data-cy="reportName"]`).type('Internal').should('have.value', 'Internal');

      cy.get(`[data-cy="reportDate"]`).type('2022-06-04').should('have.value', '2022-06-04');

      cy.get(`[data-cy="userPassword"]`).type('open-source Ergonomic').should('have.value', 'open-source Ergonomic');

      cy.get(`[data-cy="reportStatus"]`).select('GENERATING');

      cy.get(`[data-cy="reportId"]`)
        .type('afe4504e-e24d-4329-ba95-2089d2274be5')
        .invoke('val')
        .should('match', new RegExp('afe4504e-e24d-4329-ba95-2089d2274be5'));

      cy.get(`[data-cy="reportTemplate"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        xlsxReportRequisition = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
    });
  });
});
