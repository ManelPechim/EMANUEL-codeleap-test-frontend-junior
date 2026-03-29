export const config = {
  routes: [
    {
      src: "/api/(.*)",
      dest: "${MOCK_API_URL}/$1",
      env: ["MOCK_API_URL"],
    },
    {
      src: "/((?!api/|.*\\..*).*)",
      dest: "/index.html",
    },
  ],
};