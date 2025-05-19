import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { Repository } from 'typeorm';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RestaurantePlatoService {
    constructor(@InjectRepository(RestauranteEntity)
    private readonly restauranteRepository: Repository<RestauranteEntity>,
    @InjectRepository(PlatoEntity)
    private readonly platoRepository: Repository<PlatoEntity>){}

    async addDishToRestaurant(platoId: string, restauranteId: string): Promise<RestauranteEntity>{
        const plato: PlatoEntity = await this.findPlato(platoId);
        const restaurante: RestauranteEntity = await this.findRestaurant(restauranteId);

        restaurante.platos = [...restaurante.platos, plato];
        return await this.restauranteRepository.save(restaurante);
    }

    async findDishesFromRestaurant(restauranteId: string): Promise<PlatoEntity[]> {
        try 
        {
            const restaurante: RestauranteEntity = await this.restauranteRepository.findOneOrFail({where: {id: restauranteId}, relations: ["platos"]});
            return restaurante.platos;
        } catch (error) 
        {
            throw new BusinessLogicException("No se encontró restaurante con el Id indicado", BusinessError.NOT_FOUND);
        }
    }

    async updateDishesFromRestaurant(restauranteId: string, platos: PlatoEntity[]): Promise<RestauranteEntity> {
        
        try 
        {
            const restaurante: RestauranteEntity = await this.restauranteRepository.findOneOrFail({where: {id: restauranteId}, relations: ["platos"]});
            
            for (let i = 0; i < platos.length; i++) {
            const plato = await this.findPlato(platos[i].id);
            }
        
            restaurante.platos = platos;
            return await this.restauranteRepository.save(restaurante);
        } catch (error) 
        {
            throw new BusinessLogicException("No se encontró restaurante con el Id indicado", BusinessError.NOT_FOUND);
        }
    }

    async deleteDishFromRestaurant(platoId: string, restauranteId: string){
        const plato = await this.findPlato(platoId);
        const restaurante = await this.findRestaurant(restauranteId);

        const platoRestaurante = restaurante.platos.find(e => e.id === plato.id);

        if (!platoRestaurante)
            throw new BusinessLogicException("El plato no se encuentra asociado al restaurante", BusinessError.PRECONDITION_FAILED)

        restaurante.platos = restaurante.platos.filter(e => e.id !== platoId);
        await this.restauranteRepository.save(restaurante);
    } 

    async findDishFromRestaurant(restauranteId: string, platoId: string): Promise<PlatoEntity> {
        const restaurante: RestauranteEntity = await this.findRestaurant(restauranteId);
        const plato: PlatoEntity = await this.findPlato(platoId);

        const restaurantePlato = restaurante.platos.find(e => e.id === plato.id);
   
        if (!restaurantePlato)
          throw new BusinessLogicException("El plato con el Id indicado no se encuentra asociado al restaurante", BusinessError.PRECONDITION_FAILED)
   
        return restaurantePlato;
    }

    async findRestaurant(id: string): Promise<RestauranteEntity>{
        try 
        {
            const restaurante: RestauranteEntity = await this.restauranteRepository.findOneOrFail({where: {id: id}, relations: ["platos"]});
            return restaurante; 
        } catch (error) 
        {
            throw new BusinessLogicException("No se encontró el restaurante", BusinessError.NOT_FOUND);
        }
    }

    async findPlato(id: string): Promise<PlatoEntity>{
        try 
        {
            const plato: PlatoEntity = await this.platoRepository.findOneOrFail({where:{id}});
            return plato; 
        } catch (error) 
        {
            throw new BusinessLogicException("No se encontró el plato", BusinessError.NOT_FOUND);
        }
    }
}
