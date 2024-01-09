export class User {

    constructor (        
        public id: number,
        public name: string,
        public photo: string,

        public company: string,
        public salesteam: string,
        
        public sales: number,
        public excluMandate: number,
        public simpleMandate: number,
        public outMandate: number,

        public salesPerformance: string,
        ) {}
}

