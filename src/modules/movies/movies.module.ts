import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Movie } from "./entity/movie.entity";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { UserModule } from "../user/user.module";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UserModule, FilesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
