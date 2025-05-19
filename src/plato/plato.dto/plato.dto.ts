import { IsString, IsNotEmpty, IsNumber, IsIn } from "class-validator";

export class PlatoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsNotEmpty()
    @IsIn(["entrada", "plato fuerte", "postre", "bebida"], {
    message: 'La categoria debe ser una de las siguientes: "entrada", "plato fuerte", "postre" o "bebida"',})
    categoria: string;
    
}
