import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Thread } from './threads/entities/thread.entity';
import { ThreadsModule } from './threads/threads.module';
import { User } from './users/entities/user.entities';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThreadsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '../db/chat.sqlite',
      entities: [Thread, Comment, User],
      synchronize: true,
      logging: true,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
