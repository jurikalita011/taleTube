export function getAspectRatio(width: number, height: number): string {
  // Find the greatest common divisor (GCD) of the width and height
  function gcd(a: number, b: number): number {
    return b ? gcd(b, a % b) : a;
  }

  const divisor = gcd(width, height);
  const aspectRatioWidth = width / divisor;
  const aspectRatioHeight = height / divisor;

  // Normalize the aspect ratio to a common format (e.g., 16:9)
  let numerator, denominator;
  if (aspectRatioWidth >= aspectRatioHeight) {
    numerator = aspectRatioWidth;
    denominator = aspectRatioHeight;
  } else {
    numerator = aspectRatioHeight;
    denominator = aspectRatioWidth;
  }

  // Simplify the fraction
  while (numerator % 2 === 0 && denominator % 2 === 0) {
    numerator /= 2;
    denominator /= 2;
  }

  return `${numerator}:${denominator}`;
}
