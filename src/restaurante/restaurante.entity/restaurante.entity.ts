import { IsIn } from "class-validator";
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
    @IsIn(["Italiana", "Japonesa", "Mexicana", "Colombiana", "India", "Internacional"], {
    message: 'El tipo de cocina debe ser una de los siguientes: Italiana, Japonesa, Mexicana, Colombiana, India o Internacional',})
    tipo_cocina: string;

    @Column()
    url: string;

    @ManyToMany(() => PlatoEntity, plato => plato.restaurantes)
    @JoinTable()
    platos: PlatoEntity[];
}
