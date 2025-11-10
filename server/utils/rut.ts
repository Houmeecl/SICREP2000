export function validateChileanRUT(rut: string): boolean {
  // Remove dots and hyphens
  const clean = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  
  if (clean.length < 2) return false;
  
  const body = clean.slice(0, -1);
  const digit = clean.slice(-1);
  
  // Validate body is numeric
  if (!/^\d+$/.test(body)) return false;
  
  // Calculate verification digit
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const expectedDigit = remainder === 0 ? '0' : remainder === 1 ? 'K' : String(11 - remainder);
  
  return digit === expectedDigit;
}

export function formatChileanRUT(rut: string): string {
  const clean = rut.replace(/\./g, '').replace(/-/g, '');
  const body = clean.slice(0, -1);
  const digit = clean.slice(-1);
  
  // Add dots to body
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formatted}-${digit}`;
}

export function generateUsername(rut: string, email: string): string {
  // Try to use RUT first (remove dots and hyphens)
  const clean = rut.replace(/\./g, '').replace(/-/g, '').toLowerCase();
  
  if (clean) {
    return clean;
  }
  
  // Fallback to email local part
  const emailLocal = email.split('@')[0];
  return emailLocal.replace(/[^a-z0-9]/g, '');
}
