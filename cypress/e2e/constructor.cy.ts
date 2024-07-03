describe('E2E Stellar-burger test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  describe('Add ingredient test', () => {
    it('should add a bun ingredient', () => {
      cy.contains('.text', 'Булка')
        .parents('li')
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get('[data-cy="top-bun"]').should('contain', 'Булка');
      cy.get('[data-cy="bottom-bun"]').should('contain', 'Булка');
    });

    it('should add an ingredient', () => {
      cy.contains('.text', `Биокотлета`)
        .parents('li')
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get('[data-cy="ingredients_constructor"').each((li) => {
        cy.wrap(li).should('contain.text', 'Биокотлета');
      });
    });
  });

  describe('Modal window test', () => {
    it('should open modal window', () => {
      cy.contains('.text', 'Булка').parents('a').click();
      cy.get("[data-cy='modal-ingredients']").should('exist');
    });

    it('should close modal window by clicking at close button', () => {
      cy.contains('.text', 'Булка').parents('a').click();
      cy.get("[data-cy='modal-ingredients']").within(() => {
        cy.get('button').click();
      });
      cy.get("[data-cy='modal-ingredients']").should('not.exist');
    });

    it('should close modal window  by clicking outside of window', () => {
      cy.contains('.text', 'Булка').parents('a').click();
      cy.get("[data-cy='modal-overlay']").click('topLeft', { force: true });
      cy.get("[data-cy='modal-ingredients']").should('not.exist');
    });
  });
});
