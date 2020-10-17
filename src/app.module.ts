import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://paulo_cayres:Pccr0976@cayres.bw85l.mongodb.net/<dbname>?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
