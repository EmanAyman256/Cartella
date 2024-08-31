export interface LoginResponse{
    
    message: "success" | "fail" |""; 
    user: {
        name: ""
        email: ""
        role: ""
    },
    token: ""

}
export interface SignupResponse{
    
    message: "success" | "fail" | ""; 
    user: {
        name: ""
        email: ""
        role: ""
    },
    token: ""
    
}