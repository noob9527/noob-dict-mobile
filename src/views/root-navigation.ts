import React from 'react';

export const rootNavigationRef = React.createRef<any>();

export function rootNavigate(name: string, params?: any) {
  rootNavigationRef.current?.navigate(name, params);
}
