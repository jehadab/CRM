export class Section {
    constructor (
        private sectionId : number  ,
        private sectionName : string , 
        private parent : number ,
        private parentName? : string){

    }
  
    public getparent() : number{
        return this.parent ; 
    }
    
    public setparent(v : number ) {
        this.parent = v;
    }
    
    public getSectionName () : string {
        return this.sectionName  
    }
    
    public setSectionName(v : string) {
        this.sectionName = v;
    }
     public setSectionId (sectionID : number){
         this.sectionId = sectionID ;
     }   
     public  getSectionId() : number{
         return this.sectionId;
     }
     public getParentName() :string{
         return this.parentName;
     }
     public setParentName(_parentName : string) {    
         this.parentName = _parentName;

     }
     public convertJSONobj(jsonStringObject : string ) : Section{
        let sectionObject = JSON.parse(jsonStringObject)
        
        return new Section(
            sectionObject.sectionId ,
             sectionObject.sectionName , 
             sectionObject.comrade);
     }
}
