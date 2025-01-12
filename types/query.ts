interface SigninResponse {
    status: string,
    message: string,
    role: string,
    authToken: string
}

type Status = "error" | "success" | 'info'
interface StatusResponse {
    status: Status,
    message: string,
    authToken?: string
    data?: any,
    exists?: boolean;
}

interface User {
    userName: string,
    authToken: string,
    role: string,
  }
  
export type {
    SigninResponse,
    StatusResponse,
    User,
}


