/**
 * Calculate years of experience since company founding
 * Company founded: January 1, 2020
 */
export function getYearsOfExperience(): number {
  const foundingDate = new Date(2020, 0, 1); // January 1, 2020 (month is 0-indexed)
  const today = new Date();
  const years = today.getFullYear() - foundingDate.getFullYear();
  const monthDiff = today.getMonth() - foundingDate.getMonth();
  // If we haven't reached January 1 this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < foundingDate.getDate())) {
    return Math.max(0, years - 1);
  }
  return years;
}

/**
 * Get formatted years of experience string (e.g., "7+")
 */
export function getYearsOfExperienceFormatted(): string {
  return `${getYearsOfExperience()}+`;
}
