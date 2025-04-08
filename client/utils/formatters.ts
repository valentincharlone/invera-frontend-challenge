export const formattedTotal = (totalUsers: number) => {
  return totalUsers >= 1000 ? `${(totalUsers / 1000).toFixed(0)}k` : totalUsers;
};
