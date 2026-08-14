import { PrismaClient, RoleName } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting EcoVision AI Database Seeding...');

  // 1. Seed Roles
  const adminRole = await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: {
      name: RoleName.ADMIN,
      description: 'System Administrator with full access rights',
    },
  });

  const researcherRole = await prisma.role.upsert({
    where: { name: RoleName.RESEARCHER },
    update: {},
    create: {
      name: RoleName.RESEARCHER,
      description: 'AI Researcher with model management & raw data analytics rights',
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: RoleName.USER },
    update: {},
    create: {
      name: RoleName.USER,
      description: 'Standard platform user',
    },
  });

  console.log('✅ Roles seeded successfully');

  // 2. Seed Admin User
  const adminPasswordHash = await bcrypt.hash('AdminPass123!', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ecovision.ai' },
    update: {},
    create: {
      email: 'admin@ecovision.ai',
      passwordHash: adminPasswordHash,
      fullName: 'EcoVision System Administrator',
      roleId: adminRole.id,
      isVerified: true,
      recyclingScore: 1250,
      totalScans: 48,
      totalCo2SavedKg: 34.2,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  // 3. Seed Demo Standard User
  const userPasswordHash = await bcrypt.hash('UserPass123!', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ecovision.ai' },
    update: {},
    create: {
      email: 'demo@ecovision.ai',
      passwordHash: userPasswordHash,
      fullName: 'Alex Morgan',
      roleId: userRole.id,
      isVerified: true,
      recyclingScore: 680,
      totalScans: 22,
      totalCo2SavedKg: 18.5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  });

  console.log(`✅ Default Admin created: admin@ecovision.ai / AdminPass123!`);
  console.log(`✅ Default Demo User created: demo@ecovision.ai / UserPass123!`);

  // 4. Seed Global Application Settings
  const settings = [
    {
      key: 'AI_CONFIDENCE_THRESHOLD',
      value: 0.45,
      description: 'Minimum confidence score for object bounding boxes',
    },
    {
      key: 'MAX_UPLOAD_SIZE_MB',
      value: 10,
      description: 'Maximum image upload payload size in megabytes',
    },
    {
      key: 'ENABLE_PUBLIC_REGISTRATION',
      value: true,
      description: 'Flag to enable/disable self-serve user signups',
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: {
        key: setting.key,
        value: setting.value,
        description: setting.description,
      },
    });
  }

  console.log('✅ Application settings seeded');
  console.log('🚀 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
