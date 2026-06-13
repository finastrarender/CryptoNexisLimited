import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import InquiryList from "@/components/admin/InquiryList";
import { connectMongo } from "@/lib/mongoose";
import ContactLead from "@/models/ContactLead";

export default async function AdminContactInquiriesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  await connectMongo();
  const leads = await ContactLead.find({
    $or: [{ source: "contact" }, { source: { $exists: false } }],
  })
    .sort({ createdAt: -1 })
    .lean();

  const inquiries = leads.map((lead) => ({
    _id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? undefined,
    company: lead.company ?? undefined,
    inquiryType: lead.inquiryType ?? undefined,
    message: lead.message,
    createdAt: lead.createdAt?.toISOString(),
  }));

  return (
    <div className="admin-shell admin-dashboard">
      <nav className="admin-nav admin-dashboard__nav">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/pages/contact">Edit contact page</Link>
      </nav>
      <InquiryList
        title="Contact inquiries"
        description="Submissions received from the Contact page inquiry form."
        emptyMessage="No contact inquiries found yet."
        inquiries={inquiries}
      />
    </div>
  );
}
