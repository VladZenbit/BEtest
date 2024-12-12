import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { GetUser } from "src/decorators/get-user.decorator";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entity/user.entity";
import { Movie } from "../movies/entity/movie.entity";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("movies")
  async getUserMovies(@GetUser("sub") id: string): Promise<Movie[]> {
    return this.userService.getUserMovies(id);
  }

  @Get(":id")
  async getUserInfo(@Param("id") userId: string): Promise<User | null> {
    return this.userService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
