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

    async createQuery(userEmail: string, request: string): Promise<Query> {
        try {
            console.log("username : ", userEmail, ", requestMessage : ", request);
            console.log(process.env.AI_SERVER_URL);
            const response = await this.getAIResponse(userEmail, request);
            const query = this.queryRepository.create({
                userEmail: userEmail,
                requestMessage: request,
                responseMessage: response,
            });
            return this.queryRepository.save(query);
        } catch (error) {
            throw new Error('Failed to create query');
        }   
    }

    private async getAIResponse(userEmail: string, request: string): Promise<string> {
        try {
            const url = process.env.AI_SERVER_URL + 'prompt';
            console.log('Sending request to:', url);
            const requestBody = {
                userEmail: userEmail,
                request: request
            };
            console.log('Request payload:', requestBody);

            const aiResponse = await firstValueFrom(
                this.httpService.post(
                    url,
                    requestBody,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        timeout: 100000,
                    }
                )
            );
            console.log('AI Response:', aiResponse);
            return aiResponse.data.answer;
        } catch (error) {
            console.error('AI Response error:', error.message);
            if (error.response) {
                console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
            }
            throw error;
        }
    }
}