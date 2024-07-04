import { refreshToken } from './../../src/utils/burger-api';
describe('E2E Stellar-burger constructor test', () => {
  beforeEach(() => {
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  describe('Add ingredient test', () => {
    it('should add a bun ingredient', () => {
      cy.get("[data-cy='buns']").contains('Добавить').click();
      cy.get('[data-cy="top-bun"]').should('contain', 'Булка');
      cy.get('[data-cy="bottom-bun"]').should('contain', 'Булка');
    });

    it('should add an ingredient', () => {
      cy.get("[data-cy='mains']").contains('Добавить').click();
      cy.get('[data-cy="ingredients_constructor"]').should(
        'contain',
        'Биокотлета'
      );
    });
  });

  describe('Modal window test', () => {
    it('should open modal window', () => {
      cy.get("[data-cy='buns']").find('a').first().click();
      cy.get("[data-cy='modal-ingredients']").should('exist');
    });

    it('should close modal window by clicking at close button', () => {
      cy.get("[data-cy='buns']").find('a').first().click();
      cy.get("[data-cy='modal-ingredients']").within(() => {
        cy.get('button').click();
      });
      cy.get("[data-cy='modal-ingredients']").should('not.exist');
    });

    it('should close modal window  by clicking outside of window', () => {
      cy.get("[data-cy='buns']").find('a').first().click();
      cy.get("[data-cy='modal-overlay']").click('topLeft', { force: true });
      cy.get("[data-cy='modal-ingredients']").should('not.exist');
    });
  });
});
