'use client';

import { NammaKumtaLogo } from './NammaKumtaLogo';
import { NammaKumtaLogoSVG } from './NammaKumtaLogoSVG';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

/**
 * LogoShowcase Component
 * 
 * Demo component to showcase both logo variations and all sizes.
 * Not meant for production - just for testing and reference.
 * 
 * To use: Import and add to any page temporarily
 */
export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 dark:text-white">🎨 Namma Kumta Logo Showcase</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Demonstrating all logo variations and sizes
          </p>
        </div>

        {/* Icon-Based Logo */}
        <div>
          <h2 className="text-2xl mb-6 dark:text-white flex items-center gap-3">
            Icon-Based Logo
            <Badge className="bg-blue-500">NammaKumtaLogo</Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Size: sm */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: sm</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compact headers, buttons
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogo size="sm" />
                <NammaKumtaLogo size="sm" showTagline={true} />
              </div>
            </Card>

            {/* Size: md */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: md (default)</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Navigation, standard headers
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogo size="md" />
                <NammaKumtaLogo size="md" showTagline={true} />
              </div>
            </Card>

            {/* Size: lg */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: lg</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Main pages, hero sections
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogo size="lg" />
                <NammaKumtaLogo size="lg" showTagline={true} />
              </div>
            </Card>

            {/* Size: xl */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: xl</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Login, splash screens
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogo size="xl" />
                <NammaKumtaLogo size="xl" showTagline={true} />
              </div>
            </Card>
          </div>
        </div>

        {/* SVG Logo */}
        <div>
          <h2 className="text-2xl mb-6 dark:text-white flex items-center gap-3">
            Custom SVG Logo
            <Badge className="bg-purple-500">NammaKumtaLogoSVG</Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Size: sm */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: sm</Badge>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogoSVG size="sm" />
                <NammaKumtaLogoSVG size="sm" showTagline={true} />
              </div>
            </Card>

            {/* Size: md */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: md (default)</Badge>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogoSVG size="md" />
                <NammaKumtaLogoSVG size="md" showTagline={true} />
              </div>
            </Card>

            {/* Size: lg */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: lg</Badge>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogoSVG size="lg" />
                <NammaKumtaLogoSVG size="lg" showTagline={true} />
              </div>
            </Card>

            {/* Size: xl */}
            <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Size: xl</Badge>
              </div>
              <div className="flex flex-col gap-4">
                <NammaKumtaLogoSVG size="xl" />
                <NammaKumtaLogoSVG size="xl" showTagline={true} />
              </div>
            </Card>
          </div>
        </div>

        {/* Dark Background Examples */}
        <div>
          <h2 className="text-2xl mb-6 dark:text-white">On Dark Backgrounds</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-gradient-to-br from-blue-600 to-purple-700 border-0">
              <NammaKumtaLogo size="lg" showTagline={true} />
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800">
              <NammaKumtaLogoSVG size="lg" showTagline={true} />
            </Card>
          </div>
        </div>

        {/* Light Background Examples */}
        <div>
          <h2 className="text-2xl mb-6 dark:text-white">On Light Backgrounds</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-white border-gray-200">
              <NammaKumtaLogo size="lg" showTagline={true} />
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <NammaKumtaLogoSVG size="lg" showTagline={true} />
            </Card>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h2 className="text-2xl mb-6 dark:text-white">Real-World Usage Examples</h2>
          
          <div className="space-y-6">
            {/* Header Example */}
            <Card className="dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <NammaKumtaLogo size="md" />
                <div className="flex gap-2">
                  <Badge>Home</Badge>
                  <Badge variant="outline">Explore</Badge>
                  <Badge variant="outline">Profile</Badge>
                </div>
              </div>
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Header Navigation Example
              </div>
            </Card>

            {/* Hero Example */}
            <Card className="dark:bg-gray-900 dark:border-gray-800">
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <NammaKumtaLogoSVG size="xl" showTagline={true} className="mb-8" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Welcome to your local community guide
                </p>
                <Badge className="bg-blue-500">Get Started</Badge>
              </div>
            </Card>

            {/* Footer Example */}
            <Card className="dark:bg-gray-900 dark:border-gray-800">
              <div className="flex flex-col items-center justify-center p-8 text-center border-t dark:border-gray-800">
                <NammaKumtaLogo size="sm" showTagline={true} className="mb-4" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  © 2025 Namma Kumta. All rights reserved.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Technical Info */}
        <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
          <h2 className="text-xl mb-4 dark:text-white">📋 Technical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="mb-2 dark:text-white">Icon-Based Logo</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Uses Lucide React icons</li>
                <li>• Palm tree + Location pin</li>
                <li>• ~2KB bundle size</li>
                <li>• Hover scale animation</li>
                <li>• Pulsing glow effect</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 dark:text-white">SVG Logo</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Custom palm tree SVG</li>
                <li>• Professional gradients</li>
                <li>• ~3KB bundle size</li>
                <li>• Detailed artwork</li>
                <li>• Location badge accent</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>💡 Tip:</strong> Both logos support dark mode, multi-language, 
              and responsive sizing. Choose Icon-Based for speed, SVG for premium look.
            </p>
          </div>
        </Card>

      </div>
    </div>
  );
}
