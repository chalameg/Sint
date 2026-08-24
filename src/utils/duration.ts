export type DurationUnit = 'months' | 'years';

export function durationToMonths(duration: number, unit: DurationUnit): number {
  return unit === 'years' ? duration * 12 : duration;
}
