import { TokenPayload } from "google-auth-library";

export interface IGoogleSignInProvider {
    signIn: (token: string) => Promise<TokenPayload | undefined>
}