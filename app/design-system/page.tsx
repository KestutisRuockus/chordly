export const metadata = {
  title: "Design System | MusicLessons",
  description: "Color palette and design tokens",
};

const DesignSystemPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Design System
          </h1>
          <p className="text-muted-foreground mb-4">
            Emerald Green Color Palette & Components
          </p>
          <div className="inline-block bg-secondary/20 border border-secondary/40 rounded-lg px-4 py-2 text-sm text-secondary-foreground">
            💡 Internal reference page for development
          </div>
        </div>

        <div className="min-h-screen bg-background p-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Color Palette
              </h1>
              <p className="text-muted-foreground">
                Emerald Green Design System
              </p>
            </div>

            {/* === BACKGROUNDS === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Backgrounds
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                  <div className="mb-2">
                    <div className="w-full h-20 bg-background rounded border-2 border-dashed border-border mb-3" />
                    <p className="font-semibold text-foreground">background</p>
                    <p className="text-sm text-muted-foreground">
                      Main page bg
                    </p>
                    <code className="text-xs bg-card px-2 py-1 rounded mt-2 inline-block">
                      142 40% 96%
                    </code>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <div className="mb-2">
                    <div className="w-full h-20 bg-card rounded border-2 border-dashed border-border mb-3" />
                    <p className="font-semibold text-foreground">card</p>
                    <p className="text-sm text-muted-foreground">
                      Elevated surfaces
                    </p>
                    <code className="text-xs bg-background px-2 py-1 rounded mt-2 inline-block">
                      142 40% 90%
                    </code>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                  <div className="mb-2">
                    <div className="w-full h-20 bg-border rounded mb-3" />
                    <p className="font-semibold text-foreground">border</p>
                    <p className="text-sm text-muted-foreground">
                      Borders & dividers
                    </p>
                    <code className="text-xs bg-card px-2 py-1 rounded mt-2 inline-block">
                      142 15% 88%
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* === TEXT === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Text Colors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <p className="text-3xl font-bold text-foreground mb-2">
                    Foreground
                  </p>
                  <p className="text-muted-foreground">Primary text color</p>
                  <code className="text-xs bg-background px-2 py-1 rounded mt-2 inline-block">
                    142 20% 18%
                  </code>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <p className="text-3xl font-bold text-muted-foreground mb-2">
                    Muted Foreground
                  </p>
                  <p className="text-muted-foreground">Secondary text</p>
                  <code className="text-xs bg-background px-2 py-1 rounded mt-2 inline-block">
                    142 10% 60%
                  </code>
                </div>
              </div>
            </section>

            {/* === BRAND COLORS === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Brand Colors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-primary text-primary-foreground p-6">
                    <div className="w-full h-24 bg-primary-foreground/20 rounded mb-3" />
                    <p className="text-2xl font-bold mb-1">Primary</p>
                    <p className="text-sm opacity-90">
                      Main CTA • Emerald Green
                    </p>
                  </div>
                  <div className="p-4 bg-card">
                    <div className="flex gap-2 mb-2">
                      <code className="text-xs bg-background px-2 py-1 rounded">
                        160 55% 55%
                      </code>
                      <code className="text-xs bg-background px-2 py-1 rounded">
                        #51B78A
                      </code>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors">
                      Button Example
                    </button>
                  </div>
                </div>

                {/* Secondary */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-secondary text-secondary-foreground p-6">
                    <div className="w-full h-24 bg-foreground/10 rounded mb-3" />
                    <p className="text-2xl font-bold mb-1">Secondary</p>
                    <p className="text-sm opacity-75">
                      Alternative • Light Sage
                    </p>
                  </div>
                  <div className="p-4 bg-card">
                    <div className="flex gap-2 mb-2">
                      <code className="text-xs bg-background px-2 py-1 rounded">
                        150 60% 78%
                      </code>
                      <code className="text-xs bg-background px-2 py-1 rounded">
                        #A8DFC4
                      </code>
                    </div>
                    <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-lg transition-colors">
                      Button Example
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* === STATE COLORS === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                State Colors
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Success */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-success text-success-foreground p-4">
                    <p className="font-bold mb-1">Success</p>
                    <div className="w-full h-12 bg-success-foreground/20 rounded" />
                  </div>
                  <div className="p-3 bg-card">
                    <code className="text-xs bg-background px-2 py-1 rounded block mb-2">
                      145 50% 55%
                    </code>
                    <span className="inline-block bg-success text-success-foreground px-3 py-1 rounded text-sm">
                      Badge
                    </span>
                  </div>
                </div>

                {/* Destructive */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-destructive text-destructive-foreground p-4">
                    <p className="font-bold mb-1">Destructive</p>
                    <div className="w-full h-12 bg-destructive-foreground/20 rounded" />
                  </div>
                  <div className="p-3 bg-card">
                    <code className="text-xs bg-background px-2 py-1 rounded block mb-2">
                      0 68% 58%
                    </code>
                    <span className="inline-block bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm">
                      Badge
                    </span>
                  </div>
                </div>

                {/* Scheduled */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-scheduled text-scheduled-foreground p-4">
                    <p className="font-bold mb-1">Scheduled</p>
                    <div className="w-full h-12 bg-scheduled-foreground/20 rounded" />
                  </div>
                  <div className="p-3 bg-card">
                    <code className="text-xs bg-background px-2 py-1 rounded block mb-2">
                      142 60% 25%
                    </code>
                    <span className="inline-block bg-scheduled text-scheduled-foreground px-3 py-1 rounded text-sm">
                      Badge
                    </span>
                  </div>
                </div>

                {/* Rescheduled */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-rescheduled text-rescheduled-foreground p-4">
                    <p className="font-bold mb-1">Rescheduled</p>
                    <div className="w-full h-12 bg-foreground/10 rounded" />
                  </div>
                  <div className="p-3 bg-card">
                    <code className="text-xs bg-background px-2 py-1 rounded block mb-2">
                      240 5% 70%
                    </code>
                    <span className="inline-block bg-rescheduled text-rescheduled-foreground px-3 py-1 rounded text-sm">
                      Badge
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* === PLAN COLORS === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Plan / Subscription Tiers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-plan-none border border-border rounded-lg p-6 shadow-sm">
                  <div className="w-full h-16 bg-plan-none rounded border-2 border-dashed border-border mb-3" />
                  <p className="font-semibold text-foreground">None</p>
                  <p className="text-xs text-muted-foreground mb-2">No plan</p>
                  <code className="text-xs bg-card px-2 py-1 rounded">
                    240 5% 92%
                  </code>
                </div>

                <div className="bg-plan-basic border border-border rounded-lg p-6 shadow-sm">
                  <div className="w-full h-16 bg-plan-basic rounded border-2 border-dashed border-border mb-3" />
                  <p className="font-semibold text-foreground">Basic</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Entry tier
                  </p>
                  <code className="text-xs bg-card px-2 py-1 rounded">
                    45 60% 88%
                  </code>
                </div>

                <div className="bg-plan-medium border border-border rounded-lg p-6 shadow-sm">
                  <div className="w-full h-16 bg-plan-medium rounded border-2 border-dashed border-border mb-3" />
                  <p className="font-semibold text-foreground">Medium</p>
                  <p className="text-xs text-muted-foreground mb-2">Mid tier</p>
                  <code className="text-xs bg-card px-2 py-1 rounded">
                    142 40% 88%
                  </code>
                </div>

                <div className="bg-plan-pro border border-border rounded-lg p-6 shadow-sm">
                  <div className="w-full h-16 bg-plan-pro rounded border-2 border-dashed border-border mb-3" />
                  <p className="font-semibold text-foreground">Pro</p>
                  <p className="text-xs text-muted-foreground mb-2">Top tier</p>
                  <code className="text-xs bg-card px-2 py-1 rounded">
                    200 70% 85%
                  </code>
                </div>
              </div>
            </section>

            {/* === SHADOWS === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Shadows & Elevation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
                  <p className="font-semibold text-foreground mb-2">
                    shadow-sm
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cards at rest
                  </p>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    0 1px 3px rgba(46, 93, 71, 0.08)
                  </code>
                </div>

                <div className="bg-card rounded-lg p-8 shadow-md border border-border">
                  <p className="font-semibold text-foreground mb-2">
                    shadow-md
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Hover, interactive
                  </p>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    0 4px 6px rgba(46, 93, 71, 0.1)
                  </code>
                </div>

                <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                  <p className="font-semibold text-foreground mb-2">
                    shadow-lg
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Modals, popovers
                  </p>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    0 10px 15px rgba(46, 93, 71, 0.12)
                  </code>
                </div>
              </div>
            </section>

            {/* === INTERACTIVE EXAMPLES === */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Interactive Components
              </h2>

              {/* Buttons */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm mb-6">
                <h3 className="font-semibold text-foreground mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-primary text-primary-foreground hover:bg-primary/70 px-6 py-2.5 rounded-lg transition-colors font-medium">
                    Primary
                  </button>
                  <button className="bg-secondary text-secondary-foreground hover:bg-secondary/70 px-6 py-2.5 rounded-lg transition-colors font-medium">
                    Secondary
                  </button>
                  <button className="border border-primary hover:bg-primary/20 px-6 py-2.5 rounded-lg transition-colors font-medium">
                    Outline
                  </button>
                  <button className="bg-destructive text-destructive-foreground hover:bg-destructive/70 px-6 py-2.5 rounded-lg transition-colors font-medium">
                    Destructive
                  </button>
                  <button className="bg-success text-success-foreground hover:bg-success/70 px-6 py-2.5 rounded-lg transition-colors font-medium">
                    Success
                  </button>
                </div>
              </div>

              {/* Card Example */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Piano Lesson
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      with John Doe
                    </p>
                  </div>
                  <span className="bg-scheduled text-scheduled-foreground px-3 py-1 rounded-lg text-sm font-medium">
                    Scheduled
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Monday, Feb 17 • 3:00 PM
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/70 px-4 py-2 rounded-lg transition-colors">
                    Reschedule
                  </button>
                  <button className="flex-1 border border-destructive hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive px-4 py-2 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-center pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground">
            This page is for design reference and development purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPage;
