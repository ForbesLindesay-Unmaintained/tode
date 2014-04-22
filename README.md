# tode

Launch node with TOML files for configuration.  It simply populates your environment variables from any TOML files it can find by looking up the directory tree.  It loads from `environment.toml` by default, but this is configurable if you need to be able to quickly swap your environment out.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/tode/master.svg)](https://travis-ci.org/ForbesLindesay/tode)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/tode.svg)](https://gemnasium.com/ForbesLindesay/tode)
[![NPM version](https://img.shields.io/npm/v/tode.svg)](http://badge.fury.io/js/tode)

## Installation

    npm install tode -g

## Usage

To run `server.js` with the configuration file of `environment.toml`:

    tode

To run `index.js` with the configuration file of `environment.toml`:

    tode index.js

To run `server.js` with the configuration file of `config.toml`:

    tode config.toml

To run `index.js` with the configuration file of `config.toml`:

    tode config.toml index.js

## License

  MIT