import BasePage from "./Base.page";

class CheckOutCompletePage extends BasePage {
    static get url() {
        return "/checkout-complete.html";
    }

    static get message() {
        return cy.get('.complete-header');
    }
}

export default CheckOutCompletePage;