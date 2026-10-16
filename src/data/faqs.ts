import type { FaqItem } from '@/types';

export const homeFaqs: FaqItem[] = [
  {
    question: 'How accurate are these VRAM estimates?',
    answer:
      'The checker uses a transparent formula: parameter count × bytes-per-weight for the quantization level, plus a 2 GB headroom rule for context and buffers. It is a capacity planner, not a benchmark — real-world usage varies with context length, batch size and inference engine. Treat "Runs well" as a green light to try, not a guarantee.',
  },
  {
    question: 'What is quantization — Q4 vs Q8?',
    answer:
      'Quantization stores each model weight in fewer bits: Q4 uses roughly 0.58 bytes per parameter, Q8 about 1.06. Q4 halves memory versus Q8 with a small quality cost, and it is the standard way to fit larger models on consumer hardware.',
  },
  {
    question: 'Why can’t my 8 GB Mac run an 8B model if the weights are ~5 GB?',
    answer:
      'macOS shares unified memory between CPU and GPU and reserves a significant portion for the system. This checker assumes about 70% of Apple unified memory is realistically available for model weights — the rest is claimed by the OS, apps and display.',
  },
  {
    question: 'Does a mixture-of-experts (MoE) model need less memory?',
    answer:
      'No. MoE models like Mixtral 8x7B activate only a fraction of parameters per token, which makes them fast — but all weights must sit in memory, so capacity requirements follow the total parameter count.',
  },
  {
    question: 'What about context length?',
    answer:
      'Longer contexts consume extra memory on top of the weights — that is exactly what the +2 GB headroom rule in the verdict formula covers. If you regularly run 32k+ token contexts, add more headroom than the tool assumes.',
  },
  {
    question: 'Is CPU-only inference worth it?',
    answer:
      'It works — the checker includes CPU setups with realistic usable-RAM assumptions — but expect single-digit tokens per second on 7–14B models. It is fine for tinkering and batch jobs, painful for chat. A used 12 GB GPU transforms the experience.',
  },
];
