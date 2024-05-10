export const decodeToken = (token: string): { user_id: number, role: string } | null => {
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) return null;

  const payload = Buffer.from(tokenParts[1], 'base64').toString('utf8');
  return JSON.parse(payload);
};