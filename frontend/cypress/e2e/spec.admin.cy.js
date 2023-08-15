/// <reference types='Cypress'/>

//import { url } from "./spec.login.user.cy";

const project_url = '/admin/project.html';

describe("Tests for admin page", () => {

  it('has projects divs contained in it once there are projects', () => {
    cy.login('joystone', 'password');
    cy.get('.main-body').find('.project-card').as('projectCard')
  })

  it('The first project div is clickable', () => {
    cy.login('joystone', 'password');
    cy.get('.project-card').first().click();
    cy.location('pathname').should('equal', project_url)

  })

  it('The project divs are clickable', () => {
    cy.login('joystone', 'password');
    cy.get('.project-card').as('cards')
    cy.get('@cards').then((el)=>{
      el.click();
      cy.location('pathname').should('include', 'project')
      cy.go('back')
    });

      


    });
    //cy.visit(`${url}admin`
})






