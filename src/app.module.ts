import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';
// import config from './config/configuration';
// import { AppConfigModule } from './config/configuration.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    SearchModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        // type: configService.get<string>('TYPEORM_CONNECTION'),
        type: 'mysql',
        host: configService.get<string>('TYPEORM_HOST'),
        port: Number(configService.get<string>('TYPEORM_PORT')),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        logging: ['query', 'error'],
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/src/migrations/*.js'],
        cli: {
          migrationsDir: 'src/migration',
        },
        migrationsRun: true,
        // for start migration with run project
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
