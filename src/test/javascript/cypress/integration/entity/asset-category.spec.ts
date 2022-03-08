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

describe('AssetCategory e2e test', () => {
  const assetCategoryPageUrl = '/asset-category';
  const assetCategoryPageUrlPattern = new RegExp('/asset-category(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const assetCategorySample = { assetCategoryName: 'bus Steel redefine' };

  let assetCategory: any;
  let depreciationMethod: any;

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
      url: '/api/depreciation-methods',
      body: { depreciationMethodName: 'optical', description: 'green ADP' },
    }).then(({ body }) => {
      depreciationMethod = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/asset-categories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/asset-categories').as('postEntityRequest');
    cy.intercept('DELETE', '/api/asset-categories/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/depreciation-methods', {
      statusCode: 200,
      body: [depreciationMethod],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (assetCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/asset-categories/${assetCategory.id}`,
      }).then(() => {
        assetCategory = undefined;
      });
    }
  });

  afterEach(() => {
    if (depreciationMethod) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/depreciation-methods/${depreciationMethod.id}`,
      }).then(() => {
        depreciationMethod = undefined;
      });
    }
  });

  it('AssetCategories menu should load AssetCategories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('asset-category');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AssetCategory').should('exist');
    cy.url().should('match', assetCategoryPageUrlPattern);
  });

  describe('AssetCategory page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(assetCategoryPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AssetCategory page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/asset-category/new$'));
        cy.getEntityCreateUpdateHeading('AssetCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', assetCategoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/asset-categories',

          body: {
            ...assetCategorySample,
            depreciationMethod: depreciationMethod,
          },
        }).then(({ body }) => {
          assetCategory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/asset-categories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [assetCategory],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(assetCategoryPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AssetCategory page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('assetCategory');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', assetCategoryPageUrlPattern);
      });

      it('edit button click should load edit AssetCategory page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', assetCategoryPageUrlPattern);
      });

      it('last delete button click should delete instance of AssetCategory', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('assetCategory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', assetCategoryPageUrlPattern);

        assetCategory = undefined;
      });
    });
  });

  describe('new AssetCategory page', () => {
    beforeEach(() => {
      cy.visit(`${assetCategoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('AssetCategory');
    });

    it('should create an instance of AssetCategory', () => {
      cy.get(`[data-cy="assetCategoryName"]`).type('user-facing').should('have.value', 'user-facing');

      cy.get(`[data-cy="description"]`).type('CSS SSL Argentina').should('have.value', 'CSS SSL Argentina');

      cy.get(`[data-cy="notes"]`).type('Loan').should('have.value', 'Loan');

      cy.get(`[data-cy="depreciationMethod"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        assetCategory = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', assetCategoryPageUrlPattern);
    });
  });
});