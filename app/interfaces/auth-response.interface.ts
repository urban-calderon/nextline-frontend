export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        access_token: string;
        token_type: string;
        expires_in: number;
    };
}