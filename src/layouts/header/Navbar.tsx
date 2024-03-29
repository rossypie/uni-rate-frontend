
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import AccountButton from "../../components/AccountButton";
import DarkModeButton from "../../components/DarkModeButton";
import { LoginForm } from "../../components/LoginForm";
import { SignUpForm } from "../../components/SignupForm";

import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [logged, setLogged] = useState(false);
  const [openedRegistration, setOpenedRegistration] = useState<boolean>(false);
  const [openedLogin, setOpenedLogin] = useState<boolean>(false);
  const [openedSignup, setOpenedSignup] = useState<boolean>(false);
  const location = useLocation();

  useEffect(()=>{
    if(localStorage.getItem('auth_token'))
      setLogged(true);
  }, [openedRegistration])

  return (
    <>
      <Modal
        opened={openedRegistration}
        onClose={() => {setOpenedRegistration(false); setOpenedLogin(false); setOpenedSignup(false);}}
        size="sm"
        centered
        className="auth"
      >
        {openedLogin && <LoginForm setOpenedLogin={setOpenedLogin} setOpenedSignup={setOpenedSignup} setOpenedRegistration={setOpenedRegistration} />}
        {openedSignup && <SignUpForm setOpenedLogin={setOpenedLogin} setOpenedSignup={setOpenedSignup} setOpenedRegistration={setOpenedRegistration}/> }
      </Modal>
      <Box pb={120}>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
          <Link to={'/'}>
              <img src={require('../../assets/img/dummy_logo.png')} width={125} height={15} />
          </Link>

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            </Group>

            <Group className={classes.hiddenMobile}>
            {!logged && 
              <>
                <Button variant="default" onClick={() => {setOpenedRegistration(true); setOpenedLogin(true); closeDrawer();}}>Log in</Button>
                <Button onClick={() => {setOpenedRegistration(true); setOpenedSignup(true); closeDrawer();}}>Sign up</Button>
              </>
            }
            {logged && 
              <>
                <AccountButton text={'Account'} setLogged={setLogged}/>
              </>
            }
            <DarkModeButton />
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <Group position="center" grow pb="xl" px="md">
              {!logged && 
              <>
                <Button variant="default" onClick={() => {setOpenedRegistration(true); setOpenedLogin(true); closeDrawer();}}>Log in</Button>
                <Button onClick={() => {setOpenedRegistration(true); setOpenedSignup(true); closeDrawer();}}>Sign up</Button>
              </>
              }
              {logged &&
              <>
                <Button>Account</Button>
              </>
              }
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}