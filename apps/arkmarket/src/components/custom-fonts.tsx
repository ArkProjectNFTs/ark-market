import { env } from "~/env";

export default function CustomFonts() {
  if (env.NEXT_PUBLIC_THEME !== "unframed") {
    return null;
  }

  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/tzw7xdb.css" />
      <link rel="stylesheet" href="https://use.typekit.net/ucz5xlt.css" />
    </>
  );
}
