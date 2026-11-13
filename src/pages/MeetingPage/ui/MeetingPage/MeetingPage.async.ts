import { FC, lazy } from 'react';

export const MeetingPageAsync = lazy<FC>(() => import('./MeetingPage'));
