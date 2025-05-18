import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteService } from './restaurante.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RestauranteService', () => {
  let service: RestauranteService;
  let repository: Repository<RestauranteEntity>;
  let restaurantesList: RestauranteEntity[];

  const seedDatabase = async () => {
    repository.clear();
    restaurantesList = [];
    for(let i = 0; i < 5; i++){
        const restaurante: RestauranteEntity = await repository.save({
        nombre: faker.food.dish(),
        direccion: faker.location.streetAddress(),
        tipo_cocina: faker.food.ethnicCategory(),
        url: faker.internet.url()})
        restaurantesList.push(restaurante);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestauranteService],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    repository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //------------find------------//
  it('findAll debe retornar todos los restaurantes', async () => {
    const restaurantes: RestauranteEntity[] = await service.findAll();
    expect(restaurantes).not.toBeNull();
    expect(restaurantes).toHaveLength(restaurantesList.length);
  });

  it('findOne debe retornar un restaurante por su id', async () => {
    const storedRestaurante: RestauranteEntity = restaurantesList[0];
    const restaurante: RestauranteEntity = await service.findOne(storedRestaurante.id);
    expect(restaurante).not.toBeNull();
    expect(restaurante.nombre).toEqual(storedRestaurante.nombre)
    expect(restaurante.direccion).toEqual(storedRestaurante.direccion)
    expect(restaurante.tipo_cocina).toEqual(storedRestaurante.tipo_cocina)
    expect(restaurante.url).toEqual(storedRestaurante.url)
  });

  it('findOne debe retornar una excepción para un restaurante no valido', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "No se encontró el restaurante")

  });

  //------------create------------//
  it('create se debe verificar la creación de un nuevo restaurante', async () => {
    const restaurante: RestauranteEntity = {
      id: "",
      nombre: faker.food.dish(),
      direccion: faker.location.streetAddress(),
      tipo_cocina: faker.food.ethnicCategory(),
      url: faker.internet.url(),
      platos: []
    }
 
    const newrestaurante: RestauranteEntity = await service.create(restaurante);
    expect(newrestaurante).not.toBeNull();
 
    const storedrestaurante: RestauranteEntity = await repository.findOneOrFail({where: {id: newrestaurante.id}})
    expect(storedrestaurante).not.toBeNull();
    expect(restaurante.nombre).toEqual(storedrestaurante.nombre)
    expect(restaurante.direccion).toEqual(storedrestaurante.direccion)
    expect(restaurante.tipo_cocina).toEqual(storedrestaurante.tipo_cocina)
    expect(restaurante.url).toEqual(storedrestaurante.url)
  });

  //------------update------------//
  it('update se debe verificar la actualización de un restaurante', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    restaurante.nombre = "New name";
    restaurante.direccion = "New address";
    const updatedrestaurante: RestauranteEntity = await service.update(restaurante.id, restaurante);
    expect(updatedrestaurante).not.toBeNull();
    const storedrestaurante: RestauranteEntity = await repository.findOneOrFail({ where: { id: restaurante.id } })
    expect(storedrestaurante).not.toBeNull();
    expect(storedrestaurante.nombre).toEqual(restaurante.nombre)
    expect(storedrestaurante.direccion).toEqual(restaurante.direccion)
  });

  it('update se debe verificar la actualización de un restaurante no existente', async () => {
    let restaurante: RestauranteEntity = restaurantesList[0];
    restaurante = {
      ...restaurante, nombre: "New name", direccion: "New address"
    }
    await expect(() => service.update("0", restaurante)).rejects.toHaveProperty("message", "No se encontró el restaurante")
  });

  it('delete debe remover un restaurante', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    await service.delete(restaurante.id);
    await expect(() => service.findOne(restaurante.id)).rejects.toHaveProperty("message", "No se encontró el restaurante")
  });

  it('delete debe intentar remover un restaurante que no existe', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "No se encontró el restaurante")
  });
});
