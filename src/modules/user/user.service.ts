import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Movie } from "../movies/entity/movie.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  async getUserMovies(userId: string): Promise<Movie[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["movies"],
    });

    return user?.movies || [];
  }
}
