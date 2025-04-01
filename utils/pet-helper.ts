import {Pet} from "../tests/data-handling-in-apis/models/pet.type";

export class PetHelper {
    constructor(private petList: Pet[]) {
    }

    groupByName(): { [key: string]: number } {
        let grouped: { [key: string]: number } = {};

        this.petList.forEach(({name}) => {
            grouped[name] > 0 ? grouped[name]++ : grouped[name] = 1;
        });

        return grouped;
    }
}
