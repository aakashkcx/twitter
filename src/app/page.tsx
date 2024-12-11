import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container my-5 mx-auto text-center">
      <h1 className="text-3xl mb-4">Twitter</h1>
      <p className="mb-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, at?
      </p>
      <div className="flex gap-2 justify-center">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </div>
  );
}
