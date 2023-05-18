import CartsPage from "../pageObjects/Carts.page";
import CheckOutCompletePage from "../pageObjects/CheckOutComplete.page";
import CheckOutStepOnePage from "../pageObjects/CheckOutStepOne.page";
import CheckOutStepTwoPage from "../pageObjects/CheckOutStepTwo.page";
import HomePage from "../pageObjects/Home.page";
import LoginPage from "../pageObjects/Login.page";

describe("Saucedemo", () => {
  beforeEach(() => {
    //cy.visit("/");
    LoginPage.visit();
  });

  it("1. Login scenario", () => {
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("secret_sauce");
    LoginPage.loginButton.should('be.visible');
    LoginPage.loginButton.click();
    LoginPage.loginButton.should('not.exist');
  });

  it("2. Login scenario - Negative case", () => {
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("xxx");
    LoginPage.loginButton.click();
    LoginPage.errorMessage.should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it("3. Logout scenerio", () => {
    //Log into App
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("secret_sauce");
    LoginPage.loginButton.should('be.visible');
    LoginPage.loginButton.click();
    //Click on Burger/Stack Icon
    HomePage.sideBar.invoke("attr", "aria-hidden").should("eq", "true");
    HomePage.stackIcon.click();
    HomePage.sideBar.invoke('attr', 'aria-hidden').should("eq", "false");
    //Click logout button
    HomePage.logoutButton.click();
    //Validate that we see login button
    LoginPage.loginButton.should('be.visible');
  });

  it("4. Add items to card, validate title", () => {
    //Log into App
    LoginPage.logIntoPage("standard_user", "secret_sauce");
    // Add "Sauce Labs Backpack" item to the card
    HomePage.addToCardSauceLabBackpack.click();
    // Add "Sauce Labs Bolt T-Shirt" item to the card
    HomePage.addToCardSauceLabTShirt.click();
    // Add "Sauce Labs Onesie" item to the card
    HomePage.attToCardSauceLabOnesie.click();
    //Validate that the card badge is visible and has value "3"
    HomePage.cardBageIcon.scrollIntoView().should("have.text", "3");
  });

  it("5. Add and remove item", () => {
    LoginPage.logIntoPage("standard_user", "secret_sauce");
    //Click "Sauce Labs Backpack"
    HomePage.addToCardSauceLabBackpack.click();
    //Validate that the badge is 1
    HomePage.cardBageIcon.scrollIntoView().should("have.text", "1");
    //Remove the "Sauce Labs Backpack"
    HomePage.removeSauceLabsBackpack.click();
    //Validate that badge should no longer exist/be visible
    HomePage.cardBageIcon.should("not.exist");
  });

  it("6. Open specific item, and validate title", () => {
    //Login into App
    LoginPage.logIntoPage("standard_user", "secret_sauce");
    //Click on the item
    HomePage.itemNames.contains('Backpack').click();
    //Validate that the title is right
    HomePage.itemName.should("have.text", "Sauce Labs Backpack");
  });

  it.only("7. Buy items", () => {
    //Log into App
    LoginPage.logIntoPage("standard_user", "secret_sauce");
    //Add backpack to cart
    HomePage.addToCardSauceLabBackpack.click();
    //Add bolt t-shirt to cart
    HomePage.addToCardSauceLabTShirt.click();
    //open cart (create CartsPage object)
    HomePage.cardBageIcon.click();
    //validate that we see both items titles and they're right
    CartsPage.itemNames.contains('Backpack');
    CartsPage.itemNames.contains('T-Shirt');
    //validate that there's to 2 items in total list
    CartsPage.itemNames.should("have.length", 2);
    //click check out (Create new page object - CheckOutStepOne)
    CartsPage.checkOutButton.click();
    // set firstname, lastname, zip-code
    CheckOutStepOnePage.firstName.type('xxx');
    CheckOutStepOnePage.lastName.type('xxx');
    CheckOutStepOnePage.zipCode.type('xxx');
    //click continue (Create CheckOutStepTwo page object)
    CheckOutStepOnePage.continueButton.click();
    //validate that we see total price and its correct 49.66
    CheckOutStepTwoPage.totalPrice.contains("49.66");
    // click finish (CheckOutComplete object page)
    CheckOutStepTwoPage.finishButton.click();
    //validate that we can see "Thank you for your order!" message
    CheckOutCompletePage.message.should("have.text", "Thank you for your order!");
  })
});