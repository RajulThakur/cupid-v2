export default function FormattedLastSeen(lastSeen: Date): string {
  const date: Date = new Date(lastSeen);
  const now: Date = new Date();
  const diffTime: number = Math.abs(now.getTime() - date.getTime()); // Difference in milliseconds

  const diffDays: number = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours: number = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes: number = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}min ago`;
  }
  return "Just now";
}