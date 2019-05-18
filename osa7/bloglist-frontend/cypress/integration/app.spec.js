const testUser = {
  name: 'Kekkone',
  username: 'kakkone',
  password: 'salainensana'
};

const init = function() {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  cy.request('POST', 'http://localhost:3003/api/users/', testUser);
  cy.visit('http://localhost:3000');
};

const login = function() {
  cy.get('#username').type(`${testUser.username}`);
  cy.get('#password').type(`${testUser.password}`);
  cy.contains('Kirjaudu').click();
};

const addBlog = function() {
  cy.contains('Lisää blogi').click();
  cy.get('#title').type('Lorem ipsum');
  cy.get('#author').type('Dolor sit amet');
  cy.get('#url').type('https://google.fi');
  cy.get('[data-cy=submit]').click();
};

const openBlog = function() {
  cy.get('li')
    .contains('Lorem ipsum')
    .click();
  cy.contains('Kommentit');
};

const addComment = function() {
  const string = 'Oli marakatti maantiellä poikittain';
  cy.get('#comment').type(string);
  cy.get('[data-cy=addComment').click();
  cy.contains(string);
};

describe('Blog app', function() {
  beforeEach(function() {
    init();
  });

  it('front page can be opened', function() {
    cy.contains('Hello!');
  });

  it('user can log in', function() {
    login();
    cy.contains(`${testUser.name} kirjautunut sisään`);
  });

  it('new blog is populated when creating', function() {
    login();
    addBlog();
    cy.contains('blogin lisääminen onnistui Lorem ipsum');
  });

  it('blog can be commented', function() {
    login();
    addBlog();
    openBlog();
    addComment();
  });

  it('should stay logged in when browser refresh', function() {
    login();
    cy.contains(`${testUser.name} kirjautunut sisään`);
    cy.reload();
    cy.contains(`${testUser.name} kirjautunut sisään`);
  });
});
