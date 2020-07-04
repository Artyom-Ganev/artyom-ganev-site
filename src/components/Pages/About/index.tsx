import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { bio } from 'assets';
import { PageContainer } from 'components/Pages';
import { ABOUT } from 'const';
import React, { FC } from 'react';
import useStyles from './styles';

export const TITLE = 'Artem Ganev';

/**
 * About page component
 */
const About: FC = () => {
  const classes = useStyles();
  return (
    <PageContainer title={ABOUT.name} Icon={ABOUT.Icon}>
      <Card className={classes.aboutPageCard} raised>
        <CardContent className={classes.aboutPageContent}>
          <Typography variant='h4' paragraph>
            {TITLE}
          </Typography>
          {bio.data.map((value: string, key: number) => (
            <Typography key={key} className={classes.aboutPageBlock} paragraph variant='h6'>
              {value}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default About;
