#!/usr/bin/env node

var spawn = require('child_process').spawn;
var tode = require('../');
var node = process.execPath || process.argv[0];



var file = process.argv[2] || 'server.js';


// build up the node(1) arguments for Generator support
var argv = (process.execArgv || []).slice(0);

// process the regular arguments. if any of them begin with a hyphen (-) then
// it's a switch and should be added *before* the ENTRY_POINT in the argv...
var argsStart = 2;
for (var i = argsStart; i < process.argv.length; i++) {
  var arg = process.argv[i];
  var isFlag = '-' == arg[0];
  if (isFlag) {
    argv.push(arg);
    argsStart++;
  } else {
    // must be the script file
    break;
  }
}
var environmentFile = 'environment.toml';
if (/\.toml$/.test(process.argv[argsStart])) {
  environmentFile = process.argv[argsStart++];
}

var file = process.argv[argsStart];
if (file && file[0] !== '-') {
  argsStart++;
} else {
  file = 'server.js';
}
argv.push(file);

var env = tode.loadConfig(file, environmentFile);
for (var key in process.env) {
  env[key] = process.env[key];
}

// add the rest of the arguments specified by the user
if (process.argv.length >= argsStart) {
  argv.push.apply(argv, process.argv.slice(argsStart));
}

if (env.TODE_PRINT_ARGS === 'TRUE') {
  // print out the arguments that will be passed in for debugging purposes
  console.error(argv);
}

var opts = {
  customFds: [ 0, 1, 2 ],
  stdio: 'inherit',
  env: env
};

// spawn a new node process with the necessary flags
var child = spawn(node, argv, opts);
child.on('exit', onexit);

/**
 * Main node subprocess "exit" event handler.
 * Proxies the exit code up to this process.
 */

function onexit(code, signal) {
  if (signal) {
    process.kill(process.pid, signal);
  } else if (0 !== code) {
    if (null == process.exitCode) {
      // old node, no `process.exitCode` support...
      process.exit(code);
    } else {
      // newer node, we can set `process.exitCode`
      // and let the process exit naturally
      process.exitCode = code;
    }
  }
}
