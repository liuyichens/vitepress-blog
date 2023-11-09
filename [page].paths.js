import * as fs from 'fs';

const result = fs.readdirSync('./posts')

console.log(result)

export default {
  paths() {
    return [
      {
        params: { page: 1 },
      },
      {
        params: { page: 2 },
      },
    ];
  },
};
