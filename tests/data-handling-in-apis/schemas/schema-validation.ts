import Ajv from "ajv";
import {APIResponse, expect} from "@playwright/test";

export const validateJsonSchema = async (schemaName: string, response: APIResponse): Promise<void> => {
    const existingSchema = require(`./${schemaName}.schema.json`);
    const body = await response.json();

    const ajv = new Ajv({allErrors: false});
    const validate = ajv.compile(existingSchema);
    const validRes = validate(body);

    if (validate(body)) {
        expect(validRes).toBe(true);
    } else {
        console.log(
            "Schema validation errors:", JSON.stringify(validate.errors),
            "\nActual response body:", JSON.stringify(body)
        );
    }
};
