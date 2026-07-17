import { slugify } from '@/lib/utils';

describe('slugify utility function', () => {
  it('should convert mixed-case text to lowercase and replace spaces with dashes', () => {
    expect(slugify('John Doe Resume')).toBe('john-doe-resume');
  });

  it('should trim whitespace from ends', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('should strip out non-word characters like punctuation and collapse multiple dashes', () => {
    expect(slugify("John's Portfolio - Web Developer!")).toBe('johns-portfolio-web-developer');
  });
});
