export class EmpUserModel {
    constructor (public email : String ,
        public name : String ,
        private _token : String, 
        private _tokenExpirationDate : Date){}

        get token (){

            if(!this._tokenExpirationDate || new Date () > this._tokenExpirationDate)
            return null ;

            return this.token;
        }
}