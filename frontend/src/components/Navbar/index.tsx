import { useState, useEffect } from "react";
import Header from "../header";

interface NavbarProps {
  hClass?: string;
}

export default function Navbar({ hClass }: NavbarProps) {
  const [scroll, setScroll] = useState<number>(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className =
    scroll > 80 ? "fixed-navbar animated fadeInDown active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header hClass={hClass} />
    </div>
  );
}
