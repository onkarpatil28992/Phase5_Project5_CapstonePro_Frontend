export class Ticket {
    constructor(
        public data: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public id: string,
        public description: string
        ){}
}
