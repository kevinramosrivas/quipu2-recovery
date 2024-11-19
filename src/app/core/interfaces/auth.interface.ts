export interface ValidateCodeResponse {
    expireddate:          string;
    formattedExpireddate: string;
    fullnameper:          string;
    iduserrecovery:       string;
    status:               string;
}

export interface ChangePasswordRequest {
    newPassword: string;
    token: string;
}




export interface ErrorResponse{
    message: string;
}
