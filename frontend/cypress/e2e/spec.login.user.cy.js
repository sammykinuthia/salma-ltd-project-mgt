/// <reference types='Cypress'/>

export const url = 'http://127.0.0.1:8081/';
export const url_user = '/user/';
export const sign_up = '/auth/register.html'
describe('LOGIN USER', () => {
  beforeEach(() => {
    cy.visit(`${url}auth/login.html`)
  })
  it('contains login form', () => {
    cy.get('form')
  })

  it('has a form that takes user input and has proper output for errors',()=>{
    cy.get('form').find('[type="text"]').type('joystone2')
    cy.get('form').find('[type="password"]').type('password2');
    cy.get('form').find('[type="submit"]').click();
    cy.get('.error').contains('Password is not correct');
    
  })

  it('has a form that takes user input and redirects to the user panel',()=>{
    cy.get('form').find('[type="text"]').type('joystone2')
    cy.get('form').find('[type="password"]').type('password')
    cy.get('form').find('[type="submit"]').click();
    cy.location('pathname').should('equal',url_user)
 
    
  })

  it("redirects to sign up when the bottom redirection is clicked",()=>{
    cy.get('a').should('contain','Sign Up')
    cy.get("[data-cy='redirect-to-signup']").as('signup')
    cy.get('@signup').click();
    cy.location('pathname').should('equal',sign_up)
  

    
  })
  
  

})