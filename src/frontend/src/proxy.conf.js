const PROXY_CONFIG = [
  {
    context: ["/api/**", "/swagger/**"],
    target: "https://localhost:5000",
    changeOrigin: true,
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
  },
];

module.exports = PROXY_CONFIG;
