import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Injectable()
export class ClaimsService {
  create(createClaimDto: CreateClaimDto) {
    return 'This action adds a new claim';
  }

  findAll() {
    return `This action returns all claims`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claim`;
  }

  update(id: number, updateClaimDto: UpdateClaimDto) {
    return `This action updates a #${id} claim`;
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }
}
