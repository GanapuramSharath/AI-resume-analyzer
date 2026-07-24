import { Bell } from "lucide-react";

type HeaderProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back!</p>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="h-6 w-6" />

        <div className="flex items-center gap-3">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name ?? "User"}
              className="h-11 w-11 rounded-full"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
              {user.name?.charAt(0)}
            </div>
          )}

          <div>
            <p className="font-semibold">{user.name}</p>

            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
