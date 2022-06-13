export class Employee {
    constructor(
        public data: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public id: String,
        public firstName: String,
        public lastName: String,
        public email: String,
        public password: String,
        public changedPassword: boolean
        ){}
}