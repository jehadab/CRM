export class EmpUserModel {
    constructor (
        public email : string ,
        public name : string ,
        public _token : string, 
        private _tokenExpirationDate? : Date){}

//         get token (){

//             return this.token;
//         }
 }