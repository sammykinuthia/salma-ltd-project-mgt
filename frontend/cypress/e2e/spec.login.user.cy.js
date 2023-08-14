/// <reference types='Cypress'/>

export const url = 'http://192.168.77.169:8081/auth/login.html';
export const url_user = 'http://192.168.77.169:8081/user';
export const sign_up = 'http://192.168.77.169:8081/auth/register.html'
describe('LOGIN USER', () => {
  beforeEach(() => {
    cy.visit(url)
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
    cy.url().should('include', url_user)
    
  })

  it("redirects to sign up when the bottom redirection is clicked",()=>{
    cy.get('a').should('contain','Sign Up')
    cy.get("[data-cy='redirect-to-signup']").click();
    cy.url().should('include', sign_up)
  

    
  })
  
  

})