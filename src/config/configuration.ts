// export default () => ({
//   port: parseInt(process.env.PORT, 10) || 3000,
//   database: {
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     dbname: process.env.DATABASE_NAME,
//   },
// });


// import { registerAs } from '@nestjs/config';

// export default registerAs('app', () => ({
//   env: process.env.APP_ENV,
//   //   name: process.env.APP_NAME,
//   //   url: process.env.APP_URL,
//   port: process.env.APP_PORT,
//   database: {
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     dbname: process.env.DATABASE_NAME,
//   },
// }));
