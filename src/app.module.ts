import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './firstModule/search.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SearchModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: '1',
    database: 'veloparserdb',
    entities: ['dist/**/*.entity{.ts,.js}'],
    // synchronize: true,
    synchronize: false,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
