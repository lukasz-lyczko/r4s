import {GoogleBasePage} from "./google-base-page";
import {Page} from "@playwright/test";

export class GoogleResultsPage extends GoogleBasePage {
    constructor(page: Page) {
        super(page, '/search');
    }

    async followLink(linkText: string, domain: string, index = 0): Promise<void> {
        await this.page.locator(`[href*="${domain}"]`, {hasText: linkText}).nth(index).click();
    }
}
