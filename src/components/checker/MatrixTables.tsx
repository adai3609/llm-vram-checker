import { quantVramGb, usableMemoryGb, verdictFor, verdictMeta } from '@/lib/verdict';
import { QUANTS } from '@/lib/verdict';
import type { GpuDevice, LlmModel } from '@/types';

interface MatrixTableProps {
  model: LlmModel;
  devices: GpuDevice[];
}

/** Model detail page: one row per device, verdict per quantization. */
export function ModelMatrixTable({ model, devices }: MatrixTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-raised text-white">
            <th scope="col" className="px-5 py-3 font-semibold">Hardware</th>
            <th scope="col" className="px-5 py-3 font-semibold">Usable</th>
            {QUANTS.map((q) => (
              <th key={q.id} scope="col" className="px-5 py-3 font-semibold">
                {q.shortLabel} <span className="font-normal text-mist">({quantVramGb(model.paramsB, q.bytesPerParam)} GB)</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.slug} className="border-b border-line/60 last:border-b-0">
              <th scope="row" className="px-5 py-3 font-semibold text-white">
                <a href={`/hardware/${device.slug}`} className="hover:text-neon-emerald">
                  {device.name}
                </a>
              </th>
              <td className="px-5 py-3 tabular-nums text-mist">
                {usableMemoryGb(device)} GB
              </td>
              {QUANTS.map((q) => {
                const verdict = verdictFor(model, device, q);
                return (
                  <td key={q.id} className="px-5 py-3">
                    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${verdictMeta[verdict].className}`}>
                      {verdictMeta[verdict].label}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface DeviceMatrixTableProps {
  device: GpuDevice;
  models: LlmModel[];
}

/** Hardware detail page: one row per model, verdict per quantization. */
export function DeviceMatrixTable({ device, models }: DeviceMatrixTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-raised text-white">
            <th scope="col" className="px-5 py-3 font-semibold">Model</th>
            {QUANTS.map((q) => (
              <th key={q.id} scope="col" className="px-5 py-3 font-semibold">
                {q.shortLabel} weights
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.slug} className="border-b border-line/60 last:border-b-0">
              <th scope="row" className="px-5 py-3 font-semibold text-white">
                <a href={`/models/${model.slug}`} className="hover:text-neon-emerald">
                  {model.name}
                </a>
                <span className="ml-2 text-xs font-normal text-mist">{model.paramsB}B</span>
              </th>
              {QUANTS.map((q) => {
                const verdict = verdictFor(model, device, q);
                return (
                  <td key={q.id} className="px-5 py-3">
                    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${verdictMeta[verdict].className}`}>
                      {verdictMeta[verdict].label}
                      <span className="ml-1 font-normal opacity-70">
                        {quantVramGb(model.paramsB, q.bytesPerParam)} GB
                      </span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
