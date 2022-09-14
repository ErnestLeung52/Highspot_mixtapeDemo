#!/usr/bin/env node

import { program } from 'commander';
import { mixtapeCommand } from './src/commands/cli';

// Associate different commands together
program.addCommand(mixtapeCommand);

// console.log(process.argv);
program.parse(process.argv);
