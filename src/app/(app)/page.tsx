'use client'

import * as React from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import messages from '@/messages.json' // ✅ Adjust path if needed

// ✅ Define TypeScript type (optional but recommended)
interface Message {
  title: string
  content: string
  recieved: string
}

const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      {/* Header Section */}
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          True Feedback - Where your identity remains a secret.
        </p>
      </section>
      <section className="mb-8 md:mb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Sample Anonymous Messages
      <ScrollArea className="w-full max-w-4xl rounded-md border border-gray-300 bg-gray-800">
      <div className="flex w-max space-x-4 p-4">
        {messages.map((msg: Message, index: number) => (
          <article
            key={index}
            className="shrink-0 w-72 rounded-lg bg-gray-700 p-4 shadow-md hover:bg-gray-600 transition-colors duration-200"
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {msg.title}
            </h3>
            <p className="text-sm text-gray-200 mb-3 line-clamp-4">
              {msg.content}
            </p>
            <span className="text-xs text-gray-400">
              ⏳ {msg.recieved}
            </span>
          </article>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="bg-gray-700" />
    </ScrollArea>
        </h2>
        <p className="text-base md:text-lg">
          Experience the power of honest feedback without revealing your identity.
        </p>
      </section>
      {/* Call to Action Button */}
      <section className="text-center">
        <a
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Get Started Now
        </a>
      </section>
    </main>
  )
}

export default Home;

