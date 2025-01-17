import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import { Metadata } from 'next'; // Import Metadata

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.slug, // No need for .params
  }));
}

// Type for the expected params structure
type Params = {
  slug: string;
};

// Type for the page props
interface PageProps {
  params: Params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostData(params.slug);

  return {
    title: post.title,
    description: post.excerpt, // Add description for better SEO
  };
}

export default async function Post({ params }: PageProps) {
  const post = getPostData(params.slug);
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex justify-between items-center mb-8 text-gray-600">
        <span>{post.category}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <div 
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
    </article>
  );
}