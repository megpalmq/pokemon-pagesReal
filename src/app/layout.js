import "./globals.css";
import Nav from "@/components/Nav";
import { PokemonProvider } from "@/hooks/usePokemonApi";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PokemonProvider>
          <Nav />
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
