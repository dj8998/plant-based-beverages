
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Indian Manufacturing Standards for Export",
    excerpt: "A comprehensive guide to the quality standards and certifications required for exporting products from India.",
    date: "May 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600",
    author: "Rahul Sharma"
  },
  {
    id: 2,
    title: "Sustainable Sourcing: The Future of Home Furnishings",
    excerpt: "Explore how sustainable materials and ethical production are shaping the future of India's home furnishing industry.",
    date: "May 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    author: "Priya Patel"
  },
  {
    id: 3,
    title: "Navigating Supply Chain Challenges in 2025",
    excerpt: "Insights on how to overcome common supply chain disruptions and delays when working with overseas manufacturers.",
    date: "May 05, 2025",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600",
    author: "David Singh"
  },
  {
    id: 4,
    title: "Trending Handicrafts from Rural India",
    excerpt: "Discover unique handicraft products from rural artisans that are gaining popularity in international markets.",
    date: "April 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    author: "Anita Desai"
  },
  {
    id: 5,
    title: "How to Verify Manufacturer Credentials",
    excerpt: "A step-by-step guide to vetting potential manufacturing partners and ensuring they meet your quality requirements.",
    date: "April 22, 2025",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=600",
    author: "Michael Rodriguez"
  }
];

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Industry Insights & Updates</h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Stay updated with the latest trends, insights, and best practices in the manufacturing industry. 
            Our experts share valuable information to help you make informed decisions for your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.date} • {post.author}</span>
                  <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">Read more</Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p className="mb-4 text-gray-600">Get the latest industry insights delivered directly to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded flex-grow"
              />
              <Button className="bg-black text-white hover:bg-gray-800">Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
