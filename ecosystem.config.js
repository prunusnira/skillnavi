module.exports = {
    apps: [
        {
            name: 'skill-navigator',
            script: '/app/node_modules/next/dist/bin/next',
            args: 'start -p 3000',
            exec_mode: 'cluster',
            instances: 2,
            autorestart: true,
            cwd: '/app',
            env_file: '/app/.env.prd',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            out_file: '/data/log/out.log',
            error_file: '/data/log/error.log',
            node_args: `--max-old-space-size=1024 --max-http-header-size=102400`,
            max_memory_restart: '512M',
            merge_logs: true,
        },
    ],
};
