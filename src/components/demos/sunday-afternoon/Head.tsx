import { META } from "@/utils/meta";
import NextHead from "next/head";

export function Head() {
  return (
    <NextHead>
      <title>{META.DEMOS.SUNDAY_AFTERNOON.TITLE}</title>
      <meta
        name="description"
        content={META.DEMOS.SUNDAY_AFTERNOON.DESCRIPTION}
      />
      <meta property="og:title" content={META.DEMOS.SUNDAY_AFTERNOON.TITLE} />
      <meta
        property="og:description"
        content={META.DEMOS.SUNDAY_AFTERNOON.DESCRIPTION}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://farazshaikh.com/demos/sunday-afternoon"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@CantBeFaraz" />
      <meta name="twitter:title" content={META.DEMOS.SUNDAY_AFTERNOON.TITLE} />
      <meta
        name="twitter:description"
        content={META.DEMOS.SUNDAY_AFTERNOON.DESCRIPTION}
      />
      <meta name="twitter:image" content="/og-image.png" />
      <meta
        name="theme-color"
        content={META.DEMOS.SUNDAY_AFTERNOON.THEME_COLOR}
      />
      <meta
        name="keywords"
        content={META.KEYWORDS_BASE + META.DEMOS.SUNDAY_AFTERNOON.KEYWORDS}
      />

      <link
        rel="canonical"
        href="https://farazshaikh.com/demos/sunday-afternoon"
      />
    </NextHead>
  );
}