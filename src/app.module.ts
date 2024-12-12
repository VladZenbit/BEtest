import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

import { databaseConfig } from "./database/database-config";
import { AuthModule } from "./modules/auth/auth.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { UserModule } from "./modules/user/user.module";
import { FilesModule } from "./modules/files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "uploads"),
    }),
    AuthModule,
    MoviesModule,
    UserModule,
    FilesModule,
  ],
})
export class AppModule {}
