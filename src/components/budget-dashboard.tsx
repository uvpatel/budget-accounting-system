"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Landmark,
  LayoutDashboard,
  Plus,
  ReceiptText,
  Settings,
  ShoppingBag,
  Target,
  Users,
  WalletCards,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const budgetByCenter = [
  { name: "Production", budget: 600000, actual: 472000, color: "#4f46e5" },
  { name: "Marketing", budget: 250000, actual: 218000, color: "#0ea5e9" },
  { name: "Showroom", budget: 180000, actual: 166000, color: "#14b8a6" },
  { name: "Logistics", budget: 150000, actual: 158000, color: "#f59e0b" },
];

const monthlyTrend = [
  { month: "Jan", budget: 92, actual: 72 },
  { month: "Feb", budget: 108, actual: 91 },
  { month: "Mar", budget: 115, actual: 112 },
  { month: "Apr", budget: 128, actual: 119 },
  { month: "May", budget: 142, actual: 136 },
  { month: "Jun", budget: 150, actual: 161 },
  { month: "Jul", budget: 164, actual: 151 },
];

const transactions = [
  { ref: "BILL/2026/0718", partner: "WoodCraft Suppliers", center: "Production", amount: "₹48,500", status: "Partially Paid", type: "Vendor Bill" },
  { ref: "INV/2026/0421", partner: "Aarav Interiors", center: "Showroom", amount: "₹1,24,800", status: "Paid", type: "Customer Invoice" },
  { ref: "PO/2026/0135", partner: "Urban Timber Co.", center: "Production", amount: "₹76,200", status: "Not Paid", type: "Purchase Order" },
  { ref: "INV/2026/0420", partner: "Nexa Spaces", center: "Marketing", amount: "₹62,400", status: "Paid", type: "Customer Invoice" },
];

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function Status({ value }: { value: string }) {
  const styles = value === "Paid" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : value === "Partially Paid" ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-rose-50 text-rose-700 ring-rose-200";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}>{value}</span>;
}

