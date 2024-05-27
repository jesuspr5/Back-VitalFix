import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';


class ClaimDetails {
    @IsString()
    @IsNotEmpty()
    title: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class SendEmailDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    claimDetails: ClaimDetails;
}