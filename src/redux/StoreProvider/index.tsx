"use client";

import React, { useRef } from "react";
import { AppStore, makeStore } from "@/redux/store";
import { Provider } from "react-redux";

function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
