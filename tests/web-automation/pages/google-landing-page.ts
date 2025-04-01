import {Page} from "@playwright/test";
import {GoogleBasePage} from "./google-base-page";

export class GoogleLandingPage extends GoogleBasePage {
    private searchCombobox = this.page.getByRole('combobox', {name: 'Search'});

    constructor(page: Page) {
        super(page, '/');
    }

    async searchFor(query: string): Promise<void> {
        await this.searchCombobox.fill(query);
        await this.searchCombobox.press('Enter');
    }
}
