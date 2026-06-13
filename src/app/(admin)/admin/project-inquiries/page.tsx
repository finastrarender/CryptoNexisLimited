import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import InquiryList from "@/components/admin/InquiryList";
import { connectMongo } from "@/lib/mongoose";
import ContactLead from "@/models/ContactLead";

export default async function AdminProjectInquiriesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  await connectMongo();
  const leads = await ContactLead.find({ source: "projects" }).sort({ createdAt: -1 }).lean();

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
        <Link href="/admin/pages/projects">Edit projects page</Link>
      </nav>
      <InquiryList
        title="Project inquiries"
        description="Submissions received from the Projects page send inquiry form."
        emptyMessage="No project inquiries found yet."
        inquiries={inquiries}
      />
    </div>
  );
}
