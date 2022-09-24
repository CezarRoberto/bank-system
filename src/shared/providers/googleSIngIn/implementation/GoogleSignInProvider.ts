import { envs } from '@shared/envs';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { IGoogleSignInProvider } from '../IGoogleSignInProvider';

export class GoogleSignInProvider implements IGoogleSignInProvider {
    private google = new OAuth2Client({ 
        clientId: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET
    });

    async signIn(token: string): Promise<TokenPayload | undefined> {
        const ticket = await this.google.verifyIdToken({
            idToken: token,
            audience: envs.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        return payload
    }
}
