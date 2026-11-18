import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, RoleEntity, TutorStudentEntity, SchoolClassEntity, RefreshSessionEntity } from './entities.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, TutorStudentEntity, SchoolClassEntity, RefreshSessionEntity])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
