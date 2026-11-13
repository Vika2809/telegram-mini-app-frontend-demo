// Диагностика сетевых проблем для мобильных устройств
export const diagnoseMobileNetworkError = (error: unknown): string => {
    if (error instanceof TypeError) {
        if (error.message.includes('fetch')) {
            return 'Ошибка сети. Проверьте подключение к интернету.';
        }
        if (error.message.includes('NetworkError')) {
            return 'Проблема с сетью. Возможно, сервер недоступен.';
        }
    }

    if (error instanceof Error) {
        if (error.name === 'AbortError') {
            return 'Запрос был прерван. Попробуйте еще раз.';
        }
        if (error.name === 'TimeoutError') {
            return 'Превышено время ожидания. Проверьте скорость интернета.';
        }
        if (error.message.includes('CORS')) {
            return 'Ошибка CORS. Обратитесь к администратору.';
        }
        if (error.message.includes('SSL') || error.message.includes('certificate')) {
            return 'Проблема с SSL сертификатом. Попробуйте позже.';
        }
    }

    return 'Произошла неизвестная ошибка. Попробуйте еще раз.';
};
