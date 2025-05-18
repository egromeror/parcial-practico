import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'

@Injectable()
export class PlatoService {
    constructor(
        @InjectRepository(PlatoEntity)
        private readonly platoRepository: Repository<PlatoEntity>
    ){}

    async findAll(): Promise<PlatoEntity[]>{
            return await this.platoRepository.find({ relations: ["restaurantes"] })
        }
    
        async findOne(id: string): Promise<PlatoEntity>{
            try 
            {
                const plato: PlatoEntity = await this.platoRepository.findOneOrFail({where: {id}, relations: ["restaurantes"]});
                return plato; 
            } catch (error) 
            {
                throw new BusinessLogicException("No se encontró el plato", BusinessError.NOT_FOUND);
            }
        }
    
        async create(plato: PlatoEntity): Promise<PlatoEntity>{
            return await this.platoRepository.save(plato);
        }
    
        async update(id: string, plato: PlatoEntity): Promise<PlatoEntity>
        {
            const persistedPlato:PlatoEntity = await this.findPlato(id);
              
            return await this.platoRepository.save({...persistedPlato, ...plato});
        }
    
        async delete(id: string){
            const plato: PlatoEntity = await this.findPlato(id);
            
            await this.platoRepository.remove(plato);
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