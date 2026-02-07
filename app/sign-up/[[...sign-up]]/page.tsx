import HeaderSection from "@/components/sections/HeaderSection";
import { auth } from "@/content/auth";
import SignUpClient from "./components/SignUpClient";
import Main from "@/components/layout/Main";

const SingUpPage = () => {
  return (
    <Main>
      <HeaderSection {...auth.registration} />
      <SignUpClient />
    </Main>
  );
};

export default SingUpPage;
