'use client';

import { ArrowLeft, Ambulance, Flame, Shield, Hospital, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface EmergencyPageProps {
  onBack: () => void;
}

export function EmergencyPage({ onBack }: EmergencyPageProps) {
  const emergencyContacts = [
    {
      id: 1,
      icon: Ambulance,
      title: 'Ambulance',
      number: '108',
      description: 'Emergency ambulance service',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      id: 2,
      icon: Flame,
      title: 'Fire Service',
      number: '101',
      description: 'Fire emergency service',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      id: 3,
      icon: Shield,
      title: 'Police',
      number: '100',
      description: 'Police emergency service',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 4,
      icon: Hospital,
      title: 'Kumta Government Hospital',
      number: '+91 8386 234567',
      description: '24/7 emergency care',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 5,
      icon: Hospital,
      title: 'Private Hospital',
      number: '+91 8386 234890',
      description: 'Multi-specialty hospital',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1>Emergency Services</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 pb-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">
              In case of emergency, call the appropriate service immediately. Keep calm and provide clear information about your location.
            </p>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <Card key={contact.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-full ${contact.bgColor}`}>
                      <Icon className={`w-6 h-6 ${contact.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3>{contact.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{contact.description}</p>
                      <p className="mt-2">{contact.number}</p>
                    </div>
                    <Button
                      size="sm"
                      className={`${contact.bgColor} ${contact.iconColor} hover:opacity-80`}
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-4 mt-6 bg-blue-50 border-blue-200">
            <h3 className="mb-2">Important Tips</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Stay calm during emergencies</li>
              <li>Provide clear location details</li>
              <li>Follow dispatcher instructions</li>
              <li>Keep phone lines clear after calling</li>
            </ul>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
