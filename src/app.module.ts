import { Module } from '@nestjs/common';
import { HealthCheckController } from './app.controller';

import { PrismaModule } from './infra/database/prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
