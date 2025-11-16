import { AuthNavBar } from "@/components/Auth/AuthNavBar";
import { RegisterForm } from "@/components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="flex flex-col gap-20 w-full max-w-[1200px] mx-auto py-2 px-6">
      <AuthNavBar />
	  <RegisterForm />
    </main>
  );
};

export default RegisterPage;
