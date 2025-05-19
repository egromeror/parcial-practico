import { Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RestaurantePlatoService } from './restaurante-plato.service';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('restaurante-plato')
export class RestaurantePlatoController {
    constructor(private readonly restaurantePlatoService: RestaurantePlatoService){}

    @Post(':restauranteId/platos/:platoId')
    async addDishToRestaurant(@Param('restauranteId') restauranteId: string,@Param('platoId') platoId: string)
    {
        return await this.restaurantePlatoService.addDishToRestaurant(platoId,restauranteId);
    }

    @Get(':restauranteId/platos')
    async findDishesFromRestaurant(@Param('restauranteId') restauranteId: string)
    {
        return await this.restaurantePlatoService.findDishesFromRestaurant(restauranteId);
    }

    @Get(':restauranteId/platos/:platoId')
    async findDishFromRestaurant(@Param('restauranteId') restauranteId: string,@Param('platoId') platoId: string)
    {
        return await this.restaurantePlatoService.findDishFromRestaurant(restauranteId,platoId);
    }

    @Delete(':restauranteId/platos/:platoId')
    async deleteDishFromRestaurant(@Param('restauranteId') restauranteId: string,@Param('platoId') platoId: string)
    {
        return await this.restaurantePlatoService.deleteDishFromRestaurant(platoId,restauranteId);
    }
    
    /*- updateDishesFromRestaurant */

}
