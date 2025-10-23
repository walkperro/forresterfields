import AdminNav from "@/components/AdminNav";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import ClientInquiriesTable, { InquiryRow } from "./ClientInquiriesTable";

export const dynamic = "force-dynamic";

async function getData(): Promise<InquiryRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("inquiries")
    .select("id, created_at, name, email, phone, event_date, type_of_event, type_of_event_other, inquiry_about, message")
    .order("created_at", { ascending: false });
  return (data ?? []) as unknown as InquiryRow[];
}

export default async function Page() {
  const rows = await getData();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-['Playfair_Display'] text-[2rem] font-light tracking-tight text-slate-800"><span className="block mb-6">Inquiries</span></h1>
      <AdminNav active="home" />
      <ClientInquiriesTable rows={rows} />
    </div>
  );
}
