export type ArithmeticError = 'div_zero' | 'invalid';

export type ArithmeticResult =
  | { ok: true; value: number }
  | { ok: false; error: ArithmeticError };

const DIV_ZERO = 'DIV_ZERO';

type TokenType = 'number' | 'op' | 'paren';

type Token = {
  type: TokenType;
  value: string;
};

function tokenize(input: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;
  const source = input.trim();
  if (!source) return null;

  while (i < source.length) {
    const char = source[i];
    if (char === ' ' || char === '\t' || char === '\n') {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(char)) {
      let raw = char;
      i += 1;
      let dots = char === '.' ? 1 : 0;
      while (i < source.length && /[0-9.]/.test(source[i])) {
        if (source[i] === '.') dots += 1;
        raw += source[i];
        i += 1;
      }
      if (dots > 1 || raw === '.') return null;
      tokens.push({ type: 'number', value: raw });
      continue;
    }
    if ('+-*/%'.includes(char)) {
      tokens.push({ type: 'op', value: char });
      i += 1;
      continue;
    }
    if (char === '(' || char === ')') {
      tokens.push({ type: 'paren', value: char });
      i += 1;
      continue;
    }
    return null;
  }

  return tokens;
}

class Parser {
  private index = 0;

  constructor(private readonly tokens: Token[]) {}

  parse(): number {
    const value = this.expression();
    if (this.index !== this.tokens.length) {
      throw new Error('invalid');
    }
    return value;
  }

  private peek(): Token | undefined {
    return this.tokens[this.index];
  }

  private take(): Token {
    const token = this.tokens[this.index];
    if (!token) throw new Error('invalid');
    this.index += 1;
    return token;
  }

  private expression(): number {
    let left = this.term();
    while (this.peek()?.type === 'op' && (this.peek()?.value === '+' || this.peek()?.value === '-')) {
      const op = this.take().value;
      const right = this.unary();
      left = applyAddSub(left, right.value, right.isPercent, op === '+' ? 1 : -1);
    }
    return left;
  }

  private term(): number {
    const first = this.unary();
    let left = first.isPercent ? first.value / 100 : first.value;
    while (this.peek()?.type === 'op' && (this.peek()?.value === '*' || this.peek()?.value === '/')) {
      const op = this.take().value;
      const right = this.unary();
      left = applyMulDiv(left, right.value, right.isPercent, op);
    }
    return left;
  }

  private unary(): { value: number; isPercent: boolean } {
    if (this.peek()?.type === 'op' && this.peek()?.value === '+') {
      this.take();
      return this.unary();
    }
    if (this.peek()?.type === 'op' && this.peek()?.value === '-') {
      this.take();
      const inner = this.unary();
      return { value: -inner.value, isPercent: inner.isPercent };
    }
    return this.postfix();
  }

  private postfix(): { value: number; isPercent: boolean } {
    const primary = this.primary();
    if (this.peek()?.type === 'op' && this.peek()?.value === '%') {
      this.take();
      return { value: primary, isPercent: true };
    }
    return { value: primary, isPercent: false };
  }

  private primary(): number {
    const token = this.peek();
    if (!token) throw new Error('invalid');
    if (token.type === 'number') {
      this.take();
      const value = Number(token.value);
      if (!Number.isFinite(value)) throw new Error('invalid');
      return value;
    }
    if (token.type === 'paren' && token.value === '(') {
      this.take();
      const value = this.expression();
      const close = this.take();
      if (close.type !== 'paren' || close.value !== ')') throw new Error('invalid');
      return value;
    }
    throw new Error('invalid');
  }
}

function applyAddSub(left: number, right: number, isPercent: boolean, sign: 1 | -1): number {
  if (isPercent) return left + sign * left * (right / 100);
  return left + sign * right;
}

function applyMulDiv(left: number, right: number, isPercent: boolean, op: string): number {
  const value = isPercent ? right / 100 : right;
  if (op === '*') return left * value;
  if (value === 0) throw new Error(DIV_ZERO);
  return left / value;
}

export function evaluateArithmetic(input: string): ArithmeticResult {
  try {
    const tokens = tokenize(input);
    if (!tokens) return { ok: false, error: 'invalid' };
    const value = new Parser(tokens).parse();
    if (!Number.isFinite(value)) return { ok: false, error: 'invalid' };
    return { ok: true, value };
  } catch (error) {
    if (error instanceof Error && error.message === DIV_ZERO) {
      return { ok: false, error: 'div_zero' };
    }
    return { ok: false, error: 'invalid' };
  }
}

export function formatArithmeticValue(value: number): string {
  if (!Number.isFinite(value)) return '0';
  if (Object.is(value, -0)) return '0';
  if (Number.isInteger(value) && Math.abs(value) < 1e12) return String(value);
  const asFixed = value.toPrecision(12).replace(/\.?0+$/, '');
  return asFixed;
}
