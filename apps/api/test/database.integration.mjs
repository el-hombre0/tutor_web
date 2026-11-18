import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { strict as assert } from 'node:assert';
import { Client } from 'pg';
import { DataSource } from 'typeorm';
import { databaseOptions } from '../dist/database/config.js';
import { seedDemoData } from '../dist/database/seed.js';

const options = databaseOptions(process.env);
const schema = `test_${randomUUID().replaceAll('-', '')}`;
const admin = new Client({ host: options.host, port: options.port, user: options.username, password: options.password, database: options.database });
await admin.connect();
try {
  await admin.query(`CREATE SCHEMA "${schema}"`);
  const dataSource = new DataSource({ ...options, schema, extra: { options: `-c search_path=${schema}` } });
  await dataSource.initialize();
  try {
    await dataSource.runMigrations();
    const roles = await dataSource.query('SELECT name FROM roles ORDER BY name');
    assert.deepEqual(roles.map((role) => role.name), ['admin', 'parent', 'student', 'tech_admin', 'tutor']);
    const users = await dataSource.query(`INSERT INTO users (email, password_hash, full_name) VALUES ('a@example.test', 'hash', 'Tutor'), ('b@example.test', 'hash', 'Tutor 2'), ('c@example.test', 'hash', 'Student') RETURNING id`);
    const group = await dataSource.query(`INSERT INTO classes (name) VALUES ('Test') RETURNING id`);
    await dataSource.query('INSERT INTO tutor_students (tutor_id, student_id) VALUES ($1, $2)', [users[0].id, users[2].id]);
    await dataSource.query('INSERT INTO class_tutors (class_id, tutor_id) VALUES ($1, $2), ($1, $3)', [group[0].id, users[0].id, users[1].id]);
    await dataSource.query('INSERT INTO class_students (class_id, student_id) VALUES ($1, $2)', [group[0].id, users[2].id]);
    const savedClass = await dataSource.getRepository('SchoolClass').findOneOrFail({ where: { id: group[0].id }, relations: { tutors: true, students: true } });
    assert.equal(savedClass.tutors.length, 2);
    assert.equal(savedClass.students.length, 1);
    assert.equal('passwordHash' in savedClass.students[0], false);
    await dataSource.transaction((manager) => seedDemoData(manager));
    await dataSource.transaction((manager) => seedDemoData(manager));
    const demo = await dataSource.query("SELECT count(*)::int AS count FROM users WHERE email LIKE '%@example.test' AND email LIKE 'demo.%'");
    assert.equal(demo[0].count, 7);
    const demoClasses = await dataSource.query("SELECT count(*)::int AS count FROM classes WHERE id IN ('10000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002')");
    assert.equal(demoClasses[0].count, 2);
    const count = await dataSource.query('SELECT count(*)::int AS count FROM class_tutors WHERE class_id = $1', [group[0].id]);
    assert.equal(count[0].count, 2);
    await assert.rejects(dataSource.query('INSERT INTO tutor_students (tutor_id, student_id) VALUES ($1, $1)', [users[0].id]));
    await dataSource.undoLastMigration();
    console.log('Database migration and relations: OK');
  } finally { await dataSource.destroy(); }
} finally {
  await admin.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await admin.end();
}
