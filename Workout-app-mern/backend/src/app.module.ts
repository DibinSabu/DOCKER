import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutModule } from './workout/workout.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('connecting to MongoDB...');
        return {
          uri,
          connectionFactory: (connection) => {
            console.log('DB connected');
            return connection;
          },
        };
      },
    }),
    WorkoutModule,
  ],
  controllers: [],
  providers: [],
})



export class AppModule {}
