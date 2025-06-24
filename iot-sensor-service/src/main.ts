import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Eureka, EurekaClient } from 'eureka-js-client'; // Ensure type import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Plantopia API')
    .setDescription('API documentation for the Plant Monitoring Microservice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`✅ App running at http://localhost:3000`);

  // Eureka Client Config (cast to EurekaClient for type safety)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const eurekaClient = new Eureka({
    instance: {
      app: 'plant-monitoring-service',
      instanceId: 'plant-monitoring-service-1',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        $: 3000,
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  eurekaClient.start((err) => {
    if (err) {
      console.error('❌ Eureka registration failed:', err);
    } else {
      console.log('✅ Eureka registration successful');
    }
  });
}

bootstrap();
