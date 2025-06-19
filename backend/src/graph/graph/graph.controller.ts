import { Controller, Get } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphDto } from '../dto/graph.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  findFullGraph(): Promise<GraphDto> {
    console.log('GraphController: Request received in GET /graph');
    return this.graphService.getFullGraph();
  }
}
