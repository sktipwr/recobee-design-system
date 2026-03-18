"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ComponentShowcase from "@/components/ComponentShowcase";
import EmptyState from "@/components/ui/EmptyState";
import ScoreRing from "@/components/ui/ScoreRing";
import ScoreBar from "@/components/ui/ScoreBar";
import StatCard from "@/components/ui/StatCard";
import ServiceCard from "@/components/ui/ServiceCard";
import StatusBadge from "@/components/ui/StatusBadge";
import FunnelBar from "@/components/ui/FunnelBar";
import { ChartContainer, RBBarChart, RBLineChart, RBDoughnutChart, RBRadarChart, seriesPalette, seriesPaletteDim } from "@/components/ui/ChartWrapper";

export default function ComponentsPage() {
  const [tab, setTab] = useState(0);
  const [switchOn, setSwitchOn] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  return (
    <main className="px-8 py-10 max-w-5xl space-y-10">
      <div>
        <h1 className="text-[24px] font-bold text-white">Components</h1>
        <p className="text-[13px] text-zinc-400 mt-1">
          MUI components themed with RecoBee design tokens. Every component inherits the dark theme, amber accent, and glass morphism.
        </p>
      </div>

      {/* ─── Button ─── */}
      <ComponentShowcase name="Button" description="4 variants × 3 sizes. Primary uses amber gradient with glow on hover.">
        <div className="space-y-5 w-full">
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="contained" size="small">Small</Button>
              <Button variant="contained" size="medium">Medium</Button>
              <Button variant="contained" size="large">Large</Button>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">With Icons</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="contained" startIcon={<AddIcon />}>Add Project</Button>
              <Button variant="contained" color="secondary" startIcon={<FileUploadIcon />}>Export</Button>
              <IconButton color="primary" size="small"><AddIcon /></IconButton>
              <IconButton color="default" size="small"><MoreVertIcon /></IconButton>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">States</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="contained">Enabled</Button>
              <Button variant="contained" disabled>Disabled</Button>
              <Button variant="outlined" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Chip / Badge ─── */}
      <ComponentShowcase name="Chip" description="Used as badges, filter chips, and tags. Supports filled, outlined, clickable, and deletable.">
        <div className="space-y-5 w-full">
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Genre Badges</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="Drama" size="small" sx={{ bgcolor: "rgba(99,102,241,0.2)", color: "#a5b4fc" }} />
              <Chip label="Comedy" size="small" color="primary" />
              <Chip label="Mystery" size="small" sx={{ bgcolor: "rgba(139,92,246,0.2)", color: "#c4b5fd" }} />
              <Chip label="Adventure" size="small" sx={{ bgcolor: "rgba(16,185,129,0.2)", color: "#6ee7b7" }} />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Type Badges</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="Feature Film" size="small" sx={{ bgcolor: "rgba(14,165,233,0.2)", color: "#7dd3fc" }} />
              <Chip label="Web Series" size="small" sx={{ bgcolor: "rgba(244,63,94,0.2)", color: "#fda4af" }} />
              <Chip label="Short Film" size="small" sx={{ bgcolor: "rgba(20,184,166,0.2)", color: "#5eead4" }} />
              <Chip label="Documentary" size="small" sx={{ bgcolor: "rgba(249,115,22,0.2)", color: "#fdba74" }} />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Functional</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="Hindi" variant="outlined" size="small" />
              <Chip label="120 min" size="small" />
              <Chip label="Clickable" onClick={() => {}} size="small" />
              <Chip label="Deletable" onDelete={() => {}} size="small" />
              <Chip label="Active Filter" color="primary" size="small" />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              <Chip label="Small" size="small" color="primary" />
              <Chip label="Medium" size="medium" color="primary" />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── TextField ─── */}
      <ComponentShowcase name="TextField" description="Search and form inputs with rounded pill shape and amber focus ring.">
        <div className="space-y-4 w-full max-w-md">
          <TextField
            fullWidth
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch("")}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          <TextField fullWidth placeholder="Default input" />
          <TextField fullWidth placeholder="Disabled" disabled />
        </div>
      </ComponentShowcase>

      {/* ─── Card ─── */}
      <ComponentShowcase name="Card" description="Glass morphism card with hover elevation. Use for project cards, stat cards, and containers.">
        <div className="grid grid-cols-3 gap-4 w-full">
          <Card>
            <CardContent>
              <p className="text-[20px] font-bold text-white">42</p>
              <p className="text-[12px] text-zinc-500 mt-0.5">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-[20px] font-bold text-white">128</p>
              <p className="text-[12px] text-zinc-500 mt-0.5">Scripts Analyzed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-[20px] font-bold text-white">7</p>
              <p className="text-[12px] text-zinc-500 mt-0.5">In Production</p>
            </CardContent>
          </Card>
        </div>
      </ComponentShowcase>

      {/* ─── Avatar ─── */}
      <ComponentShowcase name="Avatar" description="User avatars with RecoBee amber gradient. Supports initials, images, and grouping.">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex items-center gap-3">
              <Avatar sx={{ width: 24, height: 24, fontSize: 10 }}>R</Avatar>
              <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>R</Avatar>
              <Avatar sx={{ width: 40, height: 40, fontSize: 15 }}>R</Avatar>
              <Avatar sx={{ width: 48, height: 48, fontSize: 18 }}>R</Avatar>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">Group</p>
            <AvatarGroup max={4}>
              <Avatar>A</Avatar>
              <Avatar>B</Avatar>
              <Avatar>C</Avatar>
              <Avatar>D</Avatar>
              <Avatar>E</Avatar>
            </AvatarGroup>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Breadcrumbs ─── */}
      <ComponentShowcase name="Breadcrumbs" description="Navigation trail for page hierarchy. Last item is non-clickable.">
        <div className="space-y-3 w-full">
          <Breadcrumbs>
            <MuiLink href="#" underline="hover" color="text.secondary">Home</MuiLink>
            <span className="text-[13px] text-zinc-200 font-medium">Projects to Explore</span>
          </Breadcrumbs>
          <Breadcrumbs>
            <MuiLink href="#" underline="hover" color="text.secondary">Home</MuiLink>
            <MuiLink href="#" underline="hover" color="text.secondary">Projects to Explore</MuiLink>
            <span className="text-[13px] text-zinc-200 font-medium">Tu</span>
          </Breadcrumbs>
        </div>
      </ComponentShowcase>

      {/* ─── Tabs ─── */}
      <ComponentShowcase name="Tabs" description="Page-level navigation tabs with amber indicator.">
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Project Details" />
          <Tab label="Scripts" />
          <Tab label="Characters" />
          <Tab label="Trailer" />
        </Tabs>
      </ComponentShowcase>

      {/* ─── Switch ─── */}
      <ComponentShowcase name="Switch" description="Toggle control with amber accent when active.">
        <div className="flex flex-wrap gap-4">
          <FormControlLabel
            control={<Switch checked={switchOn} onChange={(_, v) => setSwitchOn(v)} />}
            label={<span className="text-[13px]">{switchOn ? "Enabled" : "Disabled"}</span>}
          />
          <FormControlLabel
            control={<Switch disabled />}
            label={<span className="text-[13px] text-zinc-600">Disabled</span>}
          />
        </div>
      </ComponentShowcase>

      {/* ─── Alert ─── */}
      <ComponentShowcase name="Alert" description="Feedback banners in 4 severity levels, themed with translucent backgrounds.">
        <div className="space-y-3 w-full">
          <Alert severity="success">Project submitted successfully.</Alert>
          <Alert severity="info">Script analysis is in progress.</Alert>
          <Alert severity="warning">Credits running low — 3 remaining.</Alert>
          <Alert severity="error">Failed to upload trailer. Please try again.</Alert>
        </div>
      </ComponentShowcase>

      {/* ─── Dialog ─── */}
      <ComponentShowcase name="Dialog" description="Modal dialog with glass-style paper background.">
        <div>
          <Button variant="contained" color="secondary" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontSize: 16, fontWeight: 600 }}>Confirm Action</DialogTitle>
            <DialogContent>
              <p className="text-[13px] text-zinc-400">Are you sure you want to proceed? This action cannot be undone.</p>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="text" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => setDialogOpen(false)}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </div>
      </ComponentShowcase>

      {/* ─── Menu ─── */}
      <ComponentShowcase name="Menu" description="Dropdown menu with RecoBee dark styling and amber selection.">
        <div>
          <Button variant="contained" color="secondary" endIcon={<MoreVertIcon />} onClick={(e) => setMenuAnchor(e.currentTarget)}>
            Options
          </Button>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
            <MenuItem onClick={() => setMenuAnchor(null)}>Edit Project</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>Duplicate</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>Export PDF</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)} sx={{ color: "#f87171" }}>Delete</MenuItem>
          </Menu>
        </div>
      </ComponentShowcase>

      {/* ─── Tooltip ─── */}
      <ComponentShowcase name="Tooltip" description="Hover tooltips with dark paper style.">
        <div className="flex gap-4">
          <Tooltip title="Add new project" arrow>
            <Button variant="contained" size="small">Hover me</Button>
          </Tooltip>
          <Tooltip title="Export data as CSV" placement="right" arrow>
            <IconButton size="small"><FileUploadIcon /></IconButton>
          </Tooltip>
        </div>
      </ComponentShowcase>

      {/* ─── Progress ─── */}
      <ComponentShowcase name="Progress" description="Linear progress bar with amber gradient fill.">
        <div className="space-y-4 w-full max-w-md">
          <div>
            <p className="text-[12px] text-zinc-500 mb-1">Script Analysis — 73%</p>
            <LinearProgress variant="determinate" value={73} />
          </div>
          <div>
            <p className="text-[12px] text-zinc-500 mb-1">Loading...</p>
            <LinearProgress />
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Skeleton ─── */}
      <ComponentShowcase name="Skeleton" description="Loading placeholders that match RecoBee surface colors.">
        <div className="space-y-3 w-full max-w-sm">
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <div className="flex gap-2 mt-2">
            <Skeleton variant="circular" width={32} height={32} />
            <div className="flex-1">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Empty State (custom) ─── */}
      <ComponentShowcase name="Empty State" description="Custom empty state pattern for no-results and blank slates.">
        <div className="w-full bg-zinc-950/50 rounded-xl border border-white/[0.04]">
          <EmptyState
            action={<Button variant="contained" size="small">Clear filters</Button>}
          />
        </div>
      </ComponentShowcase>
      {/* ─── Stat Card ─── */}
      <ComponentShowcase name="Stat Card" description="Metric display cards with color-coded values. From Ads Analysis dashboards.">
        <div className="grid grid-cols-4 gap-4 w-full">
          <StatCard label="Creative Quality" value="8.5" variant="accent" />
          <StatCard label="Compliance" value="9.2" variant="success" subtitle="All checks passed" />
          <StatCard label="Risk Score" value="3.1" variant="danger" subtitle="High risk detected" />
          <StatCard label="Viral Potential" value="7.8" variant="info" />
        </div>
      </ComponentShowcase>

      {/* ─── Service Card ─── */}
      <ComponentShowcase name="Service Card" description="Feature/service cards from the RecoBee home page. Supports badges and disabled states.">
        <div className="grid grid-cols-3 gap-4 w-full">
          <ServiceCard
            title="Script Analysis"
            description="Unlock deep story insights: character arcs, dialogue scores, genre signals, and more."
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>}
          />
          <ServiceCard
            title="Reel Analysis"
            description="Measure Micro-Content performance with sentiment and engagement signals."
            badge="Private Beta"
            badgeVariant="amber"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" /></svg>}
          />
          <ServiceCard
            title="Audio Analysis"
            description="Analyze audio-only content for sentiment, listener cues, and performance signals."
            badge="Launching Soon"
            badgeVariant="zinc"
            disabled
          />
        </div>
      </ComponentShowcase>

      {/* ─── Score Ring ─── */}
      <ComponentShowcase name="Score Ring" description="Circular progress indicator from Ads Analysis. Auto-colors green/amber/red based on score.">
        <div className="flex items-end gap-8">
          <ScoreRing score={8.5} label="Overall" size="lg" />
          <ScoreRing score={6.2} label="Engagement" size="md" />
          <ScoreRing score={3.1} label="Risk" size="md" />
          <ScoreRing score={9.0} label="Quality" size="sm" />
          <ScoreRing score={4.8} label="Reach" size="sm" />
        </div>
      </ComponentShowcase>

      {/* ─── Score Bar ─── */}
      <ComponentShowcase name="Score Bar" description="Horizontal progress bars for metric breakdowns. Auto-colors by value.">
        <div className="space-y-2.5 w-full">
          <ScoreBar label="Creative Quality" value={8.5} />
          <ScoreBar label="Technical Score" value={7.2} />
          <ScoreBar label="Cultural Alignment" value={5.8} />
          <ScoreBar label="Compliance" value={9.1} />
          <ScoreBar label="Risk Factor" value={3.2} />
        </div>
      </ComponentShowcase>

      {/* ─── Status Badge ─── */}
      <ComponentShowcase name="Status Badge" description="Status indicators for tables and lists. From Script Analysis table.">
        <div className="space-y-3 w-full">
          <div className="flex flex-wrap gap-2">
            <StatusBadge label="Success" variant="success" />
            <StatusBadge label="Warning" variant="warning" />
            <StatusBadge label="Error" variant="error" />
            <StatusBadge label="Info" variant="info" />
            <StatusBadge label="Neutral" variant="neutral" />
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge label="Pass" variant="success" dot />
            <StatusBadge label="Review" variant="warning" dot />
            <StatusBadge label="Failed" variant="error" dot />
            <StatusBadge label="Pending" variant="info" dot />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label="Small" variant="success" size="sm" />
            <StatusBadge label="Medium" variant="success" size="md" />
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Funnel Bar ─── */}
      <ComponentShowcase name="Funnel" description="Conversion funnel visualization from Ads Analysis. Amber gradient with decreasing opacity.">
        <div className="w-full max-w-lg">
          <FunnelBar stages={[
            { label: "Awareness", value: 92 },
            { label: "Consideration", value: 68 },
            { label: "Intent", value: 41 },
            { label: "Action", value: 23 },
          ]} />
        </div>
      </ComponentShowcase>

      {/* ─── Charts ─── */}
      <ComponentShowcase name="Charts" description="Chart.js with RecoBee dark theme. Bar, Line, Doughnut, and Radar variants.">
        <div className="grid grid-cols-2 gap-4 w-full">
          <ChartContainer title="Performance Breakdown" height={220}>
            <RBBarChart data={{
              labels: ["Creative", "Technical", "Cultural", "Compliance", "Platform", "Viral", "Conversion", "ROAS"],
              datasets: [{
                label: "Score",
                data: [8.5, 7.2, 6.8, 9.1, 7.5, 7.8, 6.2, 8.0],
                backgroundColor: seriesPaletteDim[0],
                borderColor: seriesPalette[0],
                borderWidth: 1,
                borderRadius: 4,
              }],
            }} />
          </ChartContainer>

          <ChartContainer title="Virality Factors" height={220}>
            <RBLineChart data={{
              labels: ["Emotion", "Shareability", "Trend", "Hook", "Relatability", "Novelty", "CTA"],
              datasets: [{
                label: "Score",
                data: [8.2, 7.5, 6.8, 9.0, 7.2, 8.5, 6.0],
                borderColor: seriesPalette[0],
                backgroundColor: seriesPaletteDim[0],
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: seriesPalette[0],
              }],
            }} />
          </ChartContainer>

          <ChartContainer title="Media Mix" height={220}>
            <RBDoughnutChart data={{
              labels: ["TV", "YouTube", "Facebook", "Instagram", "OTT", "TikTok"],
              datasets: [{
                data: [30, 25, 15, 12, 10, 8],
                backgroundColor: seriesPalette.slice(0, 6),
                borderColor: "transparent",
                borderWidth: 0,
              }],
            }} />
          </ChartContainer>

          <ChartContainer title="Competitive Position" height={220}>
            <RBRadarChart data={{
              labels: ["Creativity", "Production", "Engagement", "Virality", "ROI", "Brand Fit"],
              datasets: [
                {
                  label: "Your Ad",
                  data: [8, 7, 9, 7, 8, 6],
                  borderColor: seriesPalette[0],
                  backgroundColor: seriesPaletteDim[0],
                  pointBackgroundColor: seriesPalette[0],
                },
                {
                  label: "Competitor",
                  data: [6, 8, 6, 5, 7, 8],
                  borderColor: seriesPalette[1],
                  backgroundColor: seriesPaletteDim[1],
                  pointBackgroundColor: seriesPalette[1],
                },
              ],
            }} />
          </ChartContainer>
        </div>
      </ComponentShowcase>

      {/* ─── Data Table ─── */}
      <ComponentShowcase name="Table" description="MUI Table styled for RecoBee. From Script Analysis listing page.">
        <div className="w-full">
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Script Title</TableCell>
                  <TableCell align="center">Overall Rating</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell align="center">Act 1</TableCell>
                  <TableCell align="center">Act 2</TableCell>
                  <TableCell align="center">Act 3</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { title: "mukhi", rating: 4.2, genre: "Psychological Horror", a1: 4.3, a2: 4.0, a3: 4.3, status: "success" as const },
                  { title: "Dangal", rating: 8.6, genre: "Sports Drama", a1: 8.5, a2: 8.0, a3: 9.3, status: "success" as const },
                  { title: "BKPitch", rating: 4.8, genre: "Dark Comedy Thriller", a1: 5.8, a2: 5.0, a3: 3.7, status: "warning" as const },
                  { title: "A Separation", rating: 9.0, genre: "Social Drama", a1: 9.3, a2: 8.7, a3: 9.0, status: "success" as const },
                ].map((row) => (
                  <TableRow key={row.title}>
                    <TableCell><span className="text-amber-400 font-medium">{row.title}</span></TableCell>
                    <TableCell align="center">{row.rating}</TableCell>
                    <TableCell>{row.genre}</TableCell>
                    <TableCell align="center">{row.a1}</TableCell>
                    <TableCell align="center">{row.a2}</TableCell>
                    <TableCell align="center">{row.a3}</TableCell>
                    <TableCell align="center">
                      <StatusBadge label={row.status === "success" ? "Success" : "Review"} variant={row.status} size="sm" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ComponentShowcase>
    </main>
  );
}
