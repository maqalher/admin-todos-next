import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions)

  // console.log("sesion",session);
  

  if(!session){
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <WidgetItem title="Usuarioconectado S-Side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
          {/* <span>{JSON.stringify(session.user)}</span> */}
        </div>
        {
          JSON.stringify(session?.user)
        }
      </WidgetItem>
    </div>
  );
}
