import {test as base} from '@playwright/test';
import {GoogleLandingPage} from "./pages/google-landing-page";
import {GoogleResultsPage} from "./pages/google-results-page";
import {WikipediaArticlePage} from "./pages/wikipedia-article-page";

type MyFixtures = {
    googleLandingPage: GoogleLandingPage;
    googleResultsPage: GoogleResultsPage;
    wikipediaArticlePage: WikipediaArticlePage;
};

export const test = base.extend<MyFixtures>({
    googleLandingPage: async ({page}, use) => {
        const googleLandingPage = new GoogleLandingPage(page);
        await googleLandingPage.open();
        await googleLandingPage.acceptAllCookies();

        await use(googleLandingPage);
    },
    googleResultsPage: async ({page}, use) => {
        await use(new GoogleResultsPage(page));
    },
    wikipediaArticlePage: async ({page}, use) => {
        await use(new WikipediaArticlePage(page));
    }
});

export {expect} from '@playwright/test';
