"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import messages from "../messages.json";

const page = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-start px-4 md:px-24 py-12">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Conversation
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Mystry Message - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel Section */}
        <section className="mb-16">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent className="flex gap-4">
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3"
                >
                  <div className="p-4">
                    <Card className="shadow-lg rounded-lg bg-white border border-gray-200">
                      <CardContent className="p-6">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {message.title}
                        </h3>
                        {/* Content */}
                        <p className="text-gray-600 text-base mb-4">
                          {message.content}
                        </p>
                        {/* Time */}
                        <span className="text-sm text-gray-500">
                          {new Date(message.received_time).toLocaleString()}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 cursor-pointer" />
            <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 cursor-pointer" />
          </Carousel>
        </section>

        {/* Features Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <ul className="space-y-4 text-gray-600 text-base">
            <li>🔒 Complete Anonymity</li>
            <li>📅 Schedule Messages Easily</li>
            <li>🌐 Seamless Connectivity</li>
            <li>🛡️ End-to-End Encryption for Security</li>
          </ul>
        </section>

        {/* How It Works Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-600 text-base">
            <li>Sign Up or Log In to the platform.</li>
            <li>Create a message or join a chat anonymously.</li>
            <li>Share your thoughts securely with no identity risk.</li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-4 md:p-6 mt-auto">
        <div className="container mx-auto text-center flex flex-col items-center justify-center">
          {/* Left Section: Company Info */}
          <div className="mb-4">
            <p className="text-sm">
              © {new Date().getFullYear()} mystryMessage. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              Created with ❤️ by{" "}
              <a
                href="https://yourwebsite.com"
                className="underline text-blue-400"
              >
                MystryMessage.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default page;
