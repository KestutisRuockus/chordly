import { auth } from "@/content/auth";
import SignUpClient from "./components/SignUpClient";
import Main from "@/components/layout/Main";
import HeroSection from "@/components/sections/HeroSection";

const SingUpPage = () => {
  return (
    <Main>
      <HeroSection {...auth.registration} />
      <SignUpClient />
    </Main>
  );
};

export default SingUpPage;
