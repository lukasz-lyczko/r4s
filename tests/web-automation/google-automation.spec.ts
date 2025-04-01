import {expect, test} from "./fixture";

test.describe('Search google', () => {
    test('Search for "automation"', {
        tag: ['@visual-regression', '@sanity'],
        annotation: {type: 'requirement', description: 'JIRA-1244'}
    }, async ({googleLandingPage, googleResultsPage, wikipediaArticlePage}) => {
        await googleLandingPage.searchFor('automation');
        await googleResultsPage.followLink('Automation', 'wikipedia.org');

        const paragraphOnFirstAutomation = await wikipediaArticlePage.getCompleteParagraphText('first completely automated industrial process');
        const yearOfFirstAutomation = paragraphOnFirstAutomation.match(/\d{4}/gm)[1];

        expect(yearOfFirstAutomation).toEqual('1785');

        // The expected screenshot made in headed mode as captcha needed to be resolved, normally it would be done in headless mode to avoid issues on CI
        await wikipediaArticlePage.verifyPageScreenshot('wiki-automation');
    });
});
