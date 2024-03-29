import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

export default function LoginCard() {
  return (
    <>
      <Card className="mx-auto flex w-full flex-col justify-center max-w-md bg-white bg-opacity-10 backdrop-blur-md  ">
        <CardHeader>
          <CardTitle className="">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-base font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
