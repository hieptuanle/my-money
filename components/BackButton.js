import * as React from "react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  return <a onClick={() => router.back()}>&larr;</a>;
}
