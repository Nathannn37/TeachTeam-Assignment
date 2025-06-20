import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </AuthProvider>
  );
}
