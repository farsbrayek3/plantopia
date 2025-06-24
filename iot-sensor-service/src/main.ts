/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Eureka, EurekaClient } from 'eureka-js-client'; // Ensure type import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS before anything else that depends on request handling
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Plantopia API')
    .setDescription('API documentation for the Plant Monitoring Microservice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
  console.log(`✅ App running at http://localhost:3001`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const eurekaClient = new Eureka({
    instance: {
      app: 'plant-monitoring-service',
      instanceId: 'plant-monitoring-service-1',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        $: 3001,
        '@enabled': true,
      },
      vipAddress: 'plant-monitoring-service',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  }) as unknown as EurekaClient;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  eurekaClient.start((err) => {
    if (err) {
      console.error('❌ Eureka registration failed:', err);
    } else {
      console.log('✅ Eureka registration successful');
    }
  });
}

bootstrap();
