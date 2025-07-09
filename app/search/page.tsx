import { Suspense } from 'react';
import SearchPage from './SearchPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPage />
    </Suspense>
  );
}