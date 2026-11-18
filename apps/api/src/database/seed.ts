import type { EntityManager } from 'typeorm';

/** Adds repeatable development fixtures without changing existing records. */
export async function seedDemoData(db: Pick<EntityManager, 'query'>): Promise<void> {
  const roles: Array<{ name: string }> = await db.query("SELECT name FROM roles WHERE name IN ('tutor', 'student', 'parent', 'tech_admin')");
  if (roles.length !== 4) throw new Error('Required roles are missing; apply the database migrations first');
  const users = [
    ['20000000-0000-4000-8000-000000000001', 'demo.tutor1@example.test', 'Анна Смирнова', 'tutor'],
    ['20000000-0000-4000-8000-000000000002', 'demo.tutor2@example.test', 'Дмитрий Волков', 'tutor'],
    ['20000000-0000-4000-8000-000000000003', 'demo.student1@example.test', 'Алексей Иванов', 'student'],
    ['20000000-0000-4000-8000-000000000004', 'demo.student2@example.test', 'Мария Соколова', 'student'],
    ['20000000-0000-4000-8000-000000000005', 'demo.student3@example.test', 'Егор Кузнецов', 'student'],
    ['20000000-0000-4000-8000-000000000006', 'demo.parent@example.test', 'Елена Иванова', 'parent'],
    ['20000000-0000-4000-8000-000000000007', 'demo.tech@example.test', 'Олег Петров', 'tech_admin'],
  ];
  for (const [id, email, name, role] of users) {
    const matches: Array<{ id: string; email: string }> = await db.query('SELECT id, email FROM users WHERE id = $1 OR email = $2', [id, email]);
    if (matches.some((user) => user.id !== id || user.email !== email)) throw new Error(`Demo user conflicts with an existing user: ${email}`);
    await db.query('INSERT INTO users (id, email, password_hash, full_name) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING', [id, email, '!demo-account-login-disabled', name]);
    await db.query('INSERT INTO user_roles (user_id, role_id) SELECT $1, id FROM roles WHERE name = $2 ON CONFLICT DO NOTHING', [id, role]);
  }
  for (const [id, name] of [['10000000-0000-4000-8000-000000000001', 'Математика — 7 класс'], ['10000000-0000-4000-8000-000000000002', 'Математика — 9 класс']]) {
    const matches: Array<{ name: string }> = await db.query('SELECT name FROM classes WHERE id = $1', [id]);
    if (matches.length > 0 && matches[0].name !== name) throw new Error(`Demo class conflicts with an existing class: ${id}`);
    await db.query('INSERT INTO classes (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING', [id, name]);
  }
  for (const [classId, studentId] of [['10000000-0000-4000-8000-000000000001', users[2][0]], ['10000000-0000-4000-8000-000000000001', users[3][0]], ['10000000-0000-4000-8000-000000000002', users[4][0]]])
    await db.query('INSERT INTO class_students (class_id, student_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [classId, studentId]);
  for (const [classId, tutorId] of [['10000000-0000-4000-8000-000000000001', users[0][0]], ['10000000-0000-4000-8000-000000000001', users[1][0]], ['10000000-0000-4000-8000-000000000002', users[1][0]]])
    await db.query('INSERT INTO class_tutors (class_id, tutor_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [classId, tutorId]);
  for (const [tutorId, studentId] of [[users[0][0], users[2][0]], [users[0][0], users[3][0]], [users[1][0], users[2][0]], [users[1][0], users[3][0]], [users[1][0], users[4][0]]])
    await db.query('INSERT INTO tutor_students (tutor_id, student_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [tutorId, studentId]);
}
