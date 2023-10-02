/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/styles/HeaderMegaMenu.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { ActionToggle } from "./Toggle";
import Link from "next/link";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { data: sessionData } = useSession();
  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>

            {sessionData?.user.role === "admin" && (
              <Link href="/administrator/report/" className={classes.link}>
                Report Page
              </Link>
            )}
          </Group>

          <Group visibleFrom="sm">
            <ActionToggle />
            <Button
              onClick={sessionData ? () => void signOut() : () => void signIn()}
              variant="default"
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {sessionData && (
            <Link href="/" className={classes.link}>
              Home
            </Link>
          )}

          {sessionData?.user.role === "admin" && (
            <Link href="/administrator/report/" className={classes.link}>
              Report Page
            </Link>
          )}

          <Group justify="center" grow pb="xl" px="md">
            <ActionToggle />
            <Button
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
