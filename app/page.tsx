import Link from 'next/link';
import { ArrowRight, Wallet, TrendingUp, Users, ArrowUpRight, Zap, Gift, Bell } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LandingHeader from '@/components/layout/LandingHeader';
import LandingFooter from '@/components/layout/LandingFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />

      {/* Hero Section - BaseClub Style */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        {/* Background gradient with blue tone */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-12 py-12 md:py-20">
            {/* Main Headline - Bold & Huge */}
            <div className="space-y-6">
              <h1 className="font-outfit text-7xl md:text-9xl font-black tracking-tighter leading-none">
                <span className="block text-white">#INVEST</span>
                <span className="block text-white">IN THE</span>
                <span className="block text-primary">FUTURE</span>
              </h1>

              {/* Decorative arrows */}
              <div className="flex items-center justify-center gap-8">
                <div className="w-24 h-24 rounded-full bg-primary rotate-12 flex items-center justify-center">
                  <ArrowUpRight className="w-12 h-12 text-black" strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-2xl md:text-3xl font-semibold text-text-secondary max-w-3xl mx-auto">
              One platform for stocks, crypto & DeFi.<br />
              Built for <span className="text-primary">young wealth builders</span>.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/signup">
                <Button variant="primary" size="lg" className="text-xl px-12 py-6 font-bold">
                  GET STARTED
                </Button>
              </Link>
            </div>

            {/* Stats badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
              <div className="bg-primary text-black px-6 py-3 rounded-full font-bold">
                10,000+ INVESTORS
              </div>
              <div className="bg-accent-blue text-white px-6 py-3 rounded-full font-bold">
                $5M+ TRADED
              </div>
              <div className="bg-white text-black px-6 py-3 rounded-full font-bold">
                ZERO FEES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - BaseClub Style */}
      <section className="py-20 px-4 bg-background-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-5xl md:text-7xl font-black mb-6">
              <span className="text-white">HOW IT</span>{' '}
              <span className="text-primary">WORKS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="bg-accent-blue/10 border-2 border-accent-blue p-8 text-center">
                <div className="w-20 h-20 rounded-3xl bg-accent-blue text-white flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <div className="bg-accent-blue text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                  STEP 1
                </div>
                <h3 className="text-2xl font-black mb-4">CREATE WALLET</h3>
                <p className="text-lg text-text-secondary">
                  Sign up and get instant access to your USDC wallet. No KYC required to start.
                </p>
              </Card>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-primary" strokeWidth={3} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <Card className="bg-primary/10 border-2 border-primary p-8 text-center">
                <div className="w-20 h-20 rounded-3xl bg-primary text-black flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <div className="bg-primary text-black text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                  STEP 2
                </div>
                <h3 className="text-2xl font-black mb-4">CHOOSE ASSETS</h3>
                <p className="text-lg text-text-secondary">
                  Browse Nigerian stocks, US stocks, crypto, and DeFi protocols. All in one place.
                </p>
              </Card>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-primary" strokeWidth={3} />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <Card className="bg-accent-green/10 border-2 border-accent-green p-8 text-center">
                <div className="w-20 h-20 rounded-3xl bg-accent-green text-black flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <div className="bg-accent-green text-black text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                  STEP 3
                </div>
                <h3 className="text-2xl font-black mb-4">START INVESTING</h3>
                <p className="text-lg text-text-secondary">
                  Buy stocks and crypto with as little as $10. Watch your portfolio grow.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-20 px-4 bg-background-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-5xl md:text-7xl font-black mb-6">
              <span className="text-white">WHAT YOU CAN</span>{' '}
              <span className="text-primary">INVEST IN</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'NIGERIAN STOCKS',
                desc: 'MTN, Dangote, Zenith Bank & more',
                color: 'accent-blue',
                amount: '₦50',
                subtext: 'minimum'
              },
              {
                name: 'US STOCKS & ETFs',
                desc: 'Apple, Tesla, S&P 500 & 5,000+',
                color: 'accent-purple',
                amount: '$1',
                subtext: 'per share'
              },
              {
                name: 'CRYPTOCURRENCY',
                desc: 'Bitcoin, Ethereum & altcoins',
                color: 'accent-orange',
                amount: '$10',
                subtext: 'to start'
              },
              {
                name: 'DeFi YIELDS',
                desc: 'Earn 4-8% APY on stablecoins',
                color: 'accent-green',
                amount: '8%',
                subtext: 'APY'
              },
            ].map((item) => (
              <Card key={item.name} hover className="p-8 bg-background-hover border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black mb-2">{item.name}</h3>
                    <p className="text-text-secondary">{item.desc}</p>
                  </div>
                  <div className={`text-${item.color} text-right`}>
                    <div className="text-3xl font-black">{item.amount}</div>
                    <div className="text-sm text-text-tertiary">{item.subtext}</div>
                  </div>
                </div>
                <div className={`h-2 w-full rounded-full bg-${item.color}/20`}>
                  <div className={`h-full w-3/4 rounded-full bg-${item.color}`} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-primary/5 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-primary/20 text-primary px-6 py-2 rounded-full font-bold text-sm tracking-wide">
              LAUNCHING SOON
            </span>
          </div>

          <h2 className="font-outfit text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">JOIN THE</span>{' '}
            <span className="text-primary">WAITLIST</span>
          </h2>

          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Be among the first to experience the future of investing. Get early access and exclusive benefits.
          </p>

          <Link href="/waitlist">
            <Button variant="primary" size="lg" className="text-xl px-12 py-6 font-bold shadow-glow">
              JOIN WAITLIST
              <ArrowRight className="ml-2 w-6 h-6" strokeWidth={3} />
            </Button>
          </Link>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-background-card border border-border-primary rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-bold mb-2">Early Access</h3>
              <p className="text-text-secondary text-sm">
                Get priority access before public launch
              </p>
            </div>
            <div className="bg-background-card border border-border-primary rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-bold mb-2">Exclusive Perks</h3>
              <p className="text-text-secondary text-sm">
                Special bonuses for early adopters
              </p>
            </div>
            <div className="bg-background-card border border-border-primary rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-bold mb-2">Launch Updates</h3>
              <p className="text-text-secondary text-sm">
                Stay informed about our progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-background-card">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="w-32 h-32 rounded-full bg-primary animate-pulse-slow flex items-center justify-center">
              <span className="text-6xl">💰</span>
            </div>
          </div>

          <h2 className="font-outfit text-5xl md:text-8xl font-black mb-8">
            <span className="text-white">START</span>{' '}
            <span className="text-primary">INVESTING</span>
            <br />
            <span className="text-white">TODAY</span>
          </h2>

          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Join <span className="text-primary font-bold">10,000+</span> smart investors building wealth with STACKA
          </p>

          <Link href="/signup">
            <Button variant="primary" size="lg" className="text-2xl px-16 py-8 font-black shadow-glow-lg">
              GET STARTED FREE
              <ArrowRight className="ml-3 w-8 h-8" strokeWidth={3} />
            </Button>
          </Link>

          <p className="text-text-tertiary mt-8">
            No credit card required • Start with just $10
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
