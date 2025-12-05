/// <reference types="cypress" />
describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

beforeEach(function () {
  cy.viewport(1300, 800);
  cy.visit('/');
});

describe('добавление ингридиентов в конструктор работает корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );
  });

  it('добавление булки', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Булка синяя')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Булка синяя')
      .should('exist');
  });

  it('добавление ингридиентов', function () {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Начинка 1').should('exist');
    cy.get('[data-cy=sauces-ingredients]')
      .contains('Соус острый')
      .should('exist');
  });

  it('конструктор очищается после оформления заказа', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order-summ] button').click();
    cy.get('[data-cy=order-number]', { timeout: 5000 })
      .contains('123456')
      .should('exist');

    //закрываем модальное окно
    cy.get('#modals button[aria-label="Закрыть"]').click();

    //проверяем, что конструктор пустой
    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-bun-2]').should('not.exist');

    cy.contains('Выберите начинку').should('exist');
  });
});

describe('модальное окно ингридиентов работает корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  it('открытие окна', function () {
    cy.contains('Булка синяя').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Булка синяя').should('exist');
  });

  it('закрытие окна', function () {
    cy.contains('Булка синяя').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('оформление заказа работает корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('заказ бургера', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    //проверяем что есть в конструкторе
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Булка синяя')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Булка синяя')
      .should('exist');
    cy.get('[data-cy=mains-ingredients]').contains('Начинка 1').should('exist');

    cy.get('[data-cy=order-summ] button').click();

    //номер заказа
    cy.get('[data-cy=order-number]', { timeout: 5000 })
      .contains('123456')
      .should('exist');

    //закрытие окна
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');
  });
});
