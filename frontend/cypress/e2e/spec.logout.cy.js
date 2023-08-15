const url = 'http://127.0.0.1:8081/';

describe("LOGGING OUT",()=>{
    it("logs out from admin index",()=>{
      
        cy.login("joystone","password")
        cy.location('pathname').should("include","admin")
        cy.get("#logout").click()
        cy.location("pathname").should('include', "login.html")
        cy.go('back')
        cy.location("pathname").should('include', "")
      

    });

    it("logs out from admin projects page",()=>{
      
        cy.login("joystone","password")
        cy.location('pathname').should("include","admin")
        cy.get('.project-card').first().click();
        cy.get("#logout").click()
        cy.location("pathname").should('include', "login.html")
        cy.go('back')
        cy.location("pathname").should('include', "login")
      
    });


    it("has No access to admin panel before logging in",()=>{
        cy.visit(`${url}admin`)
        cy.location("pathname").should('include', "login")

      
    });
})