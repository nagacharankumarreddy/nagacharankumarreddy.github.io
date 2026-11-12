// One entry per project thumbnail used in src/features/showcase/data/content.ts.
//   name  -> output file: src/assets/img/projects/<name>.webp
//   local -> dev-server URL (used by default)
//   live  -> deployed URL (used with --live)
//   steps -> drive the UI to the state you want to show
//   focus -> element the 16:10 crop is centred on (whole viewport if omitted)
//   view  -> optional larger viewport for tall cards that would not fit the default 1280x800
const live = (repo) => `https://nagacharankumarreddy.github.io/${repo}/`;

export const thumbnails = [
  {
    name: "moviehub-home",
    local: "http://localhost:3106/movie-hub",
    live: live("movie-hub"),
    steps: async (page) => {
      await page.waitForSelector(".card:not(.skeleton)", { timeout: 60000 });
      await page.waitForTimeout(3500); // posters
    },
  },
  {
    name: "calculator-expr",
    local: "http://localhost:3101",
    live: live("calculator"),
    focus: ".calculator",
    steps: async (page) => {
      await page.click(".calculator");
      await page.keyboard.type("12+7*3");
    },
  },
  {
    name: "dice-game",
    local: "http://localhost:3102",
    live: live("dice-game"),
    focus: ".container, main, #root > div",
    steps: async (page) => {
      await page.fill("#player1", "Charan");
      await page.fill("#player2", "Alex");
      await page.fill("#targetscore", "30");
      await page.click(".btn-primary");
      await page.waitForSelector("#rollDice");
      for (let i = 0; i < 3; i++) {
        await page.click("#rollDice");
        await page.waitForTimeout(700);
      }
    },
  },
  {
    name: "guess-game",
    local: "http://localhost:8101",
    live: live("Guess-The-Number"),
    focus: ".card",
    steps: async (page) => {
      await page.click("#start");
      await page.fill("#number-input", "50");
      await page.click("#submit");
    },
  },
  {
    name: "interest-result",
    local: "http://localhost:3103",
    live: live("interest-calculator"),
    focus: ".calc-card",
    view: { width: 1600, height: 1000 },
    steps: async (page) => {
      await page.fill("#principle", "50000");
      await page.fill("#interest", "2");
      await page.locator(".react-datepicker-wrapper input").first().fill("11/05/2025");
      await page.keyboard.press("Escape");
      await page.click(".calc-btn");
    },
  },
  {
    name: "password-strong",
    local: "http://localhost:8102",
    live: live("password-strength-checker"),
    focus: "xpath=//h1/..",
    view: { width: 1600, height: 1000 },
    steps: async (page) => {
      await page.fill("#pword", "Tr0ub4dor&3-Horse!");
      await page.click("#submit");
    },
  },
  {
    name: "techtips-tip",
    local: "http://localhost:3104/tech-tips",
    live: live("tech-tips"),
    focus: ".tt-main",
    steps: async (page) => {
      await page.click("text=Start reading");
      await page.click("text=Next");
      await page.click("text=Next");
    },
  },
  {
    name: "tictactoe-play",
    local: "http://localhost:3105",
    live: live("tictactoe"),
    focus: ".game",
    view: { width: 1600, height: 1200 },
    steps: async (page) => {
      for (const i of [0, 3, 1, 4]) await page.locator(".square").nth(i).click();
    },
  },
];
