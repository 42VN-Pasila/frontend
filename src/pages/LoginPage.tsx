import  AuthNavBar  from "@/components/Auth/AuthNavBar";
import { LoginForm } from "../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center gap-10 w-full max-w-[1200px] mx-auto py-2 px-6">
      <AuthNavBar />
      <LoginForm />
    </main>
  );
};

export default LoginPage;
