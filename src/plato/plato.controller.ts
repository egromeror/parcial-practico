import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { PlatoService } from './plato.service';
import { PlatoDto } from './plato.dto/plato.dto';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('plato')
export class PlatoController {
    constructor(private readonly platoService: PlatoService){}
    
        @Get()
        async findAll(){
            return await this.platoService.findAll();
        }
    
        @Get(':platoId')
        async finOne(@Param('platoId') platoId: string){
            return await this.platoService.findOne(platoId);
        }
    
        @Post()
        async create(@Body() platoDto: PlatoDto){
            const plato: PlatoEntity = plainToInstance(PlatoEntity, platoDto);
            return await this.platoService.create(plato);
        }
    
        @Put(':platoId')
        async update(@Body() platoDto: PlatoDto, @Param('platoId') platoId : string){
            const plato: PlatoEntity = plainToInstance(PlatoEntity, platoDto);
            return await this.platoService.update(platoId,plato);
        }
    
        @Delete(':platoId')
        @HttpCode(204)
        async delete(@Param('platoId') platoId: string)
        {
            return await this.platoService.delete(platoId);
        }
}
