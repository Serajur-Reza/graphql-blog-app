import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query: {
    // me: async (parent: any, args: any, context: any) => {
    //   const users = await prisma.user.findMany();
    //   console.log(users);
    //   return users;
    // },

    users: async (parent: any, args: any, context: any) => {
      const users = await prisma.user.findMany();
      console.log(users);
      return users;
    },

    profile: async (parent: any, args: any, context: any) => {
      console.log(args);
      const profile = await prisma.profile.findUnique({
        where: {
          userId: Number(args.userId),
        },
      });
      console.log(profile);

      return profile;
    },
  },

  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (isExist) {
        return {
          userError: "Already user with this email exists",
          token: null,
        };
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const newUser = await prisma.user.create({
        data: { name: args.name, email: args.email, password: hashedPassword },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser?.id,
          },
        });
      }

      const token = await jwtHelper(
        { userId: newUser.id },
        config.jwt.secret as string
      );

      return { userError: null, token };
    },

    signin: async (parent: any, args: userInfo, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return {
          userError: "User not found",
          token: null,
        };
      }

      const correctPassword = await bcrypt.compare(
        args.password,
        user.password
      );

      console.log(correctPassword);

      if (!correctPassword) {
        return {
          userError: "Incorrect Password",
          token: null,
        };
      }

      const token = await jwtHelper(
        { userId: user.id },
        config.jwt.secret as string
      );

      return {
        token,
      };
    },
  },
};
