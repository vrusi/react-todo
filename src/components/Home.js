export default function Home({ user }) {
  return (
    <div>
      <h2>Hello, {user.email}</h2>
      <div>
        You have no TODO lists yet 😕
      </div>
    </div>
  );
}