import { RestauranteEntity } from "../../restaurante/restaurante.entity/restaurante.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlatoEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;
    
    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    precio: number;

    @Column()
    categoria: string;

    @ManyToMany(() => RestauranteEntity, restaurante => restaurante.platos)
    @JoinTable()
    restaurantes: RestauranteEntity[];
}
