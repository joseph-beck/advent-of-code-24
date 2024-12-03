function parse(file: string, regex: RegExp): string[] {
  const data: string[] = [];

  file.split("\n").forEach((line: string) => {
    const matches = line.match(regex);
    if (matches) {
      data.push(...matches);
    }
  });

  return data;
}

function operate(line: string): number {
  const [left, right] = line.split(",");
  const leftNum = parseInt(left.replace("mul(", ""));
  const rightNum = parseInt(right.replace(")", ""));
  return leftNum * rightNum;
}

async function one() {
  const file = await Deno.readTextFile("input.txt");
  const data = parse(file, /mul\(\d+,\d+\)/g);

  let result = 0;
  data.forEach((op: string) => {
    result += operate(op);
  });

  console.log(result);
}

async function two() {
  const file = await Deno.readTextFile("input.txt");
  const data = parse(file, /mul\(\d+,\d+\)|don't\(\)|do\(\)/g);

  let result = 0;
  let operating = true;
  data.forEach((op: string) => {
    if (op === "don't()") {
      operating = false;
    } else if (op === "do()") {
      operating = true;
    }

    if (operating && op !== "do()") {
      result += operate(op);
    }
  });

  console.log(result);
}

one();

two();
