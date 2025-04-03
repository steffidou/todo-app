export default defineConfig({
  server: {
      proxy: {
          "/api": {
              target: "hhttps://todo-app-u6pm.onrender.com/",
              changeOrigin: true,
              secure: false,
          },
      },
  },
});
