import BasePage from "./Base.page";

class CheckOutStepTwoPage extends BasePage {
    static get url() {
        return "/checkout-step-two.html";
    }

    static get totalPrice() {
        return cy.get('[class="summary_info_label summary_total_label"]');
    }

    static get finishButton() {
        return cy.get('[data-test="finish"]');
    }
}

export default CheckOutStepTwoPage;