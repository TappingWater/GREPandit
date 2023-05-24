import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import IconTab from "../ui/IconTab";

const ProfileDropDown = ({
  email,
  logOut,
}: {
  email: string;
  logOut: () => void;
}) => {

	const tabStyling = "hover:bg-slate-600 hover:cursor hover:text-white active:bg-slate-600 active:text-white"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none bg-pink-300 font-bold text-sky-700 text-center font-tabs text-2xl h-[40px] w-[40px] rounded-full">
        {email.charAt(0)}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={tabStyling}>
          <Link href="/profile" className="w-full"><IconTab img="/icons/profile.svg" name="Profile"/></Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={tabStyling}>
          <Link href="/billing" className="w-full"><IconTab img="/icons/billing.svg" name="Billing"/></Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut} className={tabStyling}><IconTab img="/icons/logout-black.svg" name="Log Out"/></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
