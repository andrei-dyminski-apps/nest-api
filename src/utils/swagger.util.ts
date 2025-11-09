import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { getSwaggerConfig } from '../config/swagger.config';

export const setupSwagger = (app: INestApplication) => {
  const config = getSwaggerConfig();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
  });
};
