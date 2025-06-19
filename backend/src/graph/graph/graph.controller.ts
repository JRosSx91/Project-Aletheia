import { Controller, Get } from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  findFullGraph() {
    console.log('GraphController: Request received in GET /graph');
    return this.graphService.getFullGraph();
  }
}
