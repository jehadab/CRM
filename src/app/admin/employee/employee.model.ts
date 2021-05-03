
export class Employee {
    constructor(
        private id : number ,
        private firstName : string ,
        private lastName : string , 
        private email :string ,
        private sectionName : string ,
        ){

    }
    
    public setId(value : number) {
        this.id = value;
    }
    public setFirstName(value : string) {
        this.firstName = value;
    }
    public setLastname(value : string) {
        this.lastName = value;
    }
    public setEmail(value : string) {
        this.email = value;
    }
    public setSectionName(value : string) {
        this.sectionName = value;
    }
    
    public getId() : number {
        return this.id ;
    }
    public getFirstname() : string {
        return this.firstName ;
    }
    public getLastname() : string {
        return this.lastName ;
    }
    public getEmail() : string {
        return this.email ;
    }
    public getSectionName() : string {
        return this.sectionName ;
    }
    
    
}