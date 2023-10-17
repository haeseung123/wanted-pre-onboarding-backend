import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/module/companies.module';
import { CompanyEntity } from './companies/entities/companies.entity';
import { RecruitsModule } from './recruits/module/recruits.module';
import { RecruitEntity } from './recruits/entities/recruits.entity';
import { UsersModule } from './users/module/users.module';
import { UserEntity } from './users/entities/users.entity';
import { ApplyModule } from './apply/module/apply.module';
import { ApplyEntity } from './apply/entities/apply.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [CompanyEntity, RecruitEntity, UserEntity, ApplyEntity],
        synchronize: true,
        logging: true,
        timezone: 'local',
      })
    }),
    UsersModule,
    CompaniesModule,
    RecruitsModule,
    ApplyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
