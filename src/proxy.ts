import { NextResponse, type NextRequest } from "next/server";

const canonicalHost = "www.meetgandhi.com";
const resumePdfPath = "/assets/Meet_Gandhi_Resume.pdf";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const url = request.nextUrl.clone();

  if (host === "resume.meetgandhi.com") {
    return NextResponse.redirect(new URL(resumePdfPath, `https://${canonicalHost}`), 308);
  }

  if (host === "github.meetgandhi.com") {
    return NextResponse.redirect("https://github.com/meet989898", 308);
  }

  if (host === "linkedin.meetgandhi.com") {
    return NextResponse.redirect("https://www.linkedin.com/in/meetjg/", 308);
  }

  if (host === "projects.meetgandhi.com" && url.pathname === "/") {
    url.pathname = "/projects";
    return NextResponse.rewrite(url);
  }

  if (host === "chess.meetgandhi.com" && url.pathname === "/") {
    url.pathname = "/chess";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|assets|visuals).*)"],
};
