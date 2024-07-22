module.exports = {
  apps: [
    {
      name: "flashlight",
      script: "dist/apps/flashlight/main.js",
      instances: 1,
      env: {
        port: "4000",
        NODE_ENV: "development",
      },
      env_stage: {
        port: "4000",
        NODE_ENV: "stage",
      },
    },
  ],
};
