import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";

import { FilesService } from "../files/files.service";
import { CreateMovieDto } from "./dtos/create-movie.dto";
import { UpdateMovieDto } from "./dtos/update-movie.dto";
import { Movie } from "./entity/movie.entity";
import { IUpdateMovie } from "./types/update.type";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly fileService: FilesService,
    private readonly configService: ConfigService
  ) {}

  private readonly SERVER_URL = this.configService.get<string>("SERVER_URL");

  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({
      id,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async createMovie(
    createMovieDto: CreateMovieDto,
    movieImg: Express.Multer.File,
    userId: string
  ): Promise<Movie> {
    const imgName = await this.fileService.createFile(movieImg);

    const movie = this.movieRepository.create({
      ...createMovieDto,
      user: {
        id: userId,
      },
      image: `${this.SERVER_URL}/${imgName}`,
    });

    return this.movieRepository.save(movie);
  }

  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
    userId: string
  ): Promise<Movie> {
    const { image } = updateMovieDto;

    const updateBody: IUpdateMovie = {
      title: updateMovieDto.title,
      publishingYear: updateMovieDto.publishingYear,
    };

    if (image) {
      const name = await this.fileService.createFile(image);
      const imgName = `${this.SERVER_URL}/${name}`;
      updateBody.image = imgName;
    }

    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    if (movie.user.id !== userId) {
      throw new BadRequestException(`Movie can only be updated by its owner`);
    }

    Object.assign(movie, updateBody);

    return this.movieRepository.save(movie);
  }
}
