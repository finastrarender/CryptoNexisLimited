"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiryType?: string;
  message: string;
  createdAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function InquiryList({
  title,
  description,
  emptyMessage,
  inquiries: initialInquiries,
}: {
  title: string;
  description: string;
  emptyMessage: string;
  inquiries: Inquiry[];
}) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(inquiry: Inquiry) {
    const confirmed = window.confirm(
      `Delete inquiry from ${inquiry.name} (${inquiry.email})? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(inquiry._id);
    setError("");

    try {
      const res = await fetch(`/api/v1/admin/inquiries/${inquiry._id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error((json?.error?.message as string) || "Delete failed");
      }

      setInquiries((current) => current.filter((item) => item._id !== inquiry._id));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-card admin-dashboard__card">
      <header className="admin-dashboard__section-head">
        <h1 style={{ margin: 0 }}>{title}</h1>
        <p className="admin-muted" style={{ textAlign: "left" }}>
          {description}
        </p>
      </header>

      {error ? <p className="contact-form__err">{error}</p> : null}

      <div className="admin-section-group">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <article key={inquiry._id} className="admin-section-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: "1rem" }}>{inquiry.name}</h2>
                  <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <p className="admin-muted" style={{ margin: 0, textAlign: "right" }}>
                    {formatDate(inquiry.createdAt)}
                  </p>
                  <button
                    type="button"
                    className="admin-button-secondary admin-inquiry-delete"
                    disabled={deletingId === inquiry._id}
                    onClick={() => handleDelete(inquiry)}
                  >
                    {deletingId === inquiry._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                {inquiry.phone ? (
                  <p style={{ margin: 0 }}>
                    <strong>Phone:</strong> {inquiry.phone}
                  </p>
                ) : null}
                {inquiry.company ? (
                  <p style={{ margin: 0 }}>
                    <strong>Company:</strong> {inquiry.company}
                  </p>
                ) : null}
                {inquiry.inquiryType ? (
                  <p style={{ margin: 0 }}>
                    <strong>Subject:</strong> {inquiry.inquiryType}
                  </p>
                ) : null}
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{inquiry.message}</p>
              </div>
            </article>
          ))
        ) : (
          <p className="admin-muted" style={{ textAlign: "left" }}>
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
}
