// Функция для получения часового пояса пользователя
const getUserTimeZone = (): string => {
    try {
        // Автоматически определяем часовой пояс браузера пользователя
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        console.warn('Не удалось определить часовой пояс пользователя:', error);
        // Возвращаем дефолтный африканский часовой пояс как запасной вариант
        return 'Africa/Johannesburg';
    }
};
export type TimeType = 'data' | 'time' | 'timeoff';

// Функция для форматирования даты в часовом поясе пользователя
export const formatDate = (date: string, type: TimeType = 'data', customTimeZone?: string) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        return '-/-/-';
    }

    // Используем переданный часовой пояс или определяем автоматически
    const timeZone = customTimeZone || getUserTimeZone();

    if (type === 'data') {
        return dateObj.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            timeZone: timeZone,
        });
    }
    if (type === 'time') {
        return dateObj.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            timeZone: timeZone,
        });
    }
    if (type === 'timeoff') {
        return dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone,
        });
    }
};
