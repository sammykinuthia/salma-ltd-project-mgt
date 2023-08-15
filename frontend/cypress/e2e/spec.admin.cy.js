/// <reference types='Cypress'/>


describe("Tests for admin page",()=>{
  it('has projects divs contained in it once there are projects',()=>{
    cy.login('joystone','password');
    cy.get('.main-body').find('.project-card')
  })
})






