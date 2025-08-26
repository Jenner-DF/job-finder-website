import { handlers } from "../../../../../auth";

export const { GET, POST } = handlers;

// Only authenticated users can access this route
// export const GET = auth((req) => {
//   return NextResponse.json({ user: req.auth });
// });
