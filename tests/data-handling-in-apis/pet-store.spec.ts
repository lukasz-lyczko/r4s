import {expect, test} from "@playwright/test";
import {UserController} from "./controllers/user-controller";
import {validateJsonSchema} from "./schemas/schema-validation";
import {User} from "./models/user.type";
import {generateSampleString} from "../../utils/generate-string";

const HttpStatusCodes = {
    badRequest: 400,
    success: 200,
    methodNotAllowed: 405,
    tooManyRequests: 429,
};

let userController: UserController;

test.use({
    baseURL: 'https://petstore.swagger.io',
    extraHTTPHeaders: {accept: 'application/json'}
});

test.describe('EXERCISE 2: DATA HANDLING IN APIS', () => {
    test.beforeEach(async ({request}) => {
        userController = new UserController(request);
    });

    /**
     * Create your user through an HTTP request and then retrieve its data by
     * calling the corresponding service.
     */
    test('Create a new user', async () => {
        const testUser = {
            username: generateSampleString(),
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@test.com',
            password: 'secret',
            phone: '123 123 123',
            userStatus: 0
        };

        const postResponse = await userController.createUser(testUser);
        expect(postResponse.status()).toEqual(HttpStatusCodes.success);
        await validateJsonSchema('post-user-response', postResponse);

        await new Promise(res => setTimeout(res, 3_000)); // There can be significant delay before user can be retried, normally I would loop number of times waiting for successful response

        const getResponse = await userController.getUser(testUser.username);
        const getResponseBody = await getResponse.json() as User;

        expect(getResponse.status()).toEqual(HttpStatusCodes.success);
        await validateJsonSchema('get-user-response', getResponse);
        delete getResponseBody.id;
        expect(getResponseBody).toEqual(testUser);
    });
});

