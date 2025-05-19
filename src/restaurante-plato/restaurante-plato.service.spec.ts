import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { Repository } from 'typeorm';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RestaurantePlatoService', () => {
  let service: RestaurantePlatoService;
  let restauranteRepository: Repository<RestauranteEntity>;
  let platoRepository: Repository<PlatoEntity>;
  let restaurante: RestauranteEntity;
  let platosList: PlatoEntity[];

  const seedDatabase = async () => {
    platoRepository.clear();
    platosList = [];
    for(let i = 0; i < 5; i++){
        const plato: PlatoEntity = await platoRepository.save({
        nombre: faker.food.dish(),
        descripcion: faker.food.description(),
        precio: faker.number.int(5),
        categoria: faker.food.ethnicCategory()})
        platosList.push(plato);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantePlatoService],
    }).compile();

    service = module.get<RestaurantePlatoService>(RestaurantePlatoService);
    platoRepository = module.get<Repository<PlatoEntity>>(getRepositoryToken(PlatoEntity));
    restauranteRepository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*- 
- findDishesFromRestaurant
- findDishFromRestaurant
- updateDishesFromRestaurant
- deleteDishFromRestaurant 
 */
  it('addDishToRestaurant', async () => {
    const plato: PlatoEntity = {
      id: "",
      nombre: faker.food.dish(),
      descripcion: faker.food.description(),
      precio: faker.number.int(5),
      categoria: faker.food.ethnicCategory(),
      restaurantes: []
    }
    const newplato: PlatoEntity = await platoRepository.save(plato);

    const restaurante: RestauranteEntity = {
      id: "",
      nombre: faker.food.dish(),
      direccion: faker.location.streetAddress(),
      tipo_cocina: faker.food.ethnicCategory(),
      url: faker.internet.url(),
      platos: []
    }
    const newrestaurante: RestauranteEntity = await restauranteRepository.save(restaurante);

    const result: RestauranteEntity = await service.addDishToRestaurant(newplato.id,newrestaurante.id);
    expect(result.platos.length).toBe(1);
    expect(result.platos[0]).not.toBeNull();
    expect(result.platos[0].nombre).toBe(newplato.nombre)
    expect(result.platos[0].descripcion).toBe(newplato.descripcion)
  });

  it('findDishesFromRestaurant', async () => {
    const plato: PlatoEntity = {
      id: "",
      nombre: faker.food.dish(),
      descripcion: faker.food.description(),
      precio: faker.number.int(5),
      categoria: faker.food.ethnicCategory(),
      restaurantes: []
    }
    const newplato: PlatoEntity = await platoRepository.save(plato);

    const restaurante: RestauranteEntity = {
      id: "",
      nombre: faker.food.dish(),
      direccion: faker.location.streetAddress(),
      tipo_cocina: faker.food.ethnicCategory(),
      url: faker.internet.url(),
      platos: []
    }
    const newrestaurante: RestauranteEntity = await restauranteRepository.save(restaurante);

    await service.addDishToRestaurant(newplato.id,newrestaurante.id);
    const result: PlatoEntity[] = await service.findDishesFromRestaurant(newrestaurante.id)
    expect(result.length).toBe(1);
    expect(result[0]).not.toBeNull();
    expect(result[0].nombre).toBe(newplato.nombre)
    expect(result[0].descripcion).toBe(newplato.descripcion)
  });
});
