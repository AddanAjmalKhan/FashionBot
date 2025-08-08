'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Upload, Sparkles, Shirt, Palette, Home, ShoppingBag, TrendingUp, Camera, Gamepad2 } from 'lucide-react'

type Mode = 'professional' | 'fun'
type Category = 'outfit-suggestions' | 'color-matching' | 'wardrobe-tips' | 'shopping' | 'trends' | 'ai-stylist' | 'fun-mode' | null

export default function FashionBot() {
  const [mode, setMode] = useState<Mode>('professional')
  const [selectedCategory, setSelectedCategory] = useState<Category>(null)
  const [userInput, setUserInput] = useState('')
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'bot', message: string}>>([])

  const categories = [
    {
      id: 'outfit-suggestions' as Category,
      title: 'Outfit Suggestions',
      description: 'Perfect looks for any occasion, weather, or mood',
      icon: Shirt,
    },
    {
      id: 'color-matching' as Category,
      title: 'Color & Style Matching',
      description: 'Master the art of coordinating colors and styles',
      icon: Palette,
    },
    {
      id: 'wardrobe-tips' as Category,
      title: 'Wardrobe Organization',
      description: 'Transform your closet into a style sanctuary',
      icon: Home,
    },
    {
      id: 'shopping' as Category,
      title: 'Shopping Recommendations',
      description: 'Best brands, deals, and sustainable fashion finds',
      icon: ShoppingBag,
    },
    {
      id: 'trends' as Category,
      title: 'Fashion Trends & What\'s Hot',
      description: 'Stay ahead with the latest fashion insights',
      icon: TrendingUp,
    },
    {
      id: 'ai-stylist' as Category,
      title: 'AI Stylist',
      description: 'Upload a photo and get personalized outfit ideas',
      icon: Camera,
    },
    {
      id: 'fun-mode' as Category,
      title: 'Fun Mode',
      description: 'Quizzes, celebrity styling, fashion roasts & more',
      icon: Gamepad2,
    }
  ]

  const handleCategorySelect = (categoryId: Category) => {
    setSelectedCategory(categoryId)
    const category = categories.find(c => c.id === categoryId)
    if (category) {
      setConversation([{
        role: 'bot',
        message: `Great choice! Let's explore ${category.title}. What specific help do you need? Feel free to share details about the occasion, your style preferences, or upload a photo if relevant.`
      }])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const newConversation = [
      ...conversation,
      { role: 'user' as const, message: userInput },
      { role: 'bot' as const, message: getBotResponse(userInput, selectedCategory) }
    ]
    
    setConversation(newConversation)
    setUserInput('')
  }

  const getBotResponse = (input: string, category: Category) => {
    const responses = {
      'outfit-suggestions': "I'd love to help with your outfit! To give you the best suggestion, tell me about the occasion, weather, and your preferred style - classic, edgy, boho, or minimalist?",
      'color-matching': "Color coordination is key to great style. Are you working with a specific piece you want to style, or would you like to learn about color theory? What colors do you usually wear?",
      'wardrobe-tips': "Let's organize your wardrobe effectively. Are you looking to declutter, organize by category, or create a capsule wardrobe? What's your main challenge?",
      'shopping': "Smart shopping makes all the difference. Are you looking for specific items, sustainable brands, budget-friendly options, or investment pieces? What's your style and budget?",
      'trends': "Fashion trends are constantly evolving. Are you interested in seasonal trends, specific categories like accessories, or timeless pieces that never go out of style?",
      'ai-stylist': "Ready to analyze your style! Upload your photo and tell me the occasion or vibe you're going for. I'll suggest perfect outfit combinations based on what I see.",
      'fun-mode': "Let's make fashion fun! Want a style quiz to discover your fashion personality, need an honest outfit review, or shall we play style games? What interests you?"
    }

    return responses[category || 'outfit-suggestions'] || "I'm here to help with all your fashion needs. What would you like to explore today?"
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="border-b border-green-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-100" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  FashionBot
                </h1>
                <p className="text-sm text-gray-600">Your Personal Style Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="mode-toggle" className="text-sm font-medium text-gray-700">
                  {mode === 'professional' ? 'Professional' : 'Fun'} Mode
                </Label>
                <Switch
                  id="mode-toggle"
                  checked={mode === 'fun'}
                  onCheckedChange={(checked) => setMode(checked ? 'fun' : 'professional')}
                />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                {mode === 'professional' ? 'Pro' : 'Fun'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          <>
            {/* Welcome Section */}
            <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Professional Fashion Assistance
                </h2>
                <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                  Step into a world where fashion meets intuition. From curated outfit ideas to personalized style guidance, FashionBot is your go-to stylist—ready to transform your wardrobe and elevate your look, one flawless fit at a time.
                </p>
              </div>
              
              {/* Fashion Illustration */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="w-80 h-80">
                  <img 
                    src="/fashion-app-illustration.png" 
                    alt="Person using fashion app on mobile phone"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Card 
                    key={category.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-green-300 border-gray-200 bg-white"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-green-700" />
                        </div>
                        <CardTitle className="text-base sm:text-lg text-gray-900">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-sm">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Start */}
            <Card className="bg-green-800 text-green-50 border-green-700">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-green-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
                    <p className="text-green-100 leading-relaxed">
                      Choose a category above or describe what you need help with. 
                      I'll provide personalized fashion advice tailored to your style and needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => {setSelectedCategory(null); setConversation([])}}
              className="mb-6 border-gray-300 text-gray-700 hover:bg-green-50"
            >
              Back to Categories
            </Button>

            {/* Chat Interface */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-96 flex flex-col border-gray-200">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Sparkles className="w-5 h-5 text-green-700" />
                      Fashion Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-4">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {conversation.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-lg text-sm ${
                            msg.role === 'user' 
                              ? 'bg-green-700 text-green-50' 
                              : 'bg-green-50 text-gray-800'
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Describe what you need help with..."
                        className="flex-1 border-gray-300 focus:border-green-500"
                      />
                      <Button type="submit" size="sm" className="bg-green-700 hover:bg-green-800 text-green-50">
                        Send
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {selectedCategory === 'ai-stylist' && (
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Upload Your Photo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop your photo
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="style-select" className="text-gray-700">Style Preference</Label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-green-500">
                          <SelectValue placeholder="Select your style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="edgy">Edgy</SelectItem>
                          <SelectItem value="boho">Boho</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="romantic">Romantic</SelectItem>
                          <SelectItem value="streetwear">Streetwear</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="occasion-select" className="text-gray-700">Occasion</Label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-green-500">
                          <SelectValue placeholder="What's the occasion?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual Day</SelectItem>
                          <SelectItem value="work">Work/Professional</SelectItem>
                          <SelectItem value="date">Date Night</SelectItem>
                          <SelectItem value="party">Party/Event</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Daily Style Tip</h4>
                    <p className="text-sm text-green-700 leading-relaxed">
                      Mix textures for visual interest. Try pairing a chunky knit with smooth leather or silk with denim for sophisticated contrast.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
