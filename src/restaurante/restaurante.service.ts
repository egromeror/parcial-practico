import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'

@Injectable()
export class RestauranteService {
    constructor(
        @InjectRepository(RestauranteEntity)
        private readonly restauranteRepository: Repository<RestauranteEntity>
    ){}

    async findAll(): Promise<RestauranteEntity[]>{
        return await this.restauranteRepository.find({ relations: ["platos"] })
    }

    async findOne(id: string): Promise<RestauranteEntity>{
        try 
        {
            const restaurante: RestauranteEntity = await this.restauranteRepository.findOneOrFail({where: {id}, relations: ["platos"]});
            return restaurante; 
        } catch (error) 
        {
            throw new BusinessLogicException("No se encontró el restaurante", BusinessError.NOT_FOUND);
        }
    }

    async create(restaurante: RestauranteEntity): Promise<RestauranteEntity>{
        return await this.restauranteRepository.save(restaurante);
    }

    async update(id: string, restaurante: RestauranteEntity): Promise<RestauranteEntity>
    {
        const persistedRestaurante:RestauranteEntity = await this.findRestaurant(id);
          
        return await this.restauranteRepository.save({...persistedRestaurante, ...restaurante});
    }

    async delete(id: string){
        const restaurante: RestauranteEntity = await this.findRestaurant(id);
        
        await this.restauranteRepository.remove(restaurante);
    }

    async findRestaurant(id: string): Promise<RestauranteEntity>{
        try 
        {
            const restaurante: RestauranteEntity = await this.restauranteRepository.findOneOrFail({where:{id}});
            return restaurante; 
        } catch (error) 
        {
            throw new BusinessLogicException("No se encontró el restaurante", BusinessError.NOT_FOUND);
        }
    }
}
