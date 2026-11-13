import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    afterEach(cleanup);

    test('рендерит кнопку с дочерним текстом', () => {
        render(<Button>Тест</Button>);
        expect(screen.getByText('Тест')).toBeInTheDocument();
    });

    test('применяет дополнительный className', () => {
        render(<Button className="custom-class">Тест</Button>);
        expect(screen.getByText('Тест')).toHaveClass('custom-class');
    });

    test('применяет тему PRIMARY', () => {
        render(<Button theme="primary">Тест</Button>);
        expect(screen.getByRole('button')).toHaveClass('primary');
    });

    test('отключается при disabled=true', () => {
        render(<Button disabled>Тест</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('disabled');
    });
});
