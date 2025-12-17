import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import { prisma } from "@repo/db";

export default async function Page() {
  const user = await prisma.user.findFirst();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {user?.username}
      {user?.email}
    </main>
  );
}
