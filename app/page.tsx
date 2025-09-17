"use client";

import { Button } from "@/components/ui/button";
import BlurText from "@/components/ui/blur-text";
import { useState } from "react";
import { signOut, useAuth } from "@/providers/AuthProvider";
import SignInForm from "@/components/SignInForm";
import QuickList from "@/components/QuickList";
import QuickFooter from "@/components/QuickFooter";
import QuickForm from "@/components/QuickForm";
import QuickFilter from "@/components/QuickFilter";

export default function Home() {
  const { user } = useAuth()
  const [show, setShow] = useState<boolean>(false);
  const [editing, setEditing] = useState<any | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    priority: "all",
    status: "all",
  });

  if (!user) {
    return (
      <div className="max-w-[1024px] min-h-screen mx-auto px-[24px] lg:px-0 pt-14">
        <div className="flex w-full max-w-sm mx-auto flex-col gap-6">
          <div className="flex justify-center">
            <BlurText
              text="Quicklist"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl lg:text-3xl font-black text-[#FEEFDD]"
            />
          </div>
          <SignInForm />
        </div>
      </div>
    )
  }
  return (
    <section className="max-w-[1024px] min-h-screen mx-auto px-[24px] lg:px-0 pt-14 space-y-7">
      <div className="flex flex-col md:flex-row md:justify-between">
        <BlurText
          text="Quicklist"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-2xl lg:text-3xl font-black text-[#FEEFDD]"
        />
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-[#FEEFDD] text-sm">{user.email}</span>
            <Button onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <QuickFilter
          onFilterChange={setFilters}
        />
        <QuickForm
          userId={user.uid}
          editing={editing}
          onDone={() => setEditing(null)}
          show={show}
          hasForm={(x) => setShow(x)}
        />
        <QuickList
          userId={user.uid}
          onEdit={(x) => setEditing(x)}
          hasForm={(x) => setShow(x)}
          filters={filters}
        />
        <QuickFooter />
      </div>
    </section>
  );
}
