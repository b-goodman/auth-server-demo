declare namespace NodeJS {
    export interface ProcessEnv {
        SERVER_PORT: string;
        DATABASE_URL: string;
        TOKEN_ISSUER: string;
        TOKEN_TTL: string;
    }
}