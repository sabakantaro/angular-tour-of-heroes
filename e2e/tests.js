import { Selector } from "testcafe";

const appUrl =
  process.env.NODE_ENV === "production"
    ? "https://angular-tour-of-heroes-beige-six.vercel.app"
    : "http://localhost:4200";

fixture`App`.page`${appUrl}`;

// Navigation tests
test("should navigate to heroes", async (t) => {
  const heroesLink = Selector('a[href*="heroes"]');
  const heroesTitle = Selector("h2").innerText;

  await t.click(heroesLink);

  await t.expect(heroesTitle).contains("My Heroes");
});

test("should navigate to dashboard", async (t) => {
  const dashboardLink = Selector('a[href*="dashboard"]');
  const dashboardTitle = Selector("h2").innerText;

  await t.click(dashboardLink);

  await t.expect(dashboardTitle).contains("Top Heroes");
});

// Search test
test("should search hero by name", async (t) => {
  const searchInput = Selector('input[id="search-box"]');
  const heroName = "Bombasto";

  await t.typeText(searchInput, heroName);

  await t.click(Selector('a[href*="detail"]'));

  const searchResults = Selector("h2").innerText;
  await t.expect(searchResults).contains(heroName.toUpperCase());
});

// Message tests
test("should clear message", async (t) => {
  const clearButton = Selector('button[class="clear"]');

  await t.click(clearButton);

  await t.expect(Selector('div[class="message"]').exists).notOk();
});

test("should display message", async (t) => {
  const message = Selector('div[class="message"]');

  await t.click(Selector('a[href*="detail"]'));

  await t.expect(message.innerText).contains("HeroService: fetched heroes");
});

// Add and delete tests
test("should add new hero", async (t) => {
  const heroesLink = Selector('a[href*="heroes"]');
  const addHeroButton = Selector('button[class="add-button"]');
  const heroName = "Test Hero";
  const heroNameInput = Selector('input[id="new-hero"]');
  const lastChild = Selector("li:last-child");
  const heroDetail = lastChild.innerText;

  await t.click(heroesLink);

  await t.click(addHeroButton);

  await t.typeText(heroNameInput, heroName);

  await t.click(Selector('button[class="add-button"]'));

  await t.expect(heroDetail).contains(heroName);
});

test("should delete hero", async (t) => {
  const heroesLink = Selector('a[href*="heroes"]');
  const deleteButton = Selector('button[class="delete"]');
  const heroName = "Test Hero";
  const heroDetail = Selector("h2").innerText;

  await t.click(heroesLink);

  await t.click(deleteButton);

  await t.expect(heroDetail).notContains(heroName.toUpperCase());
});
