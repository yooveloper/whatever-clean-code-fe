export const generateRandomUniqueNumberSet = (
  count: number,
  range: { min: number; max: number },
): number[] => {
  const { min, max } = range

  if (count > max - min + 1) {
    throw new Error(
      `요청된 숫자 개수(${count})가 범위 내에서 생성 가능한 최대 숫자 개수(${max - min + 1})를 초과했습니다.`,
    )
  }

  const numbers: Set<number> = new Set()
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }

  return Array.from(numbers).sort((a, b) => a - b)
}
