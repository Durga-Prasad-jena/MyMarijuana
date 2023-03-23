import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/home');
  });

  return (
    <div>
    </div>
  );
}

export default DashboardIndex;
