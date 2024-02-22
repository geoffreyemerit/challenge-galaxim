import { Office } from "./office.model";

export class User {

    constructor (        
        
        public firstname: string,
        public lastname: string,
        public photo: string,
        public job: string,
        public caHtAct: number,
        public caHtSsp: number,
        public salesSsp: number,
        public mandates: number,
        public bestDev: number,
        public caHtNetworkTeamSsp: number,
        public office: Office,

        public caAllActions?: number,
        public id?: number,
        public email?: string,
        public role?: string,
        ) {}
}


