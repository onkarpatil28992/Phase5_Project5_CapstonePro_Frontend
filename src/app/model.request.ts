export class Request {
    constructor(
        public data: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public id: String,
        public emp_id: String,
        public quantity: Number,
        public request_type:String
        ){}
}