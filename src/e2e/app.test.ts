import "expect-puppeteer";

describe("Game of life", () => {
	it("full flow", async () => {
		await page.goto("http://localhost:9000");

		const text = await page.evaluate(() => document.body.textContent);
		expect(text).toContain("Привет");

		await page.click("button[type=submit]");
		expect(await page.evaluate("location.href")).toBe("http://localhost:9000/");

		await page.type("input[name='userName']", "Tatya");
		await page.click("button[type=submit]");

		const url = await page.evaluate("location.href");
		expect(url).toBe("http://localhost:9000/game");

		await page.click("button[name='settings']");
		await page.waitForSelector("form");
		await page.click("input[name='rowCount']", {clickCount: 3})
		await page.type("input[name='rowCount']", "3");
		await page.click("input[name='columnCount']", {clickCount: 3})
		await page.type("input[name='columnCount']", "3");
		await page.click("button[type=submit]");

		await page.waitForSelector("button[name='cell']");
		const cells = await page.evaluate(() => document.querySelectorAll("button[name='cell']").length);
		expect(cells).toBe(9);

		await page.click("button[name='logout']");

		const nextUrl = await page.evaluate("location.href");
		expect(nextUrl).toBe("http://localhost:9000/");
	});
});
