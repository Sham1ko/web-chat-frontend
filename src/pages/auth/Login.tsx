import LoginCard from "@/components/auth/login/LoginCard";

export default function Login() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10 size-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute inset-x-0 top-0 -z-10 m-auto size-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
      </div>
      <LoginCard />
    </div>
  );
}