export function BudgetDashboard() {
  const [period, setPeriod] = useState("FY 2026–27");
  const totalBudget = budgetByCenter.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = budgetByCenter.reduce((sum, item) => sum + item.actual, 0);
  const used = Math.round((totalActual / totalBudget) * 100);

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><Landmark className="size-5" /></div>
          <div><p className="text-sm font-bold tracking-tight">Shiv Furniture</p><p className="text-[11px] font-medium text-slate-500">BUDGET ACCOUNTING</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 md:flex" onClick={() => setPeriod(period === "FY 2026–27" ? "FY 2025–26" : "FY 2026–27")}>{period}<ChevronDown className="size-4" /></button>
          <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500"><Bell className="size-4" /></button>
          <div className="ml-1 grid size-9 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">SP</div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white px-3 py-6 lg:block">
          <p className="px-3 pb-3 text-[11px] font-bold tracking-widest text-slate-400">OVERVIEW</p>
          {[[LayoutDashboard, "Dashboard", true], [Target, "Budgets"], [BarChart3, "Budget Reports"]].map(([Icon, label, active]) => <button key={String(label)} className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}><Icon className="size-4" />{String(label)}</button>)}
          <p className="mt-7 px-3 pb-3 text-[11px] font-bold tracking-widest text-slate-400">OPERATIONS</p>
          {[[ReceiptText, "Sales & Invoices"], [ShoppingBag, "Purchases & Bills"], [WalletCards, "Payments"], [Users, "Contacts"]].map(([Icon, label]) => <button key={String(label)} className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Icon className="size-4" />{String(label)}</button>)}
          <button className="mt-8 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Settings className="size-4" />Configuration</button>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="mb-1 text-sm font-medium text-indigo-600">Financial control center</p><h1 className="text-2xl font-bold tracking-tight md:text-3xl">Budget performance overview</h1><p className="mt-1 text-sm text-slate-500">Monitor actuals, payments, and cost-center utilization in real time.</p></div>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"><Plus className="size-4" />Create transaction</button>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Approved budget", inr.format(totalBudget), "Across 4 active cost centers", Target, "text-indigo-600 bg-indigo-50"],
              ["Actual utilization", inr.format(totalActual), `${used}% of approved budget used`, CircleDollarSign, "text-violet-600 bg-violet-50"],
              ["Remaining balance", inr.format(totalBudget - totalActual), "Healthy room for planned expenses", WalletCards, "text-emerald-600 bg-emerald-50"],
              ["Collections this month", "₹3,48,200", "12% higher than last month", CreditCard, "text-sky-600 bg-sky-50"],
            ].map(([label, value, detail, Icon, colors]) => <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><p className="text-sm font-semibold text-slate-500">{String(label)}</p><div className={`grid size-9 place-items-center rounded-xl ${colors}`}><Icon className="size-4" /></div></div><p className="mt-4 text-2xl font-bold tracking-tight">{String(value)}</p><p className="mt-2 text-xs text-slate-500">{String(detail)}</p></div>)}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-start justify-between"><div><h2 className="font-bold">Budget vs actual</h2><p className="mt-1 text-sm text-slate-500">Expense utilization by cost center</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{used}% utilized</span></div>
              <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={budgetByCenter} barGap={7}><CartesianGrid vertical={false} stroke="#e2e8f0" /><XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><YAxis tickFormatter={(v) => `₹${v / 100000}L`} tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><Tooltip formatter={(value) => inr.format(Number(value))} cursor={{ fill: "#f8fafc" }} /><Bar dataKey="budget" name="Budget" fill="#c7d2fe" radius={[5, 5, 0, 0]} /><Bar dataKey="actual" name="Actual" fill="#4f46e5" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"><div><h2 className="font-bold">Budget allocation</h2><p className="mt-1 text-sm text-slate-500">Approved allocation by center</p></div><div className="relative mt-3 h-48"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={budgetByCenter} dataKey="budget" innerRadius={53} outerRadius={78} paddingAngle={4} stroke="none">{budgetByCenter.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip formatter={(value) => inr.format(Number(value))} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 grid place-items-center text-center"><span className="text-xl font-bold">₹11.8L</span><span className="-mt-7 text-[10px] text-slate-500">TOTAL BUDGET</span></div></div><div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">{budgetByCenter.map((item) => <div key={item.name} className="flex items-center gap-1.5 text-slate-600"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</div>)}</div></div>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between p-5 pb-3 md:px-6"><div><h2 className="font-bold">Budget achievement lines</h2><p className="mt-1 text-sm text-slate-500">Cumulative budget and posted actuals (₹ lakhs)</p></div><button className="text-sm font-semibold text-indigo-600">View report</button></div><div className="h-62 px-2 pb-2"><ResponsiveContainer width="100%" height="100%"><LineChart data={monthlyTrend} margin={{ top: 5, right: 16, left: -15, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e2e8f0" /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="budget" name="Budget" stroke="#a5b4fc" strokeWidth={3} dot={false} /><Line type="monotone" dataKey="actual" name="Actual" stroke="#4f46e5" strokeWidth={3} dot={{ r: 3, fill: "#4f46e5" }} /></LineChart></ResponsiveContainer></div></div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm md:p-6"><div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-lg bg-amber-100 text-amber-700"><AlertTriangle className="size-4" /></div><h2 className="font-bold">Budget alerts</h2></div><div className="mt-5 space-y-4"><div><div className="flex justify-between text-sm"><span className="font-semibold">Logistics</span><span className="font-bold text-rose-600">105% used</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-100"><div className="h-full w-full rounded-full bg-rose-500" /></div><p className="mt-1.5 text-xs text-slate-500">Exceeded by ₹8,000 · review pending bills</p></div><div><div className="flex justify-between text-sm"><span className="font-semibold">Marketing</span><span className="font-bold text-amber-700">87% used</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-100"><div className="h-full w-[87%] rounded-full bg-amber-500" /></div><p className="mt-1.5 text-xs text-slate-500">₹32,000 remaining for this period</p></div></div><button className="mt-5 text-sm font-semibold text-amber-800">Review all alerts →</button></div>
          </section>

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between p-5 md:px-6"><div><h2 className="font-bold">Recent financial activity</h2><p className="mt-1 text-sm text-slate-500">Latest posted documents and payment reconciliation</p></div><button className="hidden text-sm font-semibold text-indigo-600 sm:block">View all transactions</button></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-y border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 md:px-6">Reference</th><th className="px-5 py-3">Partner</th><th className="px-5 py-3">Cost center</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Payment status</th></tr></thead><tbody>{transactions.map((item) => <tr key={item.ref} className="border-b border-slate-100 last:border-0"><td className="px-5 py-4 font-semibold text-indigo-700 md:px-6"><span className="block">{item.ref}</span><span className="mt-0.5 block text-xs font-normal text-slate-400">{item.type}</span></td><td className="px-5 py-4 font-medium">{item.partner}</td><td className="px-5 py-4 text-slate-600">{item.center}</td><td className="px-5 py-4 font-semibold">{item.amount}</td><td className="px-5 py-4"><Status value={item.status} /></td></tr>)}</tbody></table></div></section>
        </main>
      </div>
    </div>
  );
}
