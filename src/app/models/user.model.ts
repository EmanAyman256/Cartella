export class User{
    constructor(
       
       private token:string
    ){}
get userToken(){
    if(!this.token){
        return null
    }
    return this.token;

}
}