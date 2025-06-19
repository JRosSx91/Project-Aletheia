import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './entities/node.entity';
import { Connection } from './entities/connection.entity';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Node, Connection])],
  providers: [SeederService],
  controllers: [],
})
export class GraphModule {}
