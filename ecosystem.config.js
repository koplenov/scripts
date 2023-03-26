const log_file = "static/actual.log"
const log_date_format = "YYYY-MM-DD HH:mm:ss"

module.exports = [
    {
        name: '[scripts > server]',
        script: 'server.js',
        autorestart: true,
        log_file,
        log_date_format,
        env: {
            PORT: 5004,
            NODE_ENV: "production",
          },    
    },
    {
        name: '[scripts > cron] get ai free space statistics ',
        script: "scripts/ai.js",
        cron_restart: "0 */4 * * *",
        watch: false,
        autorestart: false,
        log_file,
        log_date_format,
    }
]
// 0 * * * * - every hour
// 0 */2 * * * - every two hours
// * * * * * - every minute
// 00 00 * * * - every day an midnight