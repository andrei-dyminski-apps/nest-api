import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Nest API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
};
