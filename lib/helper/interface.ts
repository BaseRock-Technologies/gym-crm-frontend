interface SigninResponse {
    status: string,
    message: string,
    authToken: string
}

interface User {
    userName: string,
    authToken: string,
  }
  

export type {
    SigninResponse,
    User
}