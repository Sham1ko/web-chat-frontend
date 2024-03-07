import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import NavigationBar from "./components/Navbar";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <NavigationBar /> */}
        <Router />
      </QueryClientProvider>
    </>
  );
}
