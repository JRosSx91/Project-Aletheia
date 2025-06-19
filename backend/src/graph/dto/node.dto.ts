import { IsString, IsUUID, IsOptional } from 'class-validator';

export class NodeDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
