import { test, expect } from "@playwright/test";

//Авторизация перед всеми тестами
test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button").click();
});

test("e2e", async ({ page }) => {
  test.step("Проверка тайтла", async () => {
    await expect(page).toHaveTitle("Swag Labs");
  });
  // Сортировка по убыванию цены
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption({ label: "Price (high to low)" });

  // "Добавление флиосовой толстовки и портфеля в корзину"
  await page
    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  // Переход в корзину
  await page.locator('[data-test="shopping-cart-link"]').click();
});
