'use client';

import { Button, Navbar } from '@nextui-org/react';

export default function Nav() {
  return (
    <div>
      <Navbar>
        <Navbar.Content hideIn="xs"></Navbar.Content>
        <Navbar.Content>Memz</Navbar.Content>
        <Navbar.Content>
          <Button>
            <Navbar.Link color="inherit" href="/api/auth/signin">
              Log In
            </Navbar.Link>
          </Button>
        </Navbar.Content>
      </Navbar>
    </div>
  );
}
