import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvConfigModule } from './infrastructure/env-config/env-config.module'

@Module({
  imports: [EnvConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
