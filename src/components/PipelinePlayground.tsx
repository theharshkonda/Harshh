import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stages = ["Extract", "Transform", "Validate", "Load"];

export function PipelinePlayground() {
  const [activeStage, setActiveStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const packetRef = useRef<HTMLDivElement>(null);

  const logs = useMemo(() => {
    if (activeStage < 0) {
      return ["System ready. Waiting for ETL trigger."];
    }

    return [
      `[${stages[activeStage]}] Initializing worker pods`,
      `[${stages[activeStage]}] Streaming records through validation mesh`,
      `[${stages[activeStage]}] Updated SLA dashboard and lineage graph`,
    ];
  }, [activeStage]);

  useEffect(() => {
    if (!packetRef.current) {
      return;
    }

    gsap.to(packetRef.current, {
      xPercent: activeStage < 0 ? 0 : activeStage * 96,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [activeStage]);

  const handleRun = () => {
    if (running) {
      return;
    }

    setRunning(true);
    setActiveStage(0);

    stages.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveStage(index);
      }, index * 950);
    });

    window.setTimeout(() => {
      setRunning(false);
      setActiveStage(-1);
    }, stages.length * 950 + 850);
  };

  return (
    <Card className="grid gap-8 overflow-hidden border-neon/15 bg-[linear-gradient(135deg,rgba(11,17,33,0.88),rgba(16,23,45,0.72))] p-6 md:grid-cols-[1.3fr_0.9fr] md:p-8">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-neon/70">
              Interactive Playground
            </p>
            <h3 className="mt-3 font-display text-2xl text-white">
              Click once. Watch the pipeline move.
            </h3>
          </div>
          <Button onClick={handleRun} variant="default">
            {running ? "Running..." : "Run ETL"}
          </Button>
        </div>

        <div className="relative mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
          <div className="grid gap-4 md:grid-cols-4">
            {stages.map((stage, index) => (
              <div
                key={stage}
                className={`rounded-3xl border px-4 py-6 text-center transition-all duration-300 ${
                  activeStage === index
                    ? "border-neon/50 bg-neon/12 text-white"
                    : "border-white/8 bg-white/[0.02] text-mist/70"
                }`}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lg font-bold">
                  {index + 1}
                </div>
                <p className="font-semibold">{stage}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-6 h-2 rounded-full bg-white/10">
            <div ref={packetRef} className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_24px_rgba(110,231,249,0.85)]" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="border-white/8 bg-black/20 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-mist/55">Runtime logs</p>
          <div className="mt-4 space-y-3 font-mono text-sm text-lime/90">
            {logs.map((log) => (
              <p key={log}>{log}</p>
            ))}
          </div>
        </Card>
        <Card className="border-white/8 bg-black/20 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-mist/55">Pipeline metrics</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-white">
            {[
              ["Rows/sec", "24.8K"],
              ["Latency", "1.2s"],
              ["Quality", "99.2%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-mist/55">{label}</p>
                <p className="mt-2 text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
}
