import BasePage from "./Base.page";

class CheckOutStepOnePage extends BasePage {
    static get url() {
        return "/cart.html";
    }

    static get firstName() {
        return cy.get('[data-test="firstName"]');
    }
    static get lastName() {
        return cy.get('[data-test="lastName"]');
    }
    static get zipCode() {
        return cy.get('[data-test="postalCode"]');
    }

    static get continueButton() {
        return cy.get('[data-test="continue"]');
    }
}

export default CheckOutStepOnePage;