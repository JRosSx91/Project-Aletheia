// src/graph/dto/connection.dto.ts
import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NodeDto } from './node.dto';

export class ConnectionDto {
  @IsUUID()
  id: string;

  @IsString()
  type: string;

  @ValidateNested()
  @Type(() => NodeDto)
  fromNode: NodeDto;

  @ValidateNested()
  @Type(() => NodeDto)
  toNode: NodeDto;
}
