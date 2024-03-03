import { absoluteUrl, cn } from '@/lib/utils';

describe('cn function', () => {
  test('should merge class names correctly', () => {
    const result = cn('class1', 'class2', { class3: true, class4: false });
    expect(result).toBe('class1 class2 class3');
  });
});

describe('absoluteUrl function', () => {
  test('should generate absolute URL correctly', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
    const result = absoluteUrl('/path/to/resource');
    expect(result).toBe('https://example.com/path/to/resource');
  });
});
