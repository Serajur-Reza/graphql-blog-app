export const Profile = {
  user: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const res = await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });

    return res;
  },
};
