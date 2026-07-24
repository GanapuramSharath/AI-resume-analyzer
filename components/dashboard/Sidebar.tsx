"use client";
import UpgradeButton from "@/components/UpgradeButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Target,
  Briefcase,
  Brain,
  ClipboardList,
  Map,
  Sparkles,
  Crown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Resumes",
    href: "/dashboard/resumes",
    icon: FolderOpen,
  },
  {
    name: "Resume Tailoring",
    href: "/dashboard/tailoring",
    icon: Target,
  },
  {
    name: "Career Match",
    href: "/dashboard/job-match",
    icon: Briefcase,
  },
 
  
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 px-8 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">AI Resume</h1>

            <p className="text-sm text-slate-500">Resume Analyzer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-5 py-6">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Navigation
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                }`}
              >
                <Icon
                  size={20}
                  className={active ? "text-white" : "text-slate-500"}
                />

                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Plan Card */}
      <div className="px-5">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-5 text-white shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-2">
              <Crown size={20} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-white/80">
                Current Plan
              </p>

              <h3 className="font-bold">Free</h3>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/80">Remaining</span>

              <span className="font-semibold">2</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/80">Analyses</span>

              <span className="font-semibold">0</span>
            </div>
          </div>

          <UpgradeButton />
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-200 p-5">
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
