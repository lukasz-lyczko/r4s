import {APIRequestContext, APIResponse} from "@playwright/test";
import {User} from "../models/user.type";

export class UserController {
    private userPath = '/v2/user';

    constructor(private request: APIRequestContext) {
    }

    async createUser(userPayload: Partial<User>): Promise<APIResponse> {
        return await this.request.post(this.userPath, {data: userPayload});
    }

    async getUser(username: string): Promise<APIResponse> {
        return await this.request.get(`${this.userPath}/${username}`);
    }
}
