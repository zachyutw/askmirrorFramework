import { exec } from 'child_process';
import sys from 'sys';

export default () => {
    exec('pwd', (error, stdout, stderr) => {
        sys.print(stdout);
    });
};
