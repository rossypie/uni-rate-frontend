import * as React from 'react';
import { createStyles, Avatar, Text, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface CardProps {
  title: string,
  subtitle: string,
}

export default function UniCard({title, subtitle}:CardProps)  {
  const { classes } = useStyles();
  return (
    <div style={{marginTop:50, marginBottom:50}}> 
      <Group noWrap>
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {subtitle}
          </Text>
          <Text size="lg" weight={500} className={classes.name}>
            {title}
          </Text>
        </div>
      </Group>
    </div>
  );
}