export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  return <h1>User {username}</h1>;
}
