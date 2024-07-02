interface GenerateArrayAroundNumberProps { 
  num: number;
  lowerBound?: number;
  upperBound?: number;
}

export function generateArrayAroundNumber({
  num,
  lowerBound = 0,
  upperBound = 10,
} : GenerateArrayAroundNumberProps) {
  // Ensure the given number is within bounds
  num = Math.max(lowerBound, Math.min(num, upperBound));

  let start = num;
  let end = num;

  // Extend the range to include up to two numbers on either side of num,
  // prioritizing filling the range towards the upper bound first.
  while (end - start < 4 && (start > lowerBound || end < upperBound)) {
    if (start > lowerBound) start--;
    if (end - start < 4 && end < upperBound) end++;
  }

  // Generate the array
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}
