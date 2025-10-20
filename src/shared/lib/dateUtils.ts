import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    format,
} from 'date-fns';

export namespace DateUtil {
    const defaultDateFormat = 'yyyy-MM-dd';

    export function convertDateFormat(date: string, formatString: string) {
        const dateTime = new Date(date);
        return format(dateTime, formatString);
    }

    export function timeUntilInfo(date: string): string {
        const now = new Date();
        const future = new Date(date);

        const diffMinutes = differenceInMinutes(future, now);

        if (diffMinutes <= 0) return '종료됨'; // 이미 지남

        // 1시간 미만: 분 단위만 표시
        if (diffMinutes < 60) {
            return `${diffMinutes}분 후`;
        }

        const diffHours = differenceInHours(future, now);
        if (diffHours < 24) {
            const minutes = diffMinutes % 60;
            return minutes > 0 ? `${diffHours}시간 ${minutes}분 후` : `${diffHours}시간 후`;
        }

        const diffDays = differenceInDays(future, now);
        const remainingHours = diffHours % 24;
        return remainingHours > 0 ? `${diffDays}일 ${remainingHours}시간 후` : `${diffDays}일 후`;
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
    export function timeUntil(date: string): string {
        const now = new Date();
        const future = new Date(date);

        const diffMinutes = differenceInMinutes(future, now);

        if (diffMinutes <= 0) return '종료됨'; // 이미 지남

        if (diffMinutes < 60) {
            return `${diffMinutes}분후 마감`;
        }

        const diffHours = differenceInHours(future, now);
        if (diffHours < 24) {
            return `${diffHours}시간후 마감`;
        }

        const diffDays = differenceInDays(future, now);
        return `${diffDays}일후 마감`;
    }
    export function toKSTISOString(date: Date) {
        return new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString();
    }
    export function timeUntilDetail(date: string): string {
        const now = new Date();
        const future = new Date(date);

        const diffSeconds = differenceInSeconds(future, now);
        if (diffSeconds <= 0) return '종료됨'; // 이미 지남

        const days = Math.floor(diffSeconds / (60 * 60 * 24));
        const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((diffSeconds % (60 * 60)) / 60);
        const seconds = diffSeconds % 60;

        // 1일 이상 남음 → "3일 5시간 20분 남음"
        if (days > 0) {
            return `${days}일 ${hours}시간 ${minutes}분 남음`;
        }

        // 1일 이하 → 초까지 표시
        if (hours > 0) {
            return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
        } else if (minutes > 0) {
            return `${minutes}분 ${seconds}초 남음`;
        } else {
            return `${seconds}초 남음`;
        }
    }
}
