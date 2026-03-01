import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

const LogoLinkToHomepage = () => {
  return (
    <Link
      href={"/"}
      className="cursor-pointer"
      aria-label="Chordly – go to homepage"
    >
      <Image src={logo} alt="" width={72} />
    </Link>
  );
};

export default LogoLinkToHomepage;
