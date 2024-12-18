export default function LoginPage() {
  return (
    <div className="">
      <h1 className="text-3xl">Login</h1>
      <form>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
