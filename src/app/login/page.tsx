import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSession, login, logout } from "@/auth/session/auth-session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  return (
    <div className="flex justify-center mt-6">
      <Card className="w-80 p-5">
        <form
          action={async (formData) => {
            "use server";
            await login(formData);
            // redirect("/");
          }}
        >
          <Input type="email" name="email" placeholder="Email" />
          <br />
          <Button type="submit">Login</Button>
        </form>
        <form
          action={async () => {
            "use server";
            await logout();
            // redirect("/");
          }}
        >
          <Button className="my-4" variant={"outline"} type="submit">
            Logout
          </Button>
        </form>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </Card>
    </div>
  );
}
