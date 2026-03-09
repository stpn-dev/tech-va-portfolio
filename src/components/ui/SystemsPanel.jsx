import AnimatedIcon from '../icons/AnimatedIcon'
import * as Icons from '../icons/icons'
import * as Tools from '../../data/tools'
import * as Data from '../../data/workflows'

function resolveIcon(name) {
  return Icons[name] || Icons.Lightbulb
}

function SystemsPanel() {
  // Resilient access to data (supports named and default exports)
  const tools = Tools.coreTools || (Tools.default ? Tools.default.coreTools : [])
  const patterns = Data.workflowPatterns || (Data.default ? Data.default.workflowPatterns : [])
  const characteristics = Data.systemCharacteristics || (Data.default ? Data.default.systemCharacteristics : [])
  const featuredTools = tools.slice(0, 10)
  const moreToolsCount = Math.max(tools.length - featuredTools.length, 0)
  const featuredPatterns = patterns.slice(0, 4)
  const morePatternsCount = Math.max(patterns.length - featuredPatterns.length, 0)
  const featuredCharacteristics = characteristics.slice(0, 4)
  const moreCharacteristicsCount = Math.max(characteristics.length - featuredCharacteristics.length, 0)

  return (
    <div className="relative p-5 overflow-hidden border group glass-surface rounded-3xl border-white/20 shadow-glass sm:p-6">
      <div className="flex items-center justify-between mb-5 text-sm text-white/90">
        <p className="font-semibold tracking-wide">Systems & Workflows</p>
        <span className="px-3 py-1 text-xs border rounded-full border-white/15 bg-white/10">Capabilities</span>
      </div>

      <div className="grid gap-4 xl:grid-cols-2 xl:gap-5">
        {/* Core Tools */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-navy-100/80">Core Tools In Use</p>
          <div className="grid grid-cols-1 gap-2">
            {featuredTools.map((tool) => {
              const Icon = resolveIcon(tool.icon)
              return (
                <div key={tool.key} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2 transition-colors hover:bg-white/[0.08]">
                  <AnimatedIcon icon={Icon} size={16} color="text-white/90" animationType="hover-scale" ariaLabel={tool.label} />
                  <span className="text-xs font-medium text-white/90">{tool.label}</span>
                </div>
              )
            })}
          </div>
          {moreToolsCount > 0 && (
            <p className="mt-3 text-xs text-white/60">+{moreToolsCount} additional tool(s)</p>
          )}
        </section>

        {/* Right Column: Workflow + Characteristics */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-navy-100/80">Workflow Patterns</p>
          <div className="space-y-2">
            {featuredPatterns.map((item) => {
              const Icon = resolveIcon(item.icon)
              return (
                <div key={item.key} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                  <AnimatedIcon icon={Icon} size={16} color="text-white/85" animationType="none" ariaLabel={item.label} />
                  <span className="text-[13px] leading-snug text-white/85">{item.label}</span>
                </div>
              )
            })}
          </div>
          {morePatternsCount > 0 && (
            <p className="mt-3 text-xs text-white/60">+{morePatternsCount} additional workflow pattern(s)</p>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 xl:col-span-2">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-navy-100/80">System Characteristics</p>
          <div className="flex flex-wrap gap-2">
            {featuredCharacteristics.map((item) => {
              const Icon = resolveIcon(item.icon)
              return (
                <div key={item.key} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                  <AnimatedIcon icon={Icon} size={15} color="text-white/85" animationType="none" ariaLabel={item.label} />
                  <span className="text-xs text-white/85">{item.label}</span>
                </div>
              )
            })}
          </div>
          {moreCharacteristicsCount > 0 && (
            <p className="mt-3 text-xs text-white/60">+{moreCharacteristicsCount} additional characteristic(s)</p>
          )}
        </section>
      </div>

      {/* Soft background accents */}
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-navy-400/20 blur-[70px]" aria-hidden />
      <div className="absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-sky-300/20 blur-[70px]" aria-hidden />
    </div>
  )
}

export default SystemsPanel
