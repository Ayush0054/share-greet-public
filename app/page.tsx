import Landing from "./components/landing";
import NavbarC from "./components/navbar";

export default function Home() {
  return (
    <main className=" grid justify-items-center gap-5">
      <NavbarC />
      <Landing />
    </main>
  );
}
