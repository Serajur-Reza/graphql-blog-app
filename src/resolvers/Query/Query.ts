export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(userInfo);
    const profile = await prisma.user.findUnique({
      where: {
        id: Number(userInfo.userId),
      },
    });

    console.log(profile);

    return profile;
  },

  users: async (parent: any, args: any, { prisma }: any) => {
    const users = await prisma.user.findMany();
    return users;
  },

  posts: async (parent: any, args: any, { prisma }: any) => {
    const users = await prisma.post.findMany({
      where: {
        published: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  },

  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(userInfo);
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userInfo.userId),
      },
    });

    console.log(profile);

    return profile;
  },
};
