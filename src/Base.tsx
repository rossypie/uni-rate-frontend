import { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import App from './App';

const Base = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(localStorage.getItem('theme') === 'light' ? 'dark' : 'light');
  const toggleColorScheme = (value?: ColorScheme) =>{
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    localStorage.setItem('theme', colorScheme)
  }

  return (  
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ 
          colorScheme,
          fontFamily: 'Poppins, sans-serif',
        }}
        >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
 
export default Base;