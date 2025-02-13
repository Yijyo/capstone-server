import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'capstone_design',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    QueryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
