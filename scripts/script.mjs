
  
import child_process from 'child_process';
import util from 'util';

const execFile = util.promisify(child_process.execFile);
async function main() {
    console.log((await execFile('yarn')).stdout);
    console.log((await execFile('yarn', ['prisma', 'generate'])).stdout);
    console.log((await execFile('yarn', ['prisma', 'migrate', 'dev'])).stdout);
    console.log((await execFile('yarn', ['dev'])).stdout);
}
main();