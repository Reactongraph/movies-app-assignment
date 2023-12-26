import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { validateServerSide } from "@/utlils/helper";

export default async function CheckAuthLayout({ children, isAuthPage }) {
  const session = await getServerSession(authOptions);

  const { status } = validateServerSide(session);

  if (!status && isAuthPage) {
    redirect("/");
  }

  return <>{children}</>;
}
