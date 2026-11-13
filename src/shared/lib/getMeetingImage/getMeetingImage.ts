import meeting1 from '@/shared/assets/images/meeting_image_1.png';
import meeting2 from '@/shared/assets/images/meeting_image_2.png';
import meeting3 from '@/shared/assets/images/meeting_image_3.png';

const images = [meeting1, meeting2, meeting3];

/**
 * Возвращает изображение для митинга на основе uniqueId
 * Использует простой алгоритм хеширования для детерминированного выбора
 * @param uniqueId - уникальный идентификатор митинга
 * @returns путь к изображению
 */
export const getMeetingImage = (uniqueId: string): string => {
    // Простой алгоритм хеширования строки
    let hash = 0;
    for (let i = 0; i < uniqueId.length; i++) {
        const char = uniqueId.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Преобразование в 32-битное целое число
    }

    // Получаем положительный индекс для массива изображений
    const imageIndex = Math.abs(hash) % images.length;

    return images[imageIndex];
};
