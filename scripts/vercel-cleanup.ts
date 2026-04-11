/**
 * Vercel 构建后清理脚本
 * 移除不必要的文件以减小 Serverless Function 体积
 */

import { readdirSync, existsSync, rmSync } from 'fs';
import { join } from 'path';

const dirs = [
    // pnpm 虚拟存储 - 只保留 Linux 平台
    'node_modules/.pnpm',
];

function cleanDir(dir: string) {
    if (!existsSync(dir)) return;
    
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
            // 保留以下目录：
            // - 以 @ 开头（scoped packages）
            // - 纯字母数字包名
            // 排除：
            // - 包含平台标识的目录（如 win32, darwin, linux, freebsd）
            const isPlatformDir = /win32|darwin|linux|freebsd|arm64|x64|ia32/i.test(entry.name);
            
            if (isPlatformDir) {
                // 删除整个平台目录
                rmSync(fullPath, { recursive: true, force: true });
                console.log(`Removed platform dir: ${fullPath}`);
            } else {
                // 递归清理子目录
                cleanDir(fullPath);
            }
        }
    }
}

console.log('Starting Vercel build cleanup...');

for (const dir of dirs) {
    console.log(`Cleaning ${dir}...`);
    cleanDir(dir);
}

console.log('Cleanup complete!');
