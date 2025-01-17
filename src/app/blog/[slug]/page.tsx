import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define params type as a Promise
type Params = Promise<{ slug: string[] }>;

// Generate static params for blog posts
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    slug: [fileName.replace(/\.md$/, '')]
  }));
}

// Function to get blog post data
async function getBlogPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      html: contentHtml,
      ...matterResult.data
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = params.slug[0];
  const postData = await getBlogPostData(slug);
  
  return {
    title: postData?.title || 'Blog Post',
    description: postData?.excerpt || 'Blog post details'
  };
}

// Blog Post Page Component
export default async function BlogPost({ params }: { params: Params }) {
  // Await the params
  const { slug } = await params;
  
  // Use the first element of the slug array
  const postData = await getBlogPostData(slug[0]);

  if (!postData) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <article>
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        <div className="text-gray-600 mb-6">
          {postData.date && (
            <p>Published on {new Date(postData.date).toLocaleDateString()}</p>
          )}
        </div>
        <div 
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: postData.html }} 
        />
      </article>
    </div>
  );
}
