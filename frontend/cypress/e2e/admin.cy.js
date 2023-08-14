/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

describe('admin test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/auth/login.html')
    cy.get('#username').type("admin")
    cy.get('#passwd').type("admin")
    cy.get('button').click()
  })
  it('login admin', () => {
    cy.location('pathname').should('eq', '/admin/')
  })
  it("gets all projects", () => {
    cy.get(".main-body").find(".project-card")

  })
  it("gets all users", () => {
    cy.get('[href="/admin/users.html"] > .title').click()
    cy.location("pathname").should("eq", "/admin/users.html")
  })
  it("Creates project", () => {
    cy.get('.button').click()
    cy.location('pathname').should("eq", "/admin/addproject.html")
    cy.get('#proj_title').type(faker.commerce.productName())
    cy.get('#proj_description').type(faker.commerce.productDescription())
    cy.get('#start_date').type("2000-01-01")
    cy.get('#end_date').type('2000-02-02')
    cy.get("form").submit()
  })
  it("logouts admin", () => {
    cy.get("#logout").click()
    cy.location("pathname").should('eq', "/auth/login.html")
  })



})