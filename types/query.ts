interface SigninResponse {
    status: string,
    message: string,
    authToken: string
}

type Status = "error" | "success"
interface StatusResponse {
    status: Status,
    message: string,
    authToken?: string
    data?: any,
}

interface User {
    userName: string,
    authToken: string,
  }
  
export type {
    SigninResponse,
    StatusResponse,
    User,
}


