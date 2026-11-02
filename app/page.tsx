import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Modules from "@/components/Modules";
import Advantages from "@/components/Advantages";
import RegisterForm from "@/components/RegisterForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Modules />
        <Advantages />
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
