import { Test, TestingModule } from '@nestjs/testing';
import { PlatoService } from './plato.service';
import { Repository } from 'typeorm';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlatoService', () => {
let service: PlatoService;
  let repository: Repository<PlatoEntity>;
  let platosList: PlatoEntity[];

  const seedDatabase = async () => {
    repository.clear();
    platosList = [];
    for(let i = 0; i < 5; i++){
        const plato: PlatoEntity = await repository.save({
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
      providers: [PlatoService],
    }).compile();

    service = module.get<PlatoService>(PlatoService);
    repository = module.get<Repository<PlatoEntity>>(getRepositoryToken(PlatoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //------------find------------//
  it('findAll debe retornar todos los platos', async () => {
    const platos: PlatoEntity[] = await service.findAll();
    expect(platos).not.toBeNull();
    expect(platos).toHaveLength(platosList.length);
  });

  it('findOne debe retornar un plato por su id', async () => {
    const storedPlato: PlatoEntity = platosList[0];
    const plato: PlatoEntity = await service.findOne(storedPlato.id);
    expect(plato).not.toBeNull();
    expect(plato.nombre).toEqual(storedPlato.nombre)
    expect(plato.descripcion).toEqual(storedPlato.descripcion)
    expect(plato.precio).toEqual(storedPlato.precio)
    expect(plato.categoria).toEqual(storedPlato.categoria)
  });

  it('findOne debe retornar una excepción para un plato no valido', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "No se encontró el plato")

  });

  //------------create------------//
  it('create se debe verificar la creación de un nuevo plato', async () => {
    const plato: PlatoEntity = {
      id: "",
      nombre: faker.food.dish(),
      descripcion: faker.food.description(),
      precio: faker.number.int(5),
      categoria: faker.food.ethnicCategory(),
      restaurantes: []
    }
 
    const newplato: PlatoEntity = await service.create(plato);
    expect(newplato).not.toBeNull();
 
    const storedplato: PlatoEntity = await repository.findOneOrFail({where: {id: newplato.id}})
    expect(storedplato).not.toBeNull();
    expect(plato.nombre).toEqual(storedplato.nombre)
    expect(plato.descripcion).toEqual(storedplato.descripcion)
    expect(plato.precio).toEqual(storedplato.precio)
    expect(plato.categoria).toEqual(storedplato.categoria)
  });

  //------------update------------//
  it('update se debe verificar la actualización de un plato', async () => {
    const plato: PlatoEntity = platosList[0];
    plato.nombre = "New name";
    plato.descripcion = "New description";
    const updatedplato: PlatoEntity = await service.update(plato.id, plato);
    expect(updatedplato).not.toBeNull();
    const storedplato: PlatoEntity = await repository.findOneOrFail({ where: { id: plato.id } })
    expect(storedplato).not.toBeNull();
    expect(storedplato.nombre).toEqual(plato.nombre)
    expect(storedplato.descripcion).toEqual(plato.descripcion)
  });

  it('update se debe verificar la actualización de un plato no existente', async () => {
    let plato: PlatoEntity = platosList[0];
    plato = {
      ...plato, nombre: "New name", descripcion: "New description"
    }
    await expect(() => service.update("0", plato)).rejects.toHaveProperty("message", "No se encontró el plato")
  });

  it('delete debe remover un plato', async () => {
    const plato: PlatoEntity = platosList[0];
    await service.delete(plato.id);
    await expect(() => service.findOne(plato.id)).rejects.toHaveProperty("message", "No se encontró el plato")
  });

  it('delete debe intentar remover un plato que no existe', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "No se encontró el plato")
  });
});
