import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from '../entities/node.entity';
import { Connection } from '../entities/connection.entity';
import { GraphDto } from '../dto/graph.dto';
import { NodeDto } from '../dto/node.dto';
import { ConnectionDto } from '../dto/connection.dto';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  /**
   * Gets all nodes and connections to build the graph.
   * In the future, it could accept a 'topic' to return specific graphs.
   */
  async getFullGraph(): Promise<GraphDto> {
    console.log('GraphService: Buscando todos los nodos y conexiones...');

    const nodes = await this.nodeRepository.find();
    const connections = await this.connectionRepository.find({
      relations: ['fromNode', 'toNode'],
    });

    const nodeDtos: NodeDto[] = nodes.map((node) => ({
      id: node.id,
      title: node.title,
      description: node.description,
    }));

    const connectionDtos: ConnectionDto[] = connections.map((connection) => ({
      id: connection.id,
      type: connection.type,
      fromNode: {
        id: connection.fromNode.id,
        title: connection.fromNode.title,
        description: connection.fromNode.description,
      },
      toNode: {
        id: connection.toNode.id,
        title: connection.toNode.title,
        description: connection.toNode.description,
      },
    }));

    return { nodes: nodeDtos, connections: connectionDtos };
  }
}
