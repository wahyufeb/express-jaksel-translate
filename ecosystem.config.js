module.exports = {
  apps: [{
    name: "app",
    script: "./build/index.js",
    env_development: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}