describe('E2E Stellar-burger test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

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

    cy.get('[data-cy="ingredients_constructor"').each(($li) => {
      cy.wrap($li).should('contain.text', 'Биокотлета');
    });
  });
});
