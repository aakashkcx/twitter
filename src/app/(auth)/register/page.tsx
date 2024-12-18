export default function RegisterPage() {
  return (
    <div className="">
      <h1 className="text-3xl">Register</h1>
      <form>
        <input type="text" name="username" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
