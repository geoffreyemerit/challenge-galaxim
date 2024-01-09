import { User } from "./user.model";

export class Game {

    constructor (        
        public id: number,
        public category: string,
        public name: string,
        public description: string,
        public image: string,

        public userList: number[]
        ) {}
}