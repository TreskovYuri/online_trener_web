

const ColorConsole = {
  // Цвет текста
  black: (text) => {
    console.log('\x1b[30m%s\x1b[0m', text);
  },
  red: (text) => {
    console.log('\x1b[31m%s\x1b[0m', text);
  },
  green: (text) => {
    console.log('\x1b[32m%s\x1b[0m', text);
  },
  yellow: (text) => {
    console.log('\x1b[33m%s\x1b[0m', text);
  },
  blue: (text) => {
    console.log('\x1b[34m%s\x1b[0m', text);
  },
  magenta: (text) => {
    console.log('\x1b[35m%s\x1b[0m', text);
  },
  cyan: (text) => {
    console.log('\x1b[36m%s\x1b[0m', text);
  },
  white: (text) => {
    console.log('\x1b[37m%s\x1b[0m', text);
  },
  gray: (text) => {
    console.log('\x1b[90m%s\x1b[0m', text);
  },
  brightRed: (text) => {
    console.log('\x1b[91m%s\x1b[0m', text);
  },
  brightGreen: (text) => {
    console.log('\x1b[92m%s\x1b[0m', text);
  },
  brightYellow: (text) => {
    console.log('\x1b[93m%s\x1b[0m', text);
  },
  brightBlue: (text) => {
    console.log('\x1b[94m%s\x1b[0m', text);
  },
  brightMagenta: (text) => {
    console.log('\x1b[95m%s\x1b[0m', text);
  },
  brightCyan: (text) => {
    console.log('\x1b[96m%s\x1b[0m', text);
  },
  brightWhite: (text) => {
    console.log('\x1b[97m%s\x1b[0m', text);
  },

  // Цвет фона
  bgBlack: (text) => {
    console.log('\x1b[40m%s\x1b[0m', text);
  },
  bgRed: (text) => {
    console.log('\x1b[41m%s\x1b[0m', text);
  },
  bgGreen: (text) => {
    console.log('\x1b[42m%s\x1b[0m', text);
  },
  bgYellow: (text) => {
    console.log('\x1b[43m%s\x1b[0m', text);
  },
  bgBlue: (text) => {
    console.log('\x1b[44m%s\x1b[0m', text);
  },
  bgMagenta: (text) => {
    console.log('\x1b[45m%s\x1b[0m', text);
  },
  bgCyan: (text) => {
    console.log('\x1b[46m%s\x1b[0m', text);
  },
  bgWhite: (text) => {
    console.log('\x1b[47m%s\x1b[0m', text);
  }
};

module.exports = ColorConsole;
