import { Module } from '@nestjs/common';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity,PlatoEntity])],
  providers: [RestaurantePlatoService]
})
export class RestaurantePlatoModule {}
