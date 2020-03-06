// import * as Joi from '@hapi/joi';
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import configuration from './configuration';
// import { AppConfigService } from './configuration.service';
// /**
//  * Import and provide app configuration related classes.
//  *
//  * @module
//  */
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: '.dev.env',
//       load: [configuration],
//       validationSchema: Joi.object({
//         // APP_NAME: Joi.string().default('MyApp'),
//         APP_ENV: Joi.string()
//           .valid('development', 'production', 'test', 'provision')
//           .default('development'),
//         // APP_URL: Joi.string().default('http://my-app.test'),
//         APP_PORT: Joi.number().default(3005),
//         DATABASE_HOST: Joi.string().default('localhost'),
//         DATABASE_PORT: Joi.string(),
//       }),
//     }),
//   ],
//   providers: [ConfigService, AppConfigService],
//   exports: [ConfigService, AppConfigService],
// })
// export class AppConfigModule {}
