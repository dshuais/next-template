import React from 'react';

export default function UserTest(props: Props) {

  const { children } = props;

  return (
    <div>
      UserTest

      {children}
    </div>
  );
}

type Props = {
  children: React.ReactNode;
}
