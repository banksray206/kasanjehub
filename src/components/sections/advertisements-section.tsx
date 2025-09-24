'use client';

import { useState, useEffect } from 'react';
import { fetchAdvertisements } from '@/app/advertisements/actions';

export default function AdvertisementsSection() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAds() {
      try {
        const data = await fetchAdvertisements();
        setAds(data || []);
      } catch {
        setAds([]);
      } finally {
        setLoading(false);
      }
    }
    loadAds();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
      {loading ? (
        <div>Loading advertisements...</div>
      ) : ads.length === 0 ? (
        <div>No advertisements found.</div>
      ) : (
        ads.map(ad => (
          <div key={ad.id} className="border rounded p-4 mb-4">
            <h3 className="font-semibold">{ad.title}</h3>
            <p>{ad.description}</p>
            {ad.image_url && (
              <img src={ad.image_url} alt={ad.title} className="mt-2 rounded w-full max-h-64 object-cover" />
            )}
            <div className="text-xs text-muted-foreground mt-2">
              Posted on {ad.created_date}
            </div>
          </div>
        ))
      )}
    </div>
  );
}