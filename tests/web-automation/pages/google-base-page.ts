import {Page} from "@playwright/test";

export abstract class GoogleBasePage {
    private acceptAllButton = this.page.getByRole('button', {name: 'Accept all'});

    protected constructor(protected page: Page, private url: string) {
    }

    /**
     * Visits url defined in respective POM and waits for "load" state
     */
    async open(): Promise<void> {
        await this.page.goto(this.url);
        await this.page.waitForLoadState();
    }

    async acceptAllCookies(): Promise<void> {
        await this.acceptAllButton.click();
    }
}
