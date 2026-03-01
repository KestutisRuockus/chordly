import { Linkedin, Instagram, Facebook } from "lucide-react";
import LogoLinkToHomepage from "../ui/LogoLinkToHomepage";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="flex flex-col min-[475px]:flex-row gap-8 sm:gap-24 justify-between sm:justify-center max-sm:px-4 py-4 max-[475px]:items-center">
        <LogoLinkToHomepage />
        <address className="flex flex-col text-sm not-italic">
          <p>+37012345678</p>
          <p>support@chordly.com</p>
          <p>Another street 999, Somewhere</p>
        </address>
        <nav aria-label="Social links navigation" className="flex flex-col">
          <Link
            href="/"
            className="flex gap-1 items-center px-2 py-1.5 rounded-md hover:bg-black/10 transition-colors duration-300"
          >
            <span className="text-sm">LinkedIn</span>
            <Linkedin size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/"
            className="flex gap-1 items-center px-2 py-1.5 rounded-md hover:bg-black/10 transition-colors duration-300"
          >
            <span className="text-sm">Instagram</span>
            <Instagram size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/"
            className="flex gap-1 items-center px-2 py-1.5 rounded-md hover:bg-black/10 transition-colors duration-300"
          >
            <span className="text-sm">Facebook</span>
            <Facebook size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
      <div className="text-center border-t">© 2026 Chordly</div>
    </footer>
  );
};

export default Footer;
