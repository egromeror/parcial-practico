import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { RestauranteService } from './restaurante.service';
import { RestauranteDto } from './restaurante.dto/restaurante.dto';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('restaurante')
export class RestauranteController {
    constructor(private readonly restauranteService: RestauranteService){}

    @Get()
    async findAll(){
        return await this.restauranteService.findAll();
    }

    @Get(':restauranteId')
    async finOne(@Param('restauranteId') restauranteId: string){
        return await this.restauranteService.findOne(restauranteId);
    }

    @Post()
    async create(@Body() restauranteDto: RestauranteDto){
        const restaurante: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.create(restaurante);
    }

    @Put(':restauranteId')
    async update(@Body() restauranteDto: RestauranteDto, @Param('restauranteId') restauranteId : string){
        const restaurante: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.update(restauranteId,restaurante);
    }

    @Delete(':restauranteId')
    @HttpCode(204)
    async delete(@Param('restauranteId') restauranteId: string)
    {
        return await this.restauranteService.delete(restauranteId);
    }
}
