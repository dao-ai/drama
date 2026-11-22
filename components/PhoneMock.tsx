export default function PhoneMock() {
  return (
    <div className="relative mx-auto aspect-[9/16] w-[min(300px,80%)] rounded-[34px] bg-gradient-to-b from-[#2a2a33] to-[#0d0d12] p-[9px] shadow-[0_40px_90px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] max-[980px]:w-[230px]">
      <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[27px] bg-[radial-gradient(120px_200px_at_20%_15%,rgba(217,164,65,0.5),transparent_70%),radial-gradient(220px_260px_at_85%_30%,rgba(224,67,63,0.45),transparent_70%),linear-gradient(175deg,#231a26_0%,#14121c_45%,#0c0c12_100%)] p-[18px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_3px] opacity-50" />
        <span className="absolute left-4 top-4 rounded-[5px] bg-flame/90 px-2 py-[3px] text-[10px] font-bold tracking-[0.16em]">
          EP 01
        </span>
        <span className="absolute right-4 top-4 text-[10px] tracking-[0.1em] text-white/50">
          9:16 · 00:04
        </span>
        <div className="mb-2 text-xs tracking-[0.14em] text-white/55">苏念 · 近景</div>
        <div className="text-[23px] font-extrabold leading-[1.3] [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">
          「愿意。
          <br />
          愿意请大家看个东西。」
        </div>
        <div className="mt-2.5 text-[11px] tracking-[0.08em] text-white/55">
          婚礼现场 · 第 8 镜 · 4s
        </div>
        <div className="mt-4 h-[3px] overflow-hidden rounded-sm bg-white/[0.16]">
          <i className="block h-full w-[62%] bg-gradient-to-r from-flame to-gold" />
        </div>
      </div>
    </div>
  );
}
