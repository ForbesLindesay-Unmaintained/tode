'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var toml = require('toml');

exports.resolvePaths;
function resolvePaths(from, file) {
  file = file || 'environment.toml';
  var dir = path.resolve(from);
  var paths = [];
  while (dir !== path.dirname(dir)) {
    paths.push(path.join(dir, file));
    dir = path.dirname(dir);
  }
  paths.push(path.join(dir, file));
  return paths.filter(fs.existsSync);
}

exports.loadConfigurations = loadConfigurations;
function loadConfigurations(files) {
  return files.map(function (filename) {
    return toml.parse(fs.readFileSync(filename, 'utf8'));
  });
}

exports.mergeConfigurations = mergeConfigurations;
function mergeConfigurations(configurations) {
  var config = {};
  configurations.forEach(function (part) {
    for (var key in part) {
      if (!(key in config)) {
        config[key] = part[key];
      }
    }
  });
  return config;
}

exports.loadConfig = loadConfig;
function loadConfig(from, environmentFile) {
  var files = resolvePaths(from, environmentFile);
  var configs = loadConfigurations(files);
  return mergeConfigurations(configs);
}