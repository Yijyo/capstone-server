import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from './query.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class QueryService {
    constructor(
        @InjectRepository(Query)
        private queryRepository: Repository<Query>,
        private httpService: HttpService,
    ) {}

    async createQuery(userEmail: string, requestMessage: string): Promise<Query> {
        try {
            console.log("username : ", userEmail, ", requestMessage : ", requestMessage);
            console.log(process.env.AI_SERVER_URL);
            const response = await this.getAIResponse(requestMessage);
            const query = this.queryRepository.create({
                userEmail: userEmail,
                requestMessage: requestMessage,
                responseMessage: response,
            });
            return this.queryRepository.save(query);
        } catch (error) {
            throw new Error('Failed to create query');
        }   
    }

    private async getAIResponse(request: string): Promise<string> {
        console.log(process.env.AI_SERVER_URL + 'prompt');
        const aiResponse = await firstValueFrom(
            this.httpService.post(
                process.env.AI_SERVER_URL + 'prompt',
                { request },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout : 10000,
                }
            )
        )
        console.log(aiResponse)
        return aiResponse.data.message;
    }
}