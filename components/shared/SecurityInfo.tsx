import React from 'react';
import { Divider, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import useStyles from '@/components/pages/styles/SecurityInfo.styles';
import { useSecurityInfo } from '@/components/shared/SecurityInfo.hooks';

export const SecurityInfo = () => {
  const { t, isExpanded, toggle } = useSecurityInfo();
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="outlined">
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        p={2}
      >
        <Link
          color="inherit"
          component="button"
          onClick={toggle}
          underline="none"
          width="100%"
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box alignItems="center" display="flex">
              <img
                alt="security"
                height="36px"
                src="/security-icon.png"
                width="36px"
              />
              <Box ml={2.5} sx={{ textAlign: 'left' }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 600,
                    lineHeight: '1.2',
                  }}
                  variant="subtitle1"
                >
                  {t<string>("securityInfo.title")}
                </Typography>
              </Box>
            </Box>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Box>
        </Link>
      </Box>
      {isExpanded && (
        <>
          <Divider />
          <Box p={4} textAlign="left">
            <Box>
              <Box mb={1}>
                <Typography component="span" variant="subtitle2">
                  {t<string>("securityInfo.learnMore.heading1")}
                </Typography>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {t<string>("securityInfo.learnMore.body1")}
              </Typography>
            </Box>
            <Box mt={5}>
              <Box mb={1}>
                <Typography component="span" variant="subtitle2">
                  {t<string>("securityInfo.learnMore.heading2")}
                </Typography>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {t<string>("securityInfo.learnMore.body2")}
              </Typography>
            </Box>
            <Box mt={5}>
              <Box mb={1}>
                <Typography component="span" variant="subtitle2">
                  {t<string>("securityInfo.learnMore.heading3")}
                </Typography>
              </Box>
              <Typography
                color="textSecondary"
                component="span"
                variant="subtitle2"
              >
                <Trans i18nKey="securityInfo.learnMore.body3" t={t}>
                  {'Explore how...'}
                  <Link href="https://basistheory.com" target="_blank">
                    {'Basis Theory'}
                  </Link>
                  {'helps developers build...'}
                </Trans>
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};
