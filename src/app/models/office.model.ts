import { User } from "./user.model";

export class Office {

    constructor (        
        
        public brand: string,
        public nameOffice: string,
        public city: string,
        public caHtOfficeSsp: number,

        public userList?: User[],
        
        public id?: number,
        ) {}
}