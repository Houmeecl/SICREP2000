import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-4 flex items-center gap-4">
      <ThemeToggle />
      <span className="text-sm text-muted-foreground">Click para cambiar tema</span>
    </div>
  );
}
