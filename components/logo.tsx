import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        alt="Barber"
        width={19.35}
        height={24}
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="Barber"
        width={19.35}
        height={24}
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Randevu Al</p>
    </div>
  );
};
