import { BrandMark, Eyebrow } from '../components/ui/brand';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Disclosure, DisclosureList } from '../components/ui/disclosure';
import { Field, TextInput } from '../components/ui/field';
import { Guidelines } from './parts';

const CORE_SWATCHES = [
  { name: 'Primary · Rose', color: '#cf5c78', className: 'bg-primary' },
  { name: 'Secondary · Paper', color: '#ede6d6', className: 'bg-secondary' },
  { name: 'Accent · Champagne', color: '#ead292', className: 'bg-accent' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', color: '#fdfbf7', className: 'border border-border bg-background' },
  { name: 'Foreground', color: '#012c4e', className: 'bg-foreground' },
  { name: 'Muted', color: '#426178', className: 'bg-muted' },
  { name: 'Destructive', color: '#b44664', className: 'bg-destructive' },
  { name: 'Border', color: '#d9cbbd', className: 'bg-border' },
] as const;

const TYPE_SCALE = [
  { label: 'Display', sample: 'CHỈ VỚI 15 PHÚT', className: 'font-serif text-5xl leading-[0.9] tracking-[-0.06em] text-accent' },
  { label: 'Heading', sample: 'LỘ TRÌNH THÀNH CHUYÊN NGHIỆP', className: 'font-serif text-3xl leading-none tracking-[-0.04em]' },
  { label: 'Body', sample: 'Kích hoạt khả năng tự chữa lành tự nhiên.', className: 'font-sans text-base leading-7' },
  { label: 'Label', sample: 'THÔNG TIN KHÓA HỌC', className: 'font-mono text-xs uppercase tracking-[0.16em] text-accent' },
] as const;

function Swatch({
  name,
  color,
  className,
}: {
  name: string;
  color: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-xl ${className}`} />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="font-mono text-[0.68rem] text-muted-foreground">{color}</p>
      </div>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[var(--radius)] border border-border bg-background p-6 text-foreground shadow-[0_18px_38px_rgba(1,44,78,0.08)] sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <Eyebrow>Khóa học Diện Chẩn Online</Eyebrow>
          <h2 className="mt-4 font-serif text-5xl leading-[0.9] tracking-[-0.06em] text-accent sm:text-7xl">
            Chăm sóc sức khỏe <span className="text-foreground">từ gốc.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            Editorial wellness language with a grounded navy base, paper surfaces,
            champagne highlights, and rose conversion moments.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Đăng ký học ngay</Button>
            <Button variant="outline">Xem lộ trình</Button>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-8 opacity-90">
          <BrandMark size="lg" alt="Diện Chẩn Boutique" />
        </div>
      </section>

      <section className="rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground sm:p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Core palette</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {CORE_SWATCHES.map((swatch) => <Swatch key={swatch.name} {...swatch} />)}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground sm:p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Typography</h2>
          <div className="mt-5 space-y-5">
            {TYPE_SCALE.map((entry) => (
              <div key={entry.label} className="grid gap-2 sm:grid-cols-[84px_1fr]">
                <span className="pt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{entry.label}</span>
                <p className={entry.className}>{entry.sample}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground sm:p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Composition</h2>
          <Card className="mt-5" variant="tint">
            <CardHeader>
              <CardTitle>Đăng ký học ngay</CardTitle>
              <CardDescription>Product copy stays warm, direct, and action-oriented.</CardDescription>
            </CardHeader>
            <CardContent>
              <Field label="Họ và tên">
                <TextInput placeholder="Nhập họ và tên..." aria-label="Họ và tên" />
              </Field>
            </CardContent>
            <CardFooter>
              <Button size="sm">Tiếp tục</Button>
              <Button size="sm" variant="ghost">Để sau</Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      <section className="rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground sm:p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">System principles</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Card variant="dark"><CardTitle className="text-xl">Editorial</CardTitle><CardDescription className="mt-2">Fraunces headlines give the course a confident, human voice.</CardDescription></Card>
          <Card variant="tint"><CardTitle className="text-xl">Grounded</CardTitle><CardDescription className="mt-2">Navy, paper, and generous whitespace keep wellness content calm.</CardDescription></Card>
          <Card><CardTitle className="text-xl">Focused</CardTitle><CardDescription className="mt-2">Rose CTAs and champagne labels make the next action clear.</CardDescription></Card>
        </div>
        <div className="mt-6">
          <Guidelines items={[
            { kind: 'do', text: 'Use one expressive serif headline with a clear sans-serif reading layer.' },
            { kind: 'do', text: 'Keep the primary action rose and the secondary action outlined in champagne.' },
            { kind: 'dont', text: 'Do not introduce unrelated neon colors, hard square corners, or dense dashboard styling.' },
          ]} />
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-3xl">Brand colors</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The palette is mapped from the course landing page and keeps the dark and light surfaces in the same family.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{CORE_SWATCHES.map((swatch) => <Swatch key={swatch.name} {...swatch} />)}</div>
      </section>
      <section className="space-y-4 border-t border-border pt-6">
        <div>
          <h2 className="font-serif text-2xl">Supporting roles</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Neutral, semantic, text, background, and border roles for readable composition.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">{SUPPORTING_SWATCHES.map((swatch) => <Swatch key={swatch.name} {...swatch} />)}</div>
      </section>
      <Guidelines items={[
        { kind: 'do', text: 'Use navy as the anchor, paper and cream for breathing room, and rose only for intentional emphasis.' },
        { kind: 'do', text: 'Pair light surfaces with navy text and dark surfaces with paper text for contrast.' },
        { kind: 'dont', text: 'Do not use the champagne accent as a long paragraph color.' },
      ]} />
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground">
      <section>
        <Eyebrow>Font families</Eyebrow>
        <h2 className="mt-4 font-serif text-5xl tracking-[-0.05em]">Fraunces meets DM Sans.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Fraunces supplies the editorial display voice, DM Sans handles clarity and warmth, and Space Mono adds precise metadata cues.</p>
      </section>
      <section className="space-y-5 border-t border-border pt-6">
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-2 sm:grid-cols-[84px_1fr]">
            <span className="pt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{entry.label}</span>
            <p className={entry.className}>{entry.sample}</p>
          </div>
        ))}
      </section>
      <Guidelines items={[
        { kind: 'do', text: 'Reserve Fraunces for display headlines and key editorial moments.' },
        { kind: 'do', text: 'Use DM Sans for body copy and interface labels; use Space Mono sparingly for eyebrows and metadata.' },
        { kind: 'dont', text: 'Do not set long reading passages in the display serif or all-caps mono.' },
      ]} />
    </div>
  );
}

export function LayoutPage() {
  const spacing = [
    { label: '1× · 4px', className: 'w-4' },
    { label: '2× · 8px', className: 'w-8' },
    { label: '4× · 16px', className: 'w-16' },
    { label: '6× · 24px', className: 'w-24' },
    { label: '12× · 48px', className: 'w-48' },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground">
        <h2 className="font-serif text-3xl">Spacing rhythm</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">A 4px base step scales from compact controls to generous section spacing.</p>
        <div className="mt-7 space-y-4">{spacing.map((item) => <div key={item.label} className="flex items-center gap-4"><span className="w-20 font-mono text-[0.68rem] text-muted-foreground">{item.label}</span><div className={`h-3 rounded-full bg-primary ${item.className}`} /></div>)}</div>
      </section>
      <section className="rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground">
        <h2 className="font-serif text-3xl">Radius and surfaces</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Soft 1rem cards and full-pill actions keep the experience approachable and tactile.</p>
        <div className="mt-7 grid grid-cols-2 gap-4">
          <div className="flex h-24 items-end rounded-lg border border-border bg-secondary p-3 text-xs font-medium">Card · 1rem</div>
          <div className="flex h-24 items-end rounded-2xl border border-border bg-muted p-3 text-xs font-medium">Featured · 1.5rem</div>
          <div className="flex h-24 items-end rounded-full border border-accent bg-accent/20 p-3 text-xs font-medium">Pill · full</div>
          <div className="flex h-24 items-end border-b border-border p-3 text-xs font-medium">Rule · 1px</div>
        </div>
      </section>
      <div className="lg:col-span-2">
        <Guidelines items={[
          { kind: 'do', text: 'Preserve wide section breathing room while tightening the layout into an in-flow mobile stack.' },
          { kind: 'do', text: 'Use rounded cards for grouped content and borders for quiet separation.' },
          { kind: 'dont', text: 'Do not let fixed controls obscure content on short screens.' },
        ]} />
      </div>
    </div>
  );
}