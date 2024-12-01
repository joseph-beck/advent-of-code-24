function parse(input: string): [number[], number[]] {
  const data: [number[], number[]] = [[], []];

  input.split("\n").forEach((line: string) => {
    const [left, right] = line.split("   ");

    data[0].push(parseInt(left));
    data[1].push(parseInt(right));
  });

  data.forEach((arr) => {
    arr = arr.sort((a, b) => a - b);
  });

  return data;
}

function occurances(find: number, arr: number[]): number {
  let count: number = 0;

  arr.forEach((val: number) => {
    if (find === val) {
      count++;
    }
  });

  return count;
}

async function one() {
  const file = await Deno.readTextFile("input.txt");
  const data = parse(file);

  let result: number = 0;
  data[0].forEach((val: number, index: number) => {
    const difference: number = ((): number => {
      if (val - data[1][index] > 0) {
        return val - data[1][index];
      }

      return data[1][index] - val;
    })();

    result += difference;
  });

  console.log(result);
}

async function two() {
  const file = await Deno.readTextFile("input.txt");
  const data = parse(file);

  let result: number = 0;
  data[0].forEach((val: number) => {
    const count = occurances(val, data[1]);
    result += count * val;
  });

  console.log(result);
}

one();

two();
