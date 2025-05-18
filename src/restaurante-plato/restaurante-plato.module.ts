import { Module } from '@nestjs/common';
import { RestaurantePlatoService } from './restaurante-plato.service';

@Module({
  providers: [RestaurantePlatoService]
})
export class RestaurantePlatoModule {}
