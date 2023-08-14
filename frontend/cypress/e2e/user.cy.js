/// <reference types="Cypress" />

describe('User test', () => {
  it('login user', () => {
    cy.visit('http://127.0.0.1:8080/auth/login.html')
    cy.get('#username').type("sam")
    cy.get('#passwd').type("sam")
    cy.get('button').click()
    cy.location('pathname').should('eq','/user/')

    cy.get('[href="/user/projects.html"] > .title').click()
    cy.get('#projects-section').find(".project-card")
    
    cy.get('#logout > .title').click()
    cy.location("pathname").should("eq",'/auth/login.html')

  })
  it("get projects history",()=>{
    cy.visit('http://127.0.0.1:8080/auth/login.html')
    cy.get('#username').type("sam")
    cy.get('#passwd').type("sam")
    cy.get('button').click()
    cy.location('pathname').should('eq','/user/')
    cy.get('[href="/user/projects.html"] > .title').click()
    cy.get('#projects-section').find(".project-card")
  })
  it("logout user",()=>{
    cy.visit('http://127.0.0.1:8080/auth/login.html')
    cy.get('#username').type("sam")
    cy.get('#passwd').type("sam")
    cy.get('button').click()
    cy.get('#logout > .title').click()
    cy.location("pathname").should("eq",'/auth/login.html')
  })
})