export declare class Jwt {
    static jwtSign(payload: object, expires_in?: string): string;
    static jwtVerify(token: string): Promise<any>;
}
