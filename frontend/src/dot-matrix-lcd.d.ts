declare module 'dot-matrix-lcd' {
  import { FC } from 'react';
  
  interface DotMatrixLCDProps {
    text: string;
    color?: string;
    backgroundColor?: string;
    dotSize?: number;
    dotSpacing?: number;
  }
  
  const DotMatrixLCD: FC<DotMatrixLCDProps>;
  export default DotMatrixLCD;
}

// Made with Bob
