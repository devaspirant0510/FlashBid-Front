import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';

export namespace DateUtil {
    const defaultDateFormat = 'yyyy-MM-dd';
    export function convertDateFormat(date: string, formatString: string) {
        const dateTime = new Date(date);
        return format(dateTime, formatString);
    }
    export function timeAgo(date: string): string {
        const now = new Date();
        const past = new Date(date);

        const diffMinutes = differenceInMinutes(now, past);
        if (diffMinutes < 1) return '방금 전'; // 1분 미만이면 방금 전

        if (diffMinutes < 60) {
            return `${diffMinutes}분 전`;
        }

        const diffHours = differenceInHours(now, past);
        if (diffHours < 24) {
            return `${diffHours}시간 전`;
        }

        const diffDays = differenceInDays(now, past);
        return `${diffDays}일 전`;
    }
}
