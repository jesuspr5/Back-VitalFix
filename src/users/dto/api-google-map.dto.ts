import { IsString, IsUUID } from 'class-validator';

export class SearchGoogleMap {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  lat: string;

  @IsString()
  lng: string;
}
