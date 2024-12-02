function parse(file: string): number[][] {
  const data: number[][] = [];

  file.split("\n").forEach((line: string) => {
    data.push(line.split(" ").map((val: string) => parseInt(val)));
  });

  return data;
}

function isSafe(val: number[]): boolean {
  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < val.length - 1; i++) {
    if (val[i] > val[i + 1]) {
      increasing = false;
    }
    if (val[i] < val[i + 1]) {
      decreasing = false;
    }

    if (
      i > 0 &&
      (val[i] + 3 < val[i + 1] ||
        val[i] - 3 > val[i + 1] ||
        val[i] + 3 < val[i - 1] ||
        val[i] - 3 > val[i - 1] ||
        val[i] === val[i + 1] ||
        val[i] === val[i - 1])
    ) {
      return false;
    }
  }

  return increasing || decreasing;
}

async function one() {
  const file = await Deno.readTextFile("input.txt");
  const data = parse(file);

  let safe = 0;
  data.forEach((val: number[]) => {
    if (isSafe(val)) {
      safe++;
    }
  });

  console.log(safe);
}

async function two() {
  const file = await Deno.readTextFile("input.txt");
  const data = parse(file);

  let safe = 0;
  data.forEach((val: number[]) => {
    if (
      ((): boolean => {
        if (isSafe(val)) {
          return true;
        }

        for (let i = 0; i < val.length; i++) {
          const damped = [...val.slice(0, i), ...val.slice(i + 1)];
          if (isSafe(damped)) {
            return true;
          }
        }

        return false;
      })()
    ) {
      safe++;
    }
  });

  console.log(safe);
}

one();

two();
