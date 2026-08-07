import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

export const queryClient = new QueryClient();

let isRedirectingToLogin = false;

const redirectToLogin = () => {
  if (isRedirectingToLogin) return;
  if (window.location.pathname === "/login") return;

  isRedirectingToLogin = true;
  window.location.assign("/login");
};

const originalFetch = window.fetch.bind(window);

window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  if (response.status === 401) {
    redirectToLogin();
  }

  return response;
};

queryClient.getQueryCache().subscribe((event) => {
  const query = event.query;
  if (!query || query.state.status !== "error") return;

  const error = query.state.error as { status?: number; response?: { status?: number } } | undefined;
  if (error?.status === 401 || error?.response?.status === 401) {
    redirectToLogin();
  }
});

queryClient.getMutationCache().subscribe((event) => {
  const mutation = event.mutation;
  if (!mutation || mutation.state.status !== "error") return;

  const error = mutation.state.error as { status?: number; response?: { status?: number } } | undefined;
  if (error?.status === 401 || error?.response?.status === 401) {
    redirectToLogin();
  }
});

export const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppRoutes;