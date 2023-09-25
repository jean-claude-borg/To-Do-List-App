import React from 'react';

const SignInContext = React.createContext<{
  isSignedIn: boolean;
  setIsSignedIn: (state: boolean) => void;
} | null>(null);

export default SignInContext;