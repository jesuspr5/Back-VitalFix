
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {

  constructor(
        @InjectRepository(Comment)
  private readonly comRepository:Repository<Comment>
  ){}

 
 async create(CreateCommentDto: CreateCommentDto) {
   return await this.comRepository.save(CreateCommentDto)
  }

 async findAll() {
    return await this.comRepository.find() ;
  }

 async findOne(id: number) {
  const coment = this.comRepository.findOneBy({id}) 
  if(!coment){
    throw new BadRequestException('comment not found');
  }
  return coment
  }

   async update(id: number, UpdateCommentDto: UpdateCommentDto) {
    await this.findOne(id)
    return await this.comRepository.update(id,{
      ... UpdateCommentDto
    })
  }

async  remove(id: number) {
  await this.findOne 
  return this.comRepository.softDelete({id})
}

}
