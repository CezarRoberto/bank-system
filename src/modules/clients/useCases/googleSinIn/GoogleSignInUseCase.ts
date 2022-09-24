import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { Client } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import { GoogleSignInProvider } from '@shared/providers/googleSIngIn/implementation/GoogleSignInProvider';
import { inject, injectable } from 'tsyringe';

type IRequest = {
    token: string;
    cpf: string;
    company_id: string;
    credits: string;
    amount: number;
};

@injectable()
export class GoogleSignInUseCase {
    constructor(
        @inject('ClientRepository')
        private readonly clientRepository: ClientRepository,
        @inject('GoogleSignInProvider')
        private readonly googleSignInRepository: GoogleSignInProvider,
    ) {}

    async execute({
        token,
        cpf,
        company_id,
        credits,
        amount,
    }: IRequest): Promise<Client> {
        const googleAccount = await this.googleSignInRepository.signIn(token);

        if (!googleAccount) {
            throw new AppError(
                'Something went wrong with your google account',
                409,
            );
        }

        const client = await this.clientRepository.create({
            name: googleAccount.name ?? 'Need Update',
            amount,
            company_id,
            cpf,
            credits,
            email: googleAccount.email ?? 'Need Update',
            password: googleAccount.aud,
        });

        return client;
    }
}
