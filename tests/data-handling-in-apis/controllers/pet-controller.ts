import {APIRequestContext, APIResponse} from "@playwright/test";
import {PetStatus} from "../models/pet.type";

export class PetController {
    private petPath = '/v2/pet';

    constructor(private request: APIRequestContext) {
    }

    async findByStatus(status: PetStatus): Promise<APIResponse> {
        return await this.request.get(`${this.petPath}/findByStatus`, {params: {status}});
    }
}
