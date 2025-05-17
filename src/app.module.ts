import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestauranteModule } from './restaurante/restaurante.module';
import { PlatoModule } from './plato/plato.module';
import { RestaurantePlatoModule } from './restaurante-plato/restaurante-plato.module';

@Module({
  imports: [RestauranteModule, PlatoModule, RestaurantePlatoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
