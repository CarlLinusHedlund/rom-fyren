import { resolve } from "path";

export default {
  root: resolve(__dirname, "src"),
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "./src/index.html"),
        signup: resolve(__dirname, "./src/signup.html"),
      },
    },
    // envDir: "../src/js/",
  },
};

// outDir: "../dist",
