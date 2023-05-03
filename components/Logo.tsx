import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: String }) => {
  return (
    <div>
      <Link href="/" className={`flex flex-row items-center p-1 ${className}`}>
        <Image src="/headerLogo.png" alt="Logo" height={70} width={70} />
        <p className="font-heading text-center font-bold flex">
          <span className="text-sky-600">GRE</span> 
          <span className="text-pink-300">Pandit</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;