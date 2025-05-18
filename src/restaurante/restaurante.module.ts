import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from './restaurante.entity/restaurante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity])],
  providers: [RestauranteService]
})
export class RestauranteModule {}
