import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import { RequestsService } from 'src/requests/requests.service';


@Injectable()
export class ClaimsService {

  constructor(

    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
    @Inject(forwardRef(() => RequestsService))
    private readonly requestService: RequestsService,
  ) {

  }
  // async create(createClaimDto: CreateClaimDto): Promise<Claim> {
  //   const { request_id, ...serviceData } = createClaimDto;

  //   const request = await this.requestService.findOne(request_id);
  //   if (!request) {
  //     throw new NotFoundException(`TypeService with id ${request_id} not found`);
  //   }

  //   const claim = this.claimRepository.create({
  //     ...serviceData,
  //     request_id: request,
  //   });
  //   return this.claimRepository.save(claim);


  // }

  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    const { request_id, ...claimData } = createClaimDto;
    const request = await this.requestService.findOne(request_id);

    if (!request) {
      throw new NotFoundException(`Request with id ${request_id} not found`);
    }

    const claim = this.claimRepository.create({
      ...claimData,
      request: request,
    });

    return this.claimRepository.save(claim);
  }

  async findAll() {
    return await this.claimRepository.find();
  }


  async findOne(id: string) {
    const claim = await this.claimRepository.findOneBy({ id });
    if (!claim) {
      throw new NotFoundException(`Claim with id ${id} not found`);
    }
    return claim;
  }


  async update(id: string, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    const { request_id, ...updateData } = updateClaimDto;

    const claim = await this.claimRepository.findOne({ where: { id } });
    if (!claim) {
      throw new NotFoundException(`Claim with id ${id} not found`);
    }

    if (request_id) {
      const request = await this.requestService.findOne(request_id);
      if (!request) {
        throw new NotFoundException(`Request with id ${request_id} not found`);
      }
      claim.request = request;
    }

    Object.assign(claim, updateData);
    return this.claimRepository.save(claim);
  }

 async remove(id: string) {
    await this.findOne(id)
    return this.claimRepository.softDelete({ id });
  }
}
