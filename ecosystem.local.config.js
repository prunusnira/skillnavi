module.exports = {
    apps: [
        {
            name: 'skill-navigator',
            script: '/Users/nira/project/skillnavi-nextjs/node_modules/next/dist/bin/next',
            args: 'start -p 3000',
            exec_mode: 'cluster',
            instances: 2,
            autorestart: true,
            cwd: '/Users/nira/project/skillnavi-nextjs',
            env_file: '/Users/nira/project/skillnavi-nextjs/.env.dev',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            out_file: '/Users/nira/project/navilog/out.log',
            error_file: '/Users/nira/project/navilog/error.log',
            node_args: `--max-old-space-size=1024 --max-http-header-size=102400`,
            max_memory_restart: '512M',
            merge_logs: true,
        },
    ],
};
