#!/usr/bin/env node

import * as readline from "readline";
import { stdin as input, stdout as output } from "process";
import { transform } from "./utilities";

const currentTime = process.argv[2];
const rl = readline.createInterface({ input, output });

rl.on("line", (input) => {
  console.log(transform(input, currentTime));
});
