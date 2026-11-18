import { EntitySchema } from 'typeorm';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  roles: Role[];
}
export interface Role {
  id: number;
  name: string;
  users: User[];
}
export interface TutorStudent {
  tutorId: string;
  studentId: string;
  createdAt: Date;
  tutor: User;
  student: User;
}
export interface SchoolClass {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  students: User[];
  tutors: User[];
}
export interface RefreshSession {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
  user: User;
}

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    email: { type: 'varchar', length: 320, unique: true },
    passwordHash: {
      name: 'password_hash',
      type: 'varchar',
      length: 255,
      select: false,
    },
    fullName: { name: 'full_name', type: 'varchar', length: 255 },
    isActive: { name: 'is_active', type: 'boolean', default: true },
    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },
    updatedAt: { name: 'updated_at', type: 'timestamptz', updateDate: true },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      deleteDate: true,
    },
  },
  relations: {
    roles: {
      type: 'many-to-many',
      target: 'Role',
      inverseSide: 'users',
      joinTable: {
        name: 'user_roles',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'role_id' },
      },
    },
  },
});
export const RoleEntity = new EntitySchema<Role>({
  name: 'Role',
  tableName: 'roles',
  columns: {
    id: { type: 'int', primary: true, generated: 'increment' },
    name: { type: 'varchar', length: 32, unique: true },
  },
  relations: {
    users: { type: 'many-to-many', target: 'User', inverseSide: 'roles' },
  },
});
export const TutorStudentEntity = new EntitySchema<TutorStudent>({
  name: 'TutorStudent',
  tableName: 'tutor_students',
  columns: {
    tutorId: { name: 'tutor_id', type: 'uuid', primary: true },
    studentId: { name: 'student_id', type: 'uuid', primary: true },
    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },
  },
  checks: [{ expression: '"tutor_id" <> "student_id"' }],
  relations: {
    tutor: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'tutor_id' },
      onDelete: 'CASCADE',
    },
    student: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'student_id' },
      onDelete: 'CASCADE',
    },
  },
});
export const SchoolClassEntity = new EntitySchema<SchoolClass>({
  name: 'SchoolClass',
  tableName: 'classes',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 255 },
    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },
    updatedAt: { name: 'updated_at', type: 'timestamptz', updateDate: true },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      deleteDate: true,
    },
  },
  relations: {
    students: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'class_students',
        joinColumn: { name: 'class_id' },
        inverseJoinColumn: { name: 'student_id' },
      },
    },
    tutors: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'class_tutors',
        joinColumn: { name: 'class_id' },
        inverseJoinColumn: { name: 'tutor_id' },
      },
    },
  },
});
export const RefreshSessionEntity = new EntitySchema<RefreshSession>({
  name: 'RefreshSession',
  tableName: 'refresh_sessions',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    userId: { name: 'user_id', type: 'uuid' },
    tokenHash: {
      name: 'token_hash',
      type: 'varchar',
      length: 255,
      select: false,
    },
    expiresAt: { name: 'expires_at', type: 'timestamptz' },
    revokedAt: { name: 'revoked_at', type: 'timestamptz', nullable: true },
    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },
  },
  indices: [{ columns: ['userId'] }],
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
    },
  },
});
