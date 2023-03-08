import React from 'react';

import '../Text.css';

export const RegularText = ({
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`regular ${props.className}`}
    />
  );
};
