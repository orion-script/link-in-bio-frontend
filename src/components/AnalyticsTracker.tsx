'use client';

import { useEffect } from 'react';

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function AnalyticsTracker({ username }: { username: string }) {
  useEffect(() => {
    // We send a POST request to track a page view
    fetch(`${BaseUrl}/analytics/view/${username}`, { method: 'POST' }).catch(console.error);
  }, [username]);

  return null;
}
