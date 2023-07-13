"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../utils/prismadb";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/token";
import sendEmail from "../utils/sendEmail";

interface Props {
  name: string;
  email: string;
  password: string;
}

const BASE_URL = process.env.NEXTAUTH_URL as string;

export async function forgotPasswordWithCredentials(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error("Email does not Exist");
    if (user.provider !== "credentials") {
      throw new Error(
        `This account is sign in with ${user.provider}, cannot change Password`
      );
    }

    const token = generateToken({ userId: user.id });

    await sendEmail({
      to: email,
      url: `${BASE_URL}/reset_password?token=${token}`,
      text: "RESET PASSWORD",
    });

    return { message: "Check your email to re-set your Password!" };
  } catch (error) {
    let message = "";
    if (error instanceof Error) message = error.message;
    else message = String(error);
    redirect(`/errors?error=${message}`);
  }
}

export async function changePasswordWithCredentials(
  old_pass: string,
  new_pass: string
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("UnAuthorized");

    const sessionUser = session.user as User;

    if (sessionUser.provider !== "credentials") {
      throw new Error(`This account is sign in with ${sessionUser.provider}`);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: sessionUser.id,
      },
    });
    if (!user) throw new Error("User does not Exist");

    const compare = await bcrypt.compare(old_pass, user.password as string);
    console.log(`compare ${compare}`);
    if (!compare) throw new Error("Old password does not match");

    const newPass = await bcrypt.hash(new_pass, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPass,
      },
    });

    return { message: "Password Changed Successfully" };
  } catch (error) {
    let message = "";
    if (error instanceof Error) message = error.message;
    else message = String(error);
    redirect(`/errors?error=${message}`);
  }
}

export async function verifyWithCredentials(token: string) {
  try {
    const res: any = verifyToken(token);

    if (res.user) {
      console.log(`user ${JSON.stringify(res.user)}`);

      const userExist = await prisma.user.findUnique({
        where: {
          email: res.user.email,
        },
      });

      if (userExist) return { message: "Verify Success" };

      await prisma.user.create({
        data: {
          ...res.user,
          provider: "credentials",
        },
      });

      return { message: "New User Verify Success" };
    }
  } catch (error) {
    let message = "";
    if (error instanceof Error) message = error.message;
    else message = String(error);
    redirect(`/errors?error=${message}`);
  }
}

export async function signUpWithCredentials({ name, email, password }: Props) {
  const data = { name, email, password };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) throw new Error("Email already exist");
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const token = generateToken({ user: data });
    await sendEmail({
      to: data.email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: "VERIFY EMAIL",
    });

    return {
      message:
        "SignUp successful\n, Please check your email to complete Registration",
    };
  } catch (error) {
    let message = "";
    if (error instanceof Error) message = error.message;
    else message = String(error);
    redirect(`/errors?error=${message}`);
  }
}

export async function updateUser(name: string, image: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("UnAuthorized");
  const user = session.user as User;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        image,
      },
    });

    if (!updatedUser) throw new Error("User does not exist");
    return { message: "User updated Successfully" };
  } catch (error) {
    let message = "";
    if (error instanceof Error) message = error.message;
    else message = String(error);
    redirect(`/errors?error=${message}`);
  }
}
