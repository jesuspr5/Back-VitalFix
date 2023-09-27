import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  async create(
    CreateCommentDto: CreateCommentDto,
    userActive: UserActiveInterface,
  ) {
    const { text, restaurantId, score } = CreateCommentDto;
    const user = await this.usersService.findOne(userActive.id);
    if (!user) {
      throw new UnauthorizedException('userId is wrong');
    }
    const restaurant = await this.restaurantsService.findOne(restaurantId);

    if (!restaurant) {
      throw new UnauthorizedException('restauratId is wrong');
    }

    const commentUser = await this.findOneByUserAndRestaurant(
      user.id,
      restaurantId,
    );

    if (commentUser.data !== null) {
      throw new UnauthorizedException('Commentary already exists for user');
    }
    const comment = this.comentRepository.create({
      text,
      user,
      restaurant,
      score,
    });

    await this.comentRepository.save(comment);
    return;
  }

  async findAll() {
    return await this.comentRepository.find();
  }

  async findOne(id: string) {
    const coment = this.comentRepository.findOneBy({ id });
    if (!coment) {
      throw new BadRequestException('comment not found');
    }
    return coment;
  }

  async findOneByUserAndRestaurant(userId: string, restaurantId: string) {
    const comments = await this.comentRepository.findOne({
      where: {
        user: { id: userId },
        restaurant: { id: restaurantId },
      },
    });
    return { data: comments };
  }

  async update(id: string, UpdateCommentDto: UpdateCommentDto) {
    await this.findOne(id);
    return await this.comentRepository.update(id, {
      ...UpdateCommentDto,
    });
  }

  async remove(id: string) {
    await this.findOne;
    return this.comentRepository.softDelete({ id });
  }
}
