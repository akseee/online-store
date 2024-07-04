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
      cy.get('[data-cy="ingredient-row"]').should('contain', 'Биокотлета');
    });
  });

  describe('Modal window test', () => {
    it('should open modal window', () => {
      cy.get("[data-cy='buns']").find('a').first().click();
      cy.get("[data-cy='modal-window']").should('exist');
    });

    it('should close modal window by clicking at close button', () => {
      cy.get("[data-cy='buns']").find('a').first().click();
      cy.get("[data-cy='modal-window']").within(() => {
        cy.get('button').click();
      });
      cy.get("[data-cy='modal-window']").should('not.exist');
    });

    it('should close modal window  by clicking outside of window', () => {
      cy.get("[data-cy='buns']").find('a').first().click();
      cy.get("[data-cy='modal-overlay']").click('topLeft', { force: true });
      cy.get("[data-cy='modal-window']").should('not.exist');
    });
  });
});

// describe('E2E Stellar-burger order test', () => {
//   beforeEach(() => {
//     cy.viewport(1300, 800);
//     cy.visit('http://localhost:4000');
//     cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
//     cy.intercept('POST', 'api/orders', { fixture: 'postOrderData.json' }).as(
//       'postOrderData'
//     );

//     window.localStorage.setItem('refreshToken', JSON.stringify('refresh-test'));
//     cy.setCookie('accessToken', 'acesss-test');
//   });

//   afterEach(() => {
//     cy.clearCookie('refreshToken');
//     cy.clearCookie('accessToken');
//   });

//   it('', () => {
//     cy.get("[data-cy='buns']").contains('Добавить').click();
//     cy.get("[data-cy='mains']").contains('Добавить').click();
//     cy.get("[data-cy='sauces']").contains('Добавить').click();

//     cy.get("[data-cy='constructor']").contains('Оформить заказ').click();

//     cy.wait('@postOrderData')
//       .its('request.body')
//       .should('deep.equal', {
//         ingredients: ['1', '7', '3', '1']
//       });

//     cy.get().contains('42').should('exist');
//   });
//   // it('', () => {});
// });
