export class User {

    constructor (        
        public id: number,
        public firstname: string,
        public lastname: string,
        public photo: string,

        public company: string,
        public office: string,

        public ca_ht_act: number,
        public ca_ht_ssp: number,
        public sales_ssp: number,
        public mandates: number,
        public best_dev: number,
        public ca_ht_team_ssp: number,
        public ca_company: number,
        ) {}
}

