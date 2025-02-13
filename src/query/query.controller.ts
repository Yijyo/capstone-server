import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QueryService } from './query.service';

import { AuthGuard } from '@nestjs/passport';
import { Query } from './query.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';

@Controller('query')
@UseGuards(AuthGuard('jwt'))
export class QueryController {
    constructor(private readonly queryService: QueryService) {}

    @Post()
    async createQuery(
        @GetUser() user: User,
        @Body('requestMessage') requestMessage: string,
    ) : Promise<Query> {
        return await this.queryService.createQuery(user.email, requestMessage);
    }
}