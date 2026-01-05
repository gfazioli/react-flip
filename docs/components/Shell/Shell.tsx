import React from 'react';
import { IconBrandGithub } from '@tabler/icons-react';
import cx from 'clsx';
import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  Image,
  RemoveScroll,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ColorSchemeControl } from '@mantinex/mantine-header';
import { PACKAGE_DATA } from '../../data';
import classes from './Shell.module.css';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  useHotkeys([['mod + J', toggleColorScheme]]);

  // get the package name
  const packageName = PACKAGE_DATA.packageName
    .replace('@gfazioli/', '')
    .replaceAll('-', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={cx(RemoveScroll.classNames.zeroRight, classes.header)}>
        <Container size="lg" px="md" className={classes.inner}>
          <Group>
            <a
              href="https://undolog.com/"
              target="_blank"
              className={cx('mantine-focus-auto', classes.logo)}
              rel="noreferrer"
            >
              <Image
                width={36}
                height={36}
                src="https://github.com/gfazioli/brand/blob/main/Undolog/logo-64x64.png?raw=true"
                alt="Undolog"
              />
            </a>
            <Title order={2}>{packageName}</Title>
          </Group>
          <Group gap={10}>
            <iframe
              src="https://github.com/sponsors/gfazioli/button"
              title="Sponsor gfazioli"
              height="34"
              width="114"
              className={classes.sponsor}
            />
            <ActionIcon
              visibleFrom="sm"
              size={36}
              radius={8}
              component="a"
              href="https://undolog.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Undolog"
              title="Undolog"
              variant="outline"
            >
              <img
                width={36}
                src="https://github.com/gfazioli/brand/blob/main/Undolog/logo-64x64.png?raw=true"
                alt="Undolog"
              />
            </ActionIcon>
            <ActionIcon
              visibleFrom="sm"
              size={36}
              radius={8}
              component="a"
              href="PACKAGE_DATA.repositoryUrl"
              target="_blank"
              rel="noreferrer"
              aria-label="Undolog"
              title="Undolog"
              variant="outline"
            >
              <IconBrandGithub size={20} />
            </ActionIcon>
          </Group>
          <Group hiddenFrom="sm">
            <ColorSchemeControl />
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <div className={classes.main}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
