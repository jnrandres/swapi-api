import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePlanetDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nombre!: string;

  @IsOptional()
  @IsString()
  periodo_rotacion!: string;

  @IsOptional()
  @IsString()
  periodo_orbital!: string;

  @IsOptional()
  @IsString()
  diametro!: string;

  @IsOptional()
  @IsString()
  clima!: string;

  @IsOptional()
  @IsString()
  gravedad!: string;

  @IsOptional()
  @IsString()
  terreno!: string;

  @IsOptional()
  @IsString()
  superficie_agua!: string;

  @IsOptional()
  @IsString()
  poblacion!: string;

  @IsOptional()
  @IsString({ each: true })
  residentes!: string[];

  @IsOptional()
  @IsString({ each: true })
  peliculas!: string[];

  @IsOptional()
  @IsString()
  url!: string;
}
