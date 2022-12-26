module.exports = {
  apps: [
    {
      name: 'excel-translator-5412',
      script: 'src/index.js',
      args: '',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 5412,
        DB: 'excel-translate',
        DB_SERVERS: 'localhost:27017',
      },
    },
  ],
};
