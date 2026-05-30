"use client"

import * as React from "react"
import SuccessLoginCard from "@/components/ui/success-login-card"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DemoOne() {
  const [form, setForm] = React.useState<{ [key: string]: string }>({})

  const handleChange = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    console.log("Form Submitted:", form)
    // Fake API delay
    await new Promise((res) => setTimeout(res, 1000))
    return true // simulate success
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/amalfi_coast.png"
          alt="Amalfi Coast background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Top Left Navigation Back Link */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/75 hover:text-white transition-colors bg-black/35 px-4 py-2 border border-white/10 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      {/* SuccessLoginCard container */}
      <div className="relative z-10 w-full flex justify-center">
        <SuccessLoginCard
          title="Create Your Account"
          description="Fill in the details below to get started"
          fields={[
            { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
            { id: "password", label: "Password", type: "password", placeholder: "********" },
            { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "********" },
            { id: "company", label: "Company / Organization", type: "text", placeholder: "Ruixen Pvt. Ltd." },
            { id: "role", label: "Role", type: "text", placeholder: "Software Developer" },
          ]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          successMessage="🎉 Account Created Successfully!"
          animationType="checkmark"
        />
      </div>
    </main>
  )
}
