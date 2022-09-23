import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import {
    Context,
    MockContext,
    createMockContext,
} from '@shared/infra/prisma/context';

describe('Clients', () => {
    let mockCtx: MockContext;
    let ctx: Context;
    let sut: ClientRepository;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
        sut = new ClientRepository(ctx);
    });

    describe('Create', () => {
        it('should be able to create a new client', async () => {
            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.client.create.mockResolvedValueOnce(client);

            const data: ICreateClientDTO = {
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
            };

            const request = await sut.create(data);

            expect(request).toEqual(client);
        });
    });

    describe('Find By Id', () => {
        it('should be able to return client by id', async () => {
            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.client.findUnique.mockResolvedValueOnce(client);

            const request = await sut.findById('any_id');

            expect(request).toEqual(client);
        });
        it('should be able to return null when client doesnt exists', async () => {
            mockCtx.prisma.client.findUnique.mockResolvedValueOnce(null);

            const request = await sut.findById('any_id');

            expect(request).toEqual(null);
        });
    });

    describe('Find By Email', () => {
        it('should be able to return client by email', async () => {
            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.client.findFirst.mockResolvedValueOnce(client);

            const request = await sut.findByEmail('any_email');

            expect(request).toEqual(client);
        });
        it('should be able to return null when client doesnt exists', async () => {
            mockCtx.prisma.client.findUnique.mockResolvedValueOnce(null);

            const request = await sut.findByEmail('any_email');

            expect(request).toEqual(undefined);
        });
    });

    describe('Find By Company Id', () => {
        it('should be able to return client by email', async () => {
            const client = [
                {
                    id: 'any_id',
                    name: 'any_name',
                    cpf: 'any_cpf',
                    email: 'any_email',
                    password: 'any_password',
                    company_id: 'any_company_id',
                    credits: 'any_credits',
                    amount: 100,
                    createdAt: new Date('2022-08-23T17:33:38.232Z'),
                    updatedAt: new Date('2022-08-23T17:33:38.232Z'),
                },
                {
                    id: 'any_id2',
                    name: 'any_name2',
                    cpf: 'any_cpf2',
                    email: 'any_email2',
                    password: 'any_password2',
                    company_id: 'any_company_id',
                    credits: 'any_credits2',
                    amount: 101,
                    createdAt: new Date('2022-08-23T17:33:38.232Z'),
                    updatedAt: new Date('2022-08-23T17:33:38.232Z'),
                },
            ];

            mockCtx.prisma.client.findMany.mockResolvedValueOnce(client);

            const request = await sut.findAllByBank('any_company_id');

            expect(request).toEqual(client);
        });
    });

    describe('Find All', () => {
      it('should be able to return client by email', async () => {
          const client = [
              {
                  id: 'any_id',
                  name: 'any_name',
                  cpf: 'any_cpf',
                  email: 'any_email',
                  password: 'any_password',
                  company_id: 'any_company_id',
                  credits: 'any_credits',
                  amount: 100,
                  createdAt: new Date('2022-08-23T17:33:38.232Z'),
                  updatedAt: new Date('2022-08-23T17:33:38.232Z'),
              },
              {
                  id: 'any_id2',
                  name: 'any_name2',
                  cpf: 'any_cpf2',
                  email: 'any_email2',
                  password: 'any_password2',
                  company_id: 'any_company_id2',
                  credits: 'any_credits2',
                  amount: 101,
                  createdAt: new Date('2022-08-23T17:33:38.232Z'),
                  updatedAt: new Date('2022-08-23T17:33:38.232Z'),
              },
          ];

          mockCtx.prisma.client.findMany.mockResolvedValueOnce(client);

          const request = await sut.findAll();

          expect(request).toEqual(client);
      });
  });

  describe('Delete By Id', () => {
    it('should be able to return client by email', async () => {
        const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

        mockCtx.prisma.client.delete.mockResolvedValueOnce(client);

        const request = await sut.deleteById('any_id');

        expect(request).toEqual(client);
    });
});
});
