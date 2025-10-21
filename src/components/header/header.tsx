"use client";
 import HeaderTop from "./header-top";
import { usePathname } from "next/navigation";
import Header2 from "./header2";
import Header1 from "./header1";
import Header3 from "./header3";
import React, { useMemo } from "react";

const MemoizedHeaderTop = React.memo(HeaderTop);
const MemoizedHeader1 = React.memo(Header1);
const MemoizedHeader2 = React.memo(Header2);
const MemoizedHeader3 = React.memo(Header3);

function Header() {
  const pathname = usePathname();

  const headerContent = useMemo(() => {
    if (pathname === "/") {
      return (
        <>
          <MemoizedHeaderTop />
          <MemoizedHeader1 />
        </>
      );
    } else if (pathname === "/home2") {
      return (
        <>
          {/* <MemoizedHeaderTop /> */}
          <MemoizedHeader2 />
        </>
      );
    } else {
      // Use Header1 for other pages
      return (
        <>
          <MemoizedHeader1 />
        </>
      );
    }
  }, [pathname]);

  return <>{headerContent}</>;
}

export default React.memo(Header);