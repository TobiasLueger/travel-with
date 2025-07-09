import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Driven',
      description: 'Connect with millions of travelers who share your passion for exploration and sustainable travel.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Free & Caring',
      description: 'All rides are offered for free. Our community believes in caring for each other during travels.',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safe & Secure',
      description: 'Verified users, secure communication, and community-driven safety measures keep everyone protected.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Sustainable Travel',
      description: 'Reduce your carbon footprint by sharing rides and using public transport group tickets.',
      color: 'from-orange-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto mt-30 px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Travel-with.de
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            We believe travel is better when shared. Our platform connects people who want to 
            travel together, creating a community of explorers who care for each other and our planet.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                To create a world where every journey is an opportunity to connect, share, and care for one another. 
                We're building a community where travel becomes more sustainable, affordable, and meaningful through 
                the power of human connection.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-4 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-6">
                Travel-with.de was born from a simple observation: many of us travel the same routes, 
                at the same times, often alone. Whether it's a daily commute, a weekend trip, or a 
                journey across the country, there are always others going our way.
              </p>
              <p className="mb-6">
                We started with a vision to connect these travelers, making journeys more social, 
                sustainable, and affordable. What began as a small community in Berlin has grown 
                into a movement of over one million users across Germany and beyond.
              </p>
              <p className="mb-6">
                Today, we're proud to facilitate thousands of shared journeys every day, from 
                carpools and Deutsche Bahn group tickets to bus rides and other creative forms 
                of travel. Each connection made through our platform is a step toward a more 
                connected and sustainable world.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Care & Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in taking care of each other, whether on the road or online. 
                Our community is built on mutual respect and support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every shared ride reduces our collective carbon footprint. 
                Small actions, when multiplied by our community, create big impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Trust & Safety
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Safety is our top priority. We continuously work to ensure 
                our platform remains a trusted space for all travelers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Ready to make your next journey more meaningful? Join millions of travelers 
                who have already discovered the joy of shared adventures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/search"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Find a Ride
                </a>
                <a
                  href="/create-ride"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Offer a Ride
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}