"use client";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { CogIcon } from "lucide-react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className="h-16 px-5 flex items-center justify-between dark:bg-black border-b">
      <Link href="/admin" className="flex items-center gap-2">
        <Logo /> / Admin
      </Link>
      <nav className="flex-1 flex items-center space-x-4 lg:space-x-6 ml-20">
        <Link
          href="/admin/appointments"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Randevular
        </Link>
      </nav>
      <div className="flex items-center space-x-5">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              {data?.user?.image && (
                <Avatar className="w-7 h-7 mr-2">
                  <AvatarImage src={data?.user?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}

              {data?.user?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <CogIcon className="mr-2 h-4 w-4" />
              <Link href="/settings">Ayarlar</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
