import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';
import { AdminModule } from './admin/admin.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, PropertyModule, AdminModule],
})
export class AppModule {}
