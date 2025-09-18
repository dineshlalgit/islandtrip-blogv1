import { Metadata } from "next";
import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { siteConfig } from "@/lib/site";

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

// Define what a blog page looks like
interface BlogPage {
  data: {
    title: string;
    description: string;
    date?: string;
    tags?: string[] | string;
    author?: string | { name: string };
    thumbnail?: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const page = blogSource.getPage([slug]) as BlogPage | null;

    if (!page) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const ogUrl = `${siteConfig.url}/blog/${slug}`;
    const ogImage =
      typeof page.data.thumbnail === "string" && page.data.thumbnail.length > 0
        ? page.data.thumbnail
        : `${ogUrl}/opengraph-image`;

    // Resolve author name safely
    let authorName = "IslandTrip";
    if (typeof page.data.author === "string") {
      authorName = page.data.author;
    } else if (
      page.data.author &&
      typeof page.data.author === "object" &&
      "name" in page.data.author
    ) {
      authorName = page.data.author.name;
    }

    // Normalize tags to string[]
    const tags: string[] = Array.isArray(page.data.tags)
      ? page.data.tags
      : typeof page.data.tags === "string"
      ? [page.data.tags]
      : [];

    return {
      title: `${page.data.title} | IslandTrip`,
      description: page.data.description,
      keywords: [
        page.data.title,
        ...tags,
        "IslandTrip",
        "Travel Guide",
        "Island Destinations",
        "Adventure Travel",
        "Hidden Gems",
        "Sustainable Tourism",
      ],
      authors: [
        {
          name: authorName,
          url: siteConfig.url,
        },
      ],
      creator: authorName,
      publisher: "IslandTrip",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: page.data.title,
        description: page.data.description,
        type: "article",
        url: ogUrl,
        publishedTime: page.data.date,
        authors: [authorName],
        tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: page.data.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: page.data.title,
        description: page.data.description,
        images: [ogImage],
        creator: "@islandtrip",
        site: "@islandtrip",
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}
