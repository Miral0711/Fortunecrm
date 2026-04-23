import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  SlidersHorizontal,
  Star,
  Heart,
  Camera,
  MapPin,
  Calendar,
  Pencil,
  Eye,
  Filter,
  X,
  Search,
  TrendingUp,
  Home,
  DollarSign,
  Layers,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Lot {
  id: string;
  name: string; // e.g. "Harlow Estate - 741"
  suburb: string;
  state: string;
  price: number;
  type: "House and Land" | "Duplex" | "Apartment" | "Land" | "Town House";
  buildStatus: "O.T.P." | "Ready";
  availableLots: number;
  rentalYield: string;
  tags: string[];
  date: string;
  imgGrad: string;
  lat: number;
  lng: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const LOTS: Lot[] = [
  {
    id: "1",
    name: "Harlow Estate - 741",
    suburb: "Tarneit",
    state: "VIC",
    price: 878028,
    type: "House and Land",
    buildStatus: "O.T.P.",
    availableLots: 1,
    rentalYield: "3.43%",
    tags: ["HIGH CAPITAL GROWTH", "SMSF"],
    date: "17 Apr 2026",
    imgGrad: "from-slate-300 to-slate-400",
    lat: -37.84,
    lng: 144.65,
  },
  {
    id: "2",
    name: "Hamlet Estate - 39",
    suburb: "Diggers Rest",
    state: "VIC",
    price: 871477,
    type: "House and Land",
    buildStatus: "O.T.P.",
    availableLots: 1,
    rentalYield: "3.58%",
    tags: ["HIGH CAPITAL GROWTH", "SMSF"],
    date: "17 Apr 2026",
    imgGrad: "from-stone-300 to-stone-400",
    lat: -37.6,
    lng: 144.71,
  },
  {
    id: "3",
    name: "Kinship - 135",
    suburb: "Tarneit",
    state: "VIC",
    price: 867145,
    type: "House and Land",
    buildStatus: "O.T.P.",
    availableLots: 4,
    rentalYield: "3.21%",
    tags: ["HIGH CAPITAL GROWTH"],
    date: "16 Apr 2026",
    imgGrad: "from-amber-200 to-amber-300",
    lat: -38.1,
    lng: 145.33,
  },
  {
    id: "4",
    name: "Horizon Estate - 22",
    suburb: "Werribee",
    state: "VIC",
    price: 720000,
    type: "House and Land",
    buildStatus: "Ready",
    availableLots: 12,
    rentalYield: "3.75%",
    tags: ["SMSF"],
    date: "15 Apr 2026",
    imgGrad: "from-sky-200 to-sky-300",
    lat: -37.9,
    lng: 144.66,
  },
  {
    id: "5",
    name: "Parkview - 26",
    suburb: "Penrith",
    state: "NSW",
    price: 810000,
    type: "Duplex",
    buildStatus: "O.T.P.",
    availableLots: 6,
    rentalYield: "4.10%",
    tags: ["HIGH CAPITAL GROWTH"],
    date: "14 Apr 2026",
    imgGrad: "from-teal-200 to-teal-300",
    lat: -33.75,
    lng: 150.69,
  },
  {
    id: "6",
    name: "Coastal Sands - 8",
    suburb: "Gold Coast",
    state: "QLD",
    price: 515000,
    type: "Land",
    buildStatus: "Ready",
    availableLots: 22,
    rentalYield: "—",
    tags: [],
    date: "13 Apr 2026",
    imgGrad: "from-orange-200 to-orange-300",
    lat: -28.0,
    lng: 153.43,
  },
  {
    id: "7",
    name: "Metro Quarter - 14",
    suburb: "Adelaide",
    state: "SA",
    price: 680000,
    type: "Apartment",
    buildStatus: "O.T.P.",
    availableLots: 3,
    rentalYield: "4.50%",
    tags: ["SMSF"],
    date: "12 Apr 2026",
    imgGrad: "from-indigo-200 to-indigo-300",
    lat: -34.93,
    lng: 138.6,
  },
  {
    id: "8",
    name: "Greenfield Hts - 5",
    suburb: "Baldivis",
    state: "WA",
    price: 420000,
    type: "House and Land",
    buildStatus: "Ready",
    availableLots: 8,
    rentalYield: "3.90%",
    tags: ["HIGH CAPITAL GROWTH"],
    date: "11 Apr 2026",
    imgGrad: "from-green-200 to-green-300",
    lat: -32.32,
    lng: 115.84,
  },
  {
    id: "9",
    name: "Ripley Central - 18",
    suburb: "Ripley",
    state: "QLD",
    price: 525000,
    type: "Town House",
    buildStatus: "O.T.P.",
    availableLots: 5,
    rentalYield: "3.65%",
    tags: ["SMSF", "HIGH CAPITAL GROWTH"],
    date: "10 Apr 2026",
    imgGrad: "from-rose-200 to-rose-300",
    lat: -27.67,
    lng: 152.77,
  },
  {
    id: "10",
    name: "Springvale Rise - 44",
    suburb: "Cranbourne",
    state: "VIC",
    price: 610000,
    type: "House and Land",
    buildStatus: "Ready",
    availableLots: 9,
    rentalYield: "3.55%",
    tags: ["HIGH CAPITAL GROWTH"],
    date: "09 Apr 2026",
    imgGrad: "from-purple-200 to-purple-300",
    lat: -38.1,
    lng: 145.28,
  },
];

const TOTAL_RESULTS = 7432;
const TOTAL_PAGES = 744;
const PER_PAGE_OPTS = ["10", "25", "50", "100"];
const ORDER_OPTS = [
  "Default Order",
  "Price: Low–High",
  "Price: High–Low",
  "Newest First",
  "Status",
];

const TAG_STYLES: Record<string, string> = {
  "HIGH CAPITAL GROWTH": "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
  SMSF: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
};

const TYPE_DOT: Record<string, string> = {
  "House and Land": "bg-orange-400",
  Duplex: "bg-amber-400",
  "Town House": "bg-teal-400",
  Apartment: "bg-blue-400",
  Land: "bg-green-400",
};

// ── Map Panel ─────────────────────────────────────────────────────────────────

function MapPanel({ lots }: { lots: Lot[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 via-teal-50/40 to-sky-50 overflow-hidden rounded-none">
      {/* Grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mapgrid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
      </svg>

      {/* Simulated roads */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 210 Q 220 190 440 230 T 900 210"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 0 370 Q 320 340 640 375 T 950 355"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 210 0 Q 230 210 210 420 T 230 750"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 520 0 Q 500 210 530 420 T 510 750"
          stroke="#e2e8f0"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 0 500 Q 400 480 700 510 T 950 495"
          stroke="#e2e8f0"
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="700"
          cy="290"
          rx="130"
          ry="85"
          fill="#bae6fd"
          opacity="0.45"
        />
        <ellipse
          cx="780"
          cy="440"
          rx="85"
          ry="55"
          fill="#bae6fd"
          opacity="0.3"
        />
        <ellipse
          cx="150"
          cy="500"
          rx="70"
          ry="45"
          fill="#bbf7d0"
          opacity="0.35"
        />
        <ellipse
          cx="400"
          cy="150"
          rx="55"
          ry="35"
          fill="#bbf7d0"
          opacity="0.3"
        />
      </svg>

      {/* Pin markers */}
      {lots.map((lot, i) => {
        const x = 12 + ((i * 73) % 72);
        const y = 8 + ((i * 57) % 76);
        const isHovered = hoveredId === lot.id;
        return (
          <div
            key={lot.id}
            className="absolute group cursor-pointer"
            style={{ left: `${x}%`, top: `${y}%`, zIndex: isHovered ? 20 : 10 }}
            onMouseEnter={() => setHoveredId(lot.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-30 pointer-events-none transition-all duration-150 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
            >
              <div className="bg-gray-900/95 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                <p className="font-semibold">{lot.name}</p>
                <p className="text-gray-300 text-[9px] mt-0.5">
                  {lot.suburb}, {lot.state} · ${lot.price.toLocaleString()}
                </p>
              </div>
              <div className="w-2 h-2 bg-gray-900/95 rotate-45 mx-auto -mt-1 rounded-sm" />
            </div>
            <div
              className={`relative transition-all duration-150 ${isHovered ? "scale-125" : "scale-100"}`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors duration-150 ${isHovered ? "bg-orange-500" : "bg-blue-500"}`}
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/20 rounded-full blur-sm" />
            </div>
          </div>
        );
      })}

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 flex flex-col bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold border-b border-gray-100 transition-colors text-base leading-none">
          +
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold transition-colors text-base leading-none">
          −
        </button>
      </div>

      {/* Top-right controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors"
          title="Filter map"
        >
          <Filter className="w-3.5 h-3.5 text-white" />
        </button>
        <button
          className="w-8 h-8 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          title="My location"
        >
          <MapPin className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <button
          className="w-8 h-8 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          title="Layers"
        >
          <Layers className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* Results badge */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-600">
          {lots.length} pins shown
        </p>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-1.5 right-2 text-[9px] text-gray-400/70">
        Leaflet | © OpenStreetMap contributors
      </div>
    </div>
  );
}

// ── Lot Card ──────────────────────────────────────────────────────────────────

function LotCard({
  lot,
  selected,
  onSelect,
}: {
  lot: Lot;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-px ${
        selected
          ? "border-orange-400 shadow-md shadow-orange-100 ring-1 ring-orange-300/50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500 rounded-l-xl" />
      )}

      {/* Thumbnail */}
      <div
        className={`relative w-[128px] shrink-0 bg-gradient-to-br ${lot.imgGrad}`}
      >
        <div className="absolute top-1.5 left-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 bg-white/90 rounded-md flex items-center justify-center hover:bg-white shadow-sm transition-colors"
          >
            <Star className="w-2.5 h-2.5 text-gray-500" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 bg-white/90 rounded-md flex items-center justify-center hover:bg-white shadow-sm transition-colors"
          >
            <Heart className="w-2.5 h-2.5 text-gray-500" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 bg-white/90 rounded-md flex items-center justify-center hover:bg-white shadow-sm transition-colors"
          >
            <Camera className="w-2.5 h-2.5 text-gray-500" />
          </button>
        </div>
        {/* House silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <svg viewBox="0 0 80 60" className="w-14 h-10 fill-white">
            <polygon points="40,5 75,30 65,30 65,55 15,55 15,30 5,30" />
          </svg>
        </div>
        <div className="absolute bottom-2 left-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[lot.type] ?? "bg-gray-400"}`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
              {lot.name}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-2.5 h-2.5 shrink-0" />
              {lot.suburb}, {lot.state}
            </p>
          </div>
          <p className="text-sm font-bold text-gray-800 shrink-0 whitespace-nowrap">
            ${lot.price.toLocaleString()}
          </p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-2.5">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
              Build Status
            </p>
            <p className="text-xs text-gray-700 font-medium">
              {lot.buildStatus}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
              Rental Yield
            </p>
            <p className="text-xs text-gray-700 font-medium">
              {lot.rentalYield}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
              Avail. Lots
            </p>
            <p className="text-xs text-gray-700 font-medium">
              {lot.availableLots}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
              Type
            </p>
            <p className="text-xs text-gray-700 font-medium truncate">
              {lot.type}
            </p>
          </div>
        </div>

        {/* Tags */}
        {lot.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {lot.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${TAG_STYLES[tag] ?? "bg-gray-100 text-gray-600"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3" />
              {lot.date}
            </span>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-0.5 text-orange-500 hover:text-orange-600 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              Distance
            </button>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Pencil className="w-2.5 h-2.5" /> Edit
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
            >
              <Eye className="w-2.5 h-2.5" /> Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────────────────────

function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-2 group"
      type="button"
    >
      <div
        className={`relative inline-flex items-center rounded-full transition-colors duration-200 ${enabled ? "bg-orange-500" : "bg-gray-200"}`}
        style={{ height: "18px", width: "32px" }}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </div>
      <span
        className={`text-xs font-medium transition-colors ${enabled ? "text-gray-800" : "text-gray-500"}`}
      >
        {label}
      </span>
    </button>
  );
}

// ── Styled Select ─────────────────────────────────────────────────────────────

function StyledSelect({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none pl-2.5 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LotsPage() {
  const [location, setLocation] = useState("");
  const [radiusEnabled, setRadiusEnabled] = useState(true);
  const [priceEnabled, setPriceEnabled] = useState(false);
  const [radius, setRadius] = useState(20);
  const [priceMin] = useState(515000);
  const [priceMax, setPriceMax] = useState(5600000);
  const [activeTags, setActiveTags] = useState<string[]>(["Listed"]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState("10");
  const [order, setOrder] = useState("Default Order");
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return LOTS.filter((l) => {
      if (
        search &&
        !l.name.toLowerCase().includes(search.toLowerCase()) &&
        !l.suburb.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (location && l.state !== location) return false;
      return true;
    });
  }, [search, location]);

  const paged = filtered.slice(
    (page - 1) * Number(perPage),
    page * Number(perPage),
  );

  function removeTag(tag: string) {
    setActiveTags((prev) => prev.filter((t) => t !== tag));
  }

  function clearAll() {
    setLocation("");
    setRadius(20);
    setPriceMax(5600000);
    setActiveTags(["Listed"]);
    setSearch("");
  }

  const pages: (number | "...")[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "...",
    TOTAL_PAGES - 1,
    TOTAL_PAGES,
  ];
  const startResult = (page - 1) * Number(perPage) + 1;
  const endResult = Math.min(page * Number(perPage), TOTAL_RESULTS);

  return (
    <div className="h-full min-h-0 w-full">
      <div className="mx-auto h-full min-h-0 w-full max-w-[1400px] px-3 md:px-5 lg:px-6 py-3 md:py-4 flex flex-col gap-4">
      {/* ── Filter Panel ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0">
        <div className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                <Home className="w-3 h-3" /> Location
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                >
                  <option value="">Select location…</option>
                  {["VIC", "NSW", "QLD", "WA", "SA", "TAS", "NT", "ACT"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 lg:col-span-7">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                <Search className="w-3 h-3" /> Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Project, suburb..."
                  className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-end gap-2 lg:col-span-3 justify-start lg:justify-end">
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                Advanced
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                <MapPin className="w-3 h-3" /> Radius Search
              </label>
              <div className="flex flex-col gap-1">
                <Toggle
                  enabled={radiusEnabled}
                  onChange={() => setRadiusEnabled((v) => !v)}
                  label={`Radius: ${radius} km`}
                />
                {radiusEnabled && (
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full h-2 cursor-pointer rounded-full mt-1 accent-orange-500"
                    style={{ accentColor: "#f97316" }}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                <DollarSign className="w-3 h-3" /> Price Range
              </label>
              <div className="flex flex-col gap-1">
                <Toggle
                  enabled={priceEnabled}
                  onChange={() => setPriceEnabled((v) => !v)}
                  label={`$${priceMin.toLocaleString()} – $${priceMax.toLocaleString()}`}
                />
                {priceEnabled && (
                  <input
                    type="range"
                    min={100000}
                    max={10000000}
                    step={10000}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full h-2 cursor-pointer rounded-full mt-1 accent-orange-500"
                    style={{ accentColor: "#f97316" }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
            {activeTags.length > 0 ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-gray-400 font-medium">
                  Active:
                </span>
                {activeTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-orange-50 text-orange-600 ring-1 ring-orange-200 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-orange-800 transition-colors ml-0.5"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 min-h-0">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-full min-h-0">
        {/* Left: list panel */}
        <div className="xl:col-span-5 flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="px-4 py-3 bg-white border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">{TOTAL_RESULTS.toLocaleString()} results</span>
                <span className="text-[11px] text-gray-400">Showing {startResult}–{endResult}</span>
              </div>
              <div className="flex items-center gap-2">
              <StyledSelect
                value={perPage}
                onChange={(v) => {
                  setPerPage(v);
                  setPage(1);
                }}
                options={PER_PAGE_OPTS}
                className="w-14"
              />
              <StyledSelect
                value={order}
                onChange={setOrder}
                options={ORDER_OPTS}
                className="w-36"
              />
              <div className="ml-auto flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 transition-colors ${view === "list" ? "bg-orange-500 text-white" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 transition-colors ${view === "grid" ? "bg-orange-500 text-white" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-50 transition-colors border-l border-gray-100">
                  <TrendingUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/60">
            {paged.map((lot) => (
              <LotCard
                key={lot.id}
                lot={lot}
                selected={selectedId === lot.id}
                onSelect={() =>
                  setSelectedId((id) => (id === lot.id ? null : lot.id))
                }
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="shrink-0 bg-white border-t border-gray-200 px-3 py-3 mt-1 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-6 h-6 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {pages.map((p, i) =>
              p === "..." ? (
                <span
                  key={`e-${i}`}
                  className="w-6 h-6 flex items-center justify-center text-[10px] text-gray-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-medium transition-colors ${
                    page === p
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={page === TOTAL_PAGES}
              className="w-6 h-6 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: map panel */}
        <div className="xl:col-span-7 min-w-0">
          <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
            <MapPanel lots={paged} />
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
