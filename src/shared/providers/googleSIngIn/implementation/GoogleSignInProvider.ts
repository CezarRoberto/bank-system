import { envs } from '@shared/envs';
import { AppError } from '@shared/error/AppError';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { IGoogleSignInProvider } from '../IGoogleSignInProvider';

export class GoogleSignInProvider implements IGoogleSignInProvider {
    private google = new OAuth2Client({ 
        clientId: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET
    });

    async signIn(token: string): Promise<TokenPayload | null> {
        const ticket = await this.google.verifyIdToken({
            idToken: token,
            audience: envs.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        if(!payload) {
            throw new AppError('Google Account not found', 400)
        }
        return payload
    }
}
