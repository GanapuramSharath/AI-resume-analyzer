import { findUserByEmail, createUser } from "@/repositories/user.repository";
import { hashPassword } from "@/lib/bcrpt";

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export async function register(data: RegisterData) {
  const { username, email, password } = data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    username,
    email,
    passwordHash,
  });

  return {
    message: "Registration successful",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
}
