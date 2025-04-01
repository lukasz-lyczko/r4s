import {APIResponse, expect, test} from "@playwright/test";
import {UserController} from "./controllers/user-controller";
import {validateJsonSchema} from "./schemas/schema-validation";
import {User} from "./models/user.type";
import {generateSampleString} from "../../utils/generate-string";
import {PetController} from "./controllers/pet-controller";
import {Pet} from "./models/pet.type";
import {PetHelper} from "../../utils/pet-helper";

const HttpStatusCodes = {
    badRequest: 400,
    success: 200,
    methodNotAllowed: 405,
    tooManyRequests: 429,
};

test.use({
    baseURL: 'https://petstore.swagger.io',
    extraHTTPHeaders: {accept: 'application/json'}
});

test.describe('EXERCISE 2: DATA HANDLING IN APIS', () => {

    /**
     * Create your user through an HTTP request and then retrieve its data by
     * calling the corresponding service.
     */
    test('Create a new user', async ({request}) => {
        const userController = new UserController(request);
        const testUser = {
            username: generateSampleString(),
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@test.com',
            password: 'secret',
            phone: '123 123 123',
            userStatus: 0
        };

        let maxTries = 10;
        let getResponse: APIResponse;
        let isReady = false;

        /**
         * Encountered issue where user was not created after successful POST request, added while loop as a workaround.
         * Would have to investigate logs to find the underlying problem.
         */
        while (!isReady && maxTries) {
            const postResponse = await userController.createUser(testUser);
            expect(postResponse.status()).toEqual(HttpStatusCodes.success);
            await validateJsonSchema('post-user-response', postResponse);

            await new Promise(res => setTimeout(res, 1_000)); // There can be significant delay before user can be retrieved

            getResponse = await userController.getUser(testUser.username);
            isReady = getResponse.status() === 200;
            maxTries--;
        }

        expect(getResponse.status()).toEqual(HttpStatusCodes.success);
        await validateJsonSchema('get-user-response', getResponse);

        const getResponseBody = await getResponse.json() as User;
        delete getResponseBody.id;
        expect(getResponseBody).toEqual(testUser);
    });

    /**
     * Collect, through an HTTP request, the JSON returned by the endpoint
     * /pet/findByStatus, and list, using a function, the names of the pets that
     * have been sold.
     */
    test('List sold pets, grouped by name', async ({request}) => {
        const petController = new PetController(request);

        const getResponse = await petController.findByStatus('sold');
        const soldPets = await getResponse.json() as Pet[];

        expect(getResponse.status()).toEqual(HttpStatusCodes.success);
        await validateJsonSchema('pet-list-response', getResponse);

        /**
         * Create a class whose constructor requires the earlier data structure and
         * implement a method that can iterate through it to identify how many pets
         * share the same name.
         */
        const petHelper = new PetHelper(soldPets);
        console.log('Sold pets, grouped by name: \n', petHelper.groupByName());
    });
});
