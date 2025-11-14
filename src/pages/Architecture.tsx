import React from "react";
import { Button } from "@/subframe/components/Button";
import { Accordion } from "@/subframe/components/Accordion";
import { FeatherArrowRight, FeatherCheck } from "@subframe/core";

function Architecture() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-default-background">
      {/* Navbar */}
      <div className="w-full border-b border-neutral-border bg-white sticky top-0 z-50">
        <div className="flex w-full max-w-[1280px] mx-auto flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex h-12 flex-col items-start justify-center gap-2">
            <a href="/">
              <img
                className="h-6 flex-none object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/#what-is-caboo" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              How It Works
            </a>
            <a href="/#pricing" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Pricing
            </a>
            <a href="/#faq" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/privacy" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
              Privacy
            </a>
            <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1">
              <Button onClick={() => window.location.href = '/#pricing'}>
                Start for free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Content */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="font-['Season_Mix_TRIAL'] text-[56px] font-[400] leading-[60px] text-neutral-900 mb-6">
            Technical Architecture
          </h1>
          <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 mb-16 max-w-[800px]">
            Caboo is a multi-tenant SaaS platform built on Bird's WhatsApp Business Platform.
            This document outlines our technical architecture, security measures, and scalability approach.
          </p>

          <div className="space-y-16">
            {/* System Overview */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                System Overview
              </h2>

              <div className="bg-neutral-50 rounded-2xl p-10 mb-8">
                <h3 className="font-['Geist'] text-[20px] font-medium text-neutral-900 mb-6">
                  Platform Purpose
                </h3>
                <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-6">
                  Caboo provides automated WhatsApp booking management for South African restaurants.
                  Each restaurant maintains their existing WhatsApp Business number while gaining intelligent
                  automation for booking requests, confirmations, and reminders.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Target Market</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">South African restaurants (100-10,000 venues)</p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Message Volume</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">20,000-500,000 messages/month at scale</p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Architecture</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">Multi-tenant, workspace-based isolation</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Multi-Tenant Architecture */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Multi-Tenant Architecture
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-4">
                    Bird Integration Model
                  </h3>
                  <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-6">
                    We utilize Bird's workspace architecture to provide complete data isolation between restaurants:
                  </p>

                  <div className="bg-neutral-50 rounded-2xl p-8 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                          One Bird Organization (Caboo)
                        </p>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          Master account with API credentials and ISV status
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                          Multiple Bird Workspaces (One per Restaurant)
                        </p>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          Programmatically created workspaces providing complete data isolation
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                          WhatsApp Channels per Workspace
                        </p>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          Each restaurant's WhatsApp number connected via Meta's Embedded Signup flow
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium">4</span>
                      </div>
                      <div>
                        <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-2">
                          Single Webhook Handler
                        </p>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          Centralized endpoint routing messages to restaurant-specific logic based on channel ID
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-4">
                    Data Isolation & Security
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border border-neutral-200 rounded-xl p-6">
                      <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                        Workspace-Level Isolation
                      </p>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Each restaurant operates in a separate Bird workspace. Restaurant A cannot access
                        Restaurant B's messages, contacts, or data. Enforced at the Bird platform level.
                      </p>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-xl p-6">
                      <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                        Application-Level Security
                      </p>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Restaurant IDs mapped to workspace IDs in our database. API authentication ensures
                        restaurants only access their own data through our application layer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Stack */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Technical Stack
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                      Backend Infrastructure
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Node.js / TypeScript</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">API server and webhook handler</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">PostgreSQL</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Primary database for restaurants, bookings, conversations</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Redis</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Conversation state management and caching</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Railway / Render</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Cloud hosting and deployment</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                      Frontend
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">React + TypeScript</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Landing page and restaurant dashboard</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Tailwind CSS + Subframe</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">UI components and design system</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Vercel</p>
                          <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Static site hosting and CDN</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                    Integration & Communication
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Bird WhatsApp Business Platform</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Message delivery, channel management, workspace orchestration</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Meta Embedded Signup</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">OAuth flow for restaurant WhatsApp connection</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Webhook Infrastructure</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">Express.js endpoint handling inbound messages from Bird</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">State Machine</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">JSON-configured conversation flows, version controlled</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Message Flow */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Message Flow Architecture
              </h2>

              <div className="bg-neutral-50 rounded-2xl p-10">
                <h3 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-8">
                  Inbound Message Processing
                </h3>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 1: Customer → WhatsApp</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Customer sends message to restaurant's WhatsApp Business number
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 2: Meta → Bird</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Meta receives message, routes to Bird platform based on phone number registration
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 3: Bird → Caboo Webhook</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Bird sends webhook to our endpoint with message payload and channel ID
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 4: Channel ID → Restaurant Mapping</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      We identify which restaurant based on channel ID, load restaurant-specific configuration
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 5: State Machine Processing</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Load conversation state from Redis, process through restaurant's flow configuration, update state
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 6: Response Generation</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      Generate appropriate response based on state, send back through Bird API to customer
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-brand-600">
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Step 7: Restaurant Notification</p>
                    <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      When booking complete, send notification to restaurant owner's WhatsApp for confirmation
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Database Schema */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Data Architecture
              </h2>

              <div className="space-y-6">
                <Accordion
                  trigger={
                    <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                      <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                        Core Database Schema
                      </span>
                      <FeatherArrowRight className="text-neutral-400" size={24} />
                    </div>
                  }
                >
                  <div className="py-6">
                    <div className="bg-neutral-900 rounded-xl p-6 overflow-x-auto">
                      <pre className="font-mono text-[13px] text-neutral-100">
{`restaurants
├── id (UUID, primary key)
├── name (TEXT)
├── whatsapp_number (TEXT, unique)
├── bird_workspace_id (TEXT, unique)
├── bird_channel_id (TEXT, unique)
├── settings (JSONB)
├── active (BOOLEAN)
└── created_at (TIMESTAMP)

conversations
├── id (UUID, primary key)
├── restaurant_id (UUID, foreign key)
├── customer_phone (TEXT)
├── bird_conversation_id (TEXT)
├── state (TEXT)
├── context (JSONB)
├── completed (BOOLEAN)
└── created_at (TIMESTAMP)

bookings
├── id (UUID, primary key)
├── restaurant_id (UUID, foreign key)
├── conversation_id (UUID, foreign key)
├── customer_name (TEXT)
├── customer_phone (TEXT)
├── party_size (INTEGER)
├── booking_datetime (TIMESTAMP)
├── status (TEXT)
├── special_requests (TEXT)
└── created_at (TIMESTAMP)

conversation_events
├── id (UUID, primary key)
├── conversation_id (UUID, foreign key)
├── message_type (TEXT)
├── message_content (TEXT)
├── flow_node (TEXT)
├── parse_success (BOOLEAN)
└── timestamp (TIMESTAMP)`}
                      </pre>
                    </div>
                  </div>
                </Accordion>

                <Accordion
                  trigger={
                    <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                      <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                        Conversation State Management
                      </span>
                      <FeatherArrowRight className="text-neutral-400" size={24} />
                    </div>
                  }
                >
                  <div className="py-6">
                    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-6">
                      Conversation states stored in Redis with TTL for performance. Backed by PostgreSQL for persistence.
                    </p>
                    <div className="bg-neutral-50 rounded-xl p-6">
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-4">State structure:</p>
                      <div className="bg-white rounded-lg p-4 font-mono text-[13px] text-neutral-700">
{`{
  "restaurant_id": "uuid",
  "customer_phone": "+27821234567",
  "current_step": "ASK_TIME",
  "collected_data": {
    "party_size": 4,
    "date": "2024-11-15"
  },
  "last_updated": "timestamp",
  "ttl": 3600
}`}
                      </div>
                    </div>
                  </div>
                </Accordion>

                <Accordion
                  trigger={
                    <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
                      <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
                        Flow Configuration System
                      </span>
                      <FeatherArrowRight className="text-neutral-400" size={24} />
                    </div>
                  }
                >
                  <div className="py-6">
                    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-6">
                      Conversation flows stored as JSON in version control. Enables rapid iteration and A/B testing
                      without code changes. One flow serves all restaurants with configuration overrides.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Benefits:</p>
                        <ul className="space-y-1 font-['Geist'] text-[13px] text-neutral-600">
                          <li>• Version controlled flows</li>
                          <li>• A/B testing capability</li>
                          <li>• Gradual rollouts (10% → 100%)</li>
                          <li>• Restaurant-specific overrides</li>
                        </ul>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-2">Analytics:</p>
                        <ul className="space-y-1 font-['Geist'] text-[13px] text-neutral-600">
                          <li>• Track drop-off points</li>
                          <li>• Measure completion rates</li>
                          <li>• Identify parse failures</li>
                          <li>• Weekly refinement cycle</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
            </section>

            {/* Scalability */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Scalability & Performance
              </h2>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                    Current Capacity
                  </h3>
                  <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    <li>• 100 restaurants</li>
                    <li>• 20,000 messages/month</li>
                    <li>• 5,000 bookings/month</li>
                    <li>• 99.5% uptime target</li>
                  </ul>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                    6-Month Target
                  </h3>
                  <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    <li>• 500 restaurants</li>
                    <li>• 150,000 messages/month</li>
                    <li>• 30,000 bookings/month</li>
                    <li>• 99.9% uptime</li>
                  </ul>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                    12-Month Vision
                  </h3>
                  <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    <li>• 2,000+ restaurants</li>
                    <li>• 500,000+ messages/month</li>
                    <li>• 100,000+ bookings/month</li>
                    <li>• Multi-region expansion</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-neutral-50 rounded-2xl p-8">
                <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                  Scaling Strategy
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">Horizontal Scaling</p>
                    <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      <li>• Stateless API servers (scale indefinitely)</li>
                      <li>• Load balancer distribution</li>
                      <li>• Database read replicas</li>
                      <li>• Redis cluster for state management</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">Performance Optimization</p>
                    <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                      <li>• Message queue for webhook processing</li>
                      <li>• Rate limiting per Bird requirements</li>
                      <li>• Caching for restaurant configs</li>
                      <li>• Async notification delivery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Security & Compliance */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Security & Compliance
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-neutral-200 rounded-xl p-8">
                  <h3 className="font-['Geist'] text-[20px] font-medium text-neutral-900 mb-6">
                    POPIA Compliance (South African Data Protection)
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">Data Processing</p>
                      <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        <li>• Restaurants are data controllers</li>
                        <li>• Caboo is data processor</li>
                        <li>• Clear consent mechanisms</li>
                        <li>• Customer opt-out capabilities</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">Data Rights</p>
                      <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        <li>• Access request handling</li>
                        <li>• Data deletion on request</li>
                        <li>• Retention policies enforced</li>
                        <li>• Audit logging</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-8">
                  <h3 className="font-['Geist'] text-[20px] font-medium text-neutral-900 mb-6">
                    Technical Security Measures
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">Data Protection</p>
                      <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        <li>• TLS 1.3 for all connections</li>
                        <li>• Database encryption at rest</li>
                        <li>• Encrypted backups (daily)</li>
                        <li>• PII masking in logs</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-['Geist'] text-[14px] font-medium text-neutral-900 mb-3">Access Control</p>
                      <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        <li>• JWT authentication</li>
                        <li>• Role-based access (RBAC)</li>
                        <li>• Webhook signature verification</li>
                        <li>• API rate limiting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-8">
                  <h3 className="font-['Geist'] text-[20px] font-medium text-neutral-900 mb-6">
                    WhatsApp Policy Compliance
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Template Management</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                          All reminder messages use pre-approved templates. Utility category for reminders,
                          Marketing category (with opt-in) for promotional messages.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Quality Rating Monitoring</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                          Track quality scores per workspace. Alerts if rating drops below thresholds.
                          Proactive intervention to prevent messaging limits.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FeatherCheck className="text-brand-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-['Geist'] text-[14px] font-medium text-neutral-900">Opt-Out Mechanisms</p>
                        <p className="font-['Geist'] text-[13px] font-[300] text-neutral-600">
                          Customers can opt-out of reminders anytime. Automatic handling of "STOP" keywords.
                          Compliance with WhatsApp Commerce Policy.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Monitoring & Support */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                Monitoring & Support
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-xl p-8">
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-6">
                    System Monitoring
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          Webhook latency tracking (target: &lt;200ms)
                        </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Message delivery success rates
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Database query performance
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Error rate alerts (PagerDuty)
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        WhatsApp quality score tracking
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-xl p-8">
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-6">
                    Support Infrastructure
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Restaurant-facing: WhatsApp support channel
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Email support: support@getcaboo.com
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                        <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                          Incident response: &lt;4 hour SLA
                        </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Knowledge base for self-service
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600">•</span>
                      <p className="font-['Geist'] text-[14px] font-[300] text-neutral-600">
                        Business hours: Mon-Fri, 9am-5pm SAST
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-['Geist'] text-[18px] font-medium text-neutral-900 mb-4">
                    Disaster Recovery
                  </h3>
                  <ul className="space-y-2 font-['Geist'] text-[14px] font-[300] text-neutral-600">
                    <li>• Daily automated backups</li>
                    <li>• Point-in-time recovery</li>
                    <li>• Multi-region redundancy</li>
                    <li>• 4-hour RTO target</li>
                    <li>• Incident playbooks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ISV Commitment */}
            <section>
              <h2 className="font-['Season_Mix_TRIAL'] text-[40px] font-[400] text-neutral-900 mb-8">
                ISV Program Commitment
              </h2>

              <div className="bg-brand-50 rounded-2xl p-10">
                <h3 className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900 mb-6">
                  Why Caboo is Ready for Bird ISV Status
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                      Proven Business Model
                    </p>
                    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                      Caboo addresses a clear, validated problem in the South African restaurant market.
                      Our R599/month pricing is sustainable, our unit economics work, and our target market
                      (10,000+ restaurants in SA) provides significant growth potential for both Caboo and Bird.
                    </p>
                  </div>

                  <div>
                    <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                      Technical Competence
                    </p>
                    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                      We understand multi-tenant architecture, conversation state management, webhook reliability,
                      and WhatsApp policy compliance. Our team has experience building scalable SaaS platforms
                      and we're committed to following Bird's best practices.
                    </p>
                  </div>

                  <div>
                    <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                      Growth Trajectory
                    </p>
                    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                      Starting with 100 restaurants in month 1, scaling to 500 by month 6, and 2,000+ by month 12.
                      This represents significant message volume growth for Bird while maintaining quality and compliance.
                      We're building for long-term partnership, not short-term arbitrage.
                    </p>
                  </div>

                  <div>
                    <p className="font-['Geist'] text-[16px] font-medium text-neutral-900 mb-3">
                      Compliance First
                    </p>
                    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600">
                      POPIA-compliant privacy policy, proper data handling, template approval processes,
                      quality rating monitoring, and customer opt-out mechanisms. We take compliance seriously
                      because it protects both our customers and our Bird partnership.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact for Technical Review */}
            <section className="bg-neutral-50 rounded-2xl p-12 text-center">
              <h2 className="font-['Season_Mix_TRIAL'] text-[32px] font-[400] text-neutral-900 mb-6">
                Technical Review Available
              </h2>
              <p className="font-['Geist'] text-[18px] font-[300] leading-[30px] text-neutral-600 mb-8 max-w-[700px] mx-auto">
                We're happy to provide additional technical documentation, architecture diagrams,
                code samples, or answer questions about our implementation approach.
              </p>
              <p className="font-['Geist'] text-[16px] font-[300] text-neutral-600">
                Contact: <a href="mailto:support@caboo.design" className="text-brand-600 hover:underline font-medium">support@caboo.design</a>
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-16 px-6 bg-neutral-700">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <img
                className="h-6 flex-none object-cover mb-4 brightness-0 invert"
                src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                alt="Caboo Logo"
              />
              <p className="font-['Geist'] text-[14px] font-[300] leading-[22px] text-neutral-300 max-w-[400px]">
                Automated WhatsApp booking management for South African restaurants.
                Never miss a booking. Cut no-shows by 91%.
              </p>
            </div>

            <div>
              <h3 className="font-['Geist'] text-[14px] font-medium text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="/#what-is-caboo" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">How It Works</a></li>
                <li><a href="/#pricing" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Pricing</a></li>
                <li><a href="/#faq" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Geist'] text-[14px] font-medium text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">About</a></li>
                <li><a href="/contact" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Contact</a></li>
                <li><a href="/privacy" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Privacy Policy</a></li>
                <li><a href="/terms" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-600">
            <p className="font-['Geist'] text-[14px] font-[300] text-neutral-400 text-center mb-2">
              © 2025 Caboo Intelligence (Pty) Ltd • Registration: 2025/868763/07
            </p>
            <p className="font-['Geist'] text-[12px] font-[300] text-neutral-500 text-center">
              Not affiliated with WhatsApp or Meta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Architecture;
