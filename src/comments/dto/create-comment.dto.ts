import { IsString} from "class-validator";

export class CreateCommentDto {

@IsString()
description:string
}
