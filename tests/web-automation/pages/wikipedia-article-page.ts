import {expect, Locator, Page} from "@playwright/test";

export class WikipediaArticlePage {
    private contentParagraph = this.page.locator('.mw-body-content').locator('p');

    constructor(private page: Page) {
    }

    async getCompleteParagraphText(searchText: string): Promise<string> {
        return await this.contentParagraph.getByText(searchText).textContent();
    }

    /**
     * Verify if current viewport contains expected content (visual regression),
     * @param screenshotName use kebab case for the name, name should not include file extension
     * @param mask provide list of elements that should be excluded from the comparison
     */
    async verifyPageScreenshot(screenshotName: string, mask?: Locator[]): Promise<void> {
        await this.page.waitForLoadState();
        await expect(this.page).toHaveScreenshot(`${screenshotName}.png`, {mask});
    }
}
