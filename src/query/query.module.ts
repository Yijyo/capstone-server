import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { Query } from './query.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Query]),
    HttpModule,
  ],
  providers: [QueryService],
  controllers: [QueryController]
})
export class QueryModule {}