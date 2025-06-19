import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NodeDto } from './node.dto';
import { ConnectionDto } from './connection.dto';

export class GraphDto {
  @ValidateNested({ each: true })
  @Type(() => NodeDto)
  nodes: NodeDto[];

  @ValidateNested({ each: true })
  @Type(() => ConnectionDto)
  connections: ConnectionDto[];
}
