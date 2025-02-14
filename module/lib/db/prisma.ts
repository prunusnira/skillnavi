import { PrismaClient } from '@prisma/client';

const globalPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
    globalPrisma.prisma ||
    new PrismaClient().$extends({
        result: {
            skillList: {
                skill: {
                    needs: {
                        rate: true,
                        level: true,
                    },
                    compute(skillList) {
                        return (skillList.level || 0) * (skillList.rate || 0);
                    },
                },
            },
        },
    });
globalPrisma.prisma = prisma;

export default prisma;
