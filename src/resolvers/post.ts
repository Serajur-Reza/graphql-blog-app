export const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const res = await prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });

    return res;
  },
};
