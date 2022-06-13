export class Product {
    constructor(
        public data: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public id: string,
        public price: Number,
        public quantity: Number
        ){}
}