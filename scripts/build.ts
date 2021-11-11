import { join } from "path";

const shell = require('shelljs');
const cwd = process.cwd();
const pkg = require(join(cwd, 'package.json'));

shell.exec('npm run build');
shell.rm('-rf', 'work');
shell.mkdir('-p', 'work');

shell.cp('Dockerfile', 'work/Dockerfile');
shell.exec('ncc build dist/src/main.js -m -o work');

shell.ShellString("Dockerfile").to('work/.dockerignore');
shell.ShellString(JSON.stringify({
  version: pkg.version,
  buildTimestamp: Date.now()
}, null, 2)).to('work/version.json');


shell.cd('work');

shell.exec(`docker build --tag ${pkg.name}:dev .`);
shell.exec(`docker tag ${pkg.name}:dev ${pkg.name}:${pkg.version}`);
