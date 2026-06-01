export function getTodayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

export function getWeekdayName(dateStr?: string): string {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const d = dateStr ? new Date(dateStr) : new Date();
  return days[d.getDay()];
}

export function formatDateChinese(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${getWeekdayName(dateStr)}`;
}

function formatDateShort(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getWeekDatesCorrect(): string[] {
  const dates: string[] = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(formatDateShort(d));
  }
  return dates;
}
