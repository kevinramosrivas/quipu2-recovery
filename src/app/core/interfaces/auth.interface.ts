export interface ValidateCodeResponse {
    expireddate:          string;
    formattedExpireddate: string;
    fullnameper:          string;
    iduserrecovery:       string;
    status:               string;
}

export interface ChangePasswordRequest {
    newpass: string;
    id: string;
}




export interface ErrorResponse{
    message: string;
}
