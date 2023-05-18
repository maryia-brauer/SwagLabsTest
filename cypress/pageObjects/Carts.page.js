import BasePage from "./Base.page";

class CartsPage extends BasePage {
    static get url() {
        return "/cart.html";
    }

    static get itemNames() {
        return cy.get('.inventory_item_name');
    }
    static get checkOutButton() {
        return cy.get('[data-test="checkout"]');
    }
}

export default CartsPage;