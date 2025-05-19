import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class RestauranteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(["Italiana", "Japonesa", "Mexicana", "Colombiana", "India", "Internacional"], {
    message: 'El tipo de cocina debe ser una de los siguientes: Italiana, Japonesa, Mexicana, Colombiana, India o Internacional',})
    tipo_cocina: string;

    @IsString()
    @IsNotEmpty()
    url: string;
}
