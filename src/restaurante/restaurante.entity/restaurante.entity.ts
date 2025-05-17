import { PlatoEntity } from "../../plato/plato.entity/plato.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    tipo_cocina: string;

    @Column()
    url: string;

    @ManyToMany(() => PlatoEntity, plato => plato.restaurantes)
    @JoinTable()
    platos: PlatoEntity[];
}
