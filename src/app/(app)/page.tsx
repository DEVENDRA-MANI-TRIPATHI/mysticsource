'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "100% Anonymous",
      description: "Your identity remains completely protected"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: "Instant Feedback",
      description: "Get real-time responses from your audience"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Build Community",
      description: "Connect through honest communication"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Mystic Source</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up">
            Share thoughts freely, receive honest feedback, grow authentically.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href ='/sign-up'>
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Get Started
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="text-white bg-white/20 border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Why Choose Mystic Source?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What People Are Saying
          </h2>
          <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Mail className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="text-gray-300 italic mb-4">{message.content}</p>
                          <p className="text-sm text-gray-500">{message.received}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2">Mystic Source</h3>
            <p>Where anonymity meets authenticity</p>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <p>© {new Date().getFullYear()} Mystic Source. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}