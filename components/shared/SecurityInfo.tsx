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
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box>
            <img
              alt="security"
              height="36px"
              src="/secret-share-icon.png"
              width="36px"
            />
          </Box>
          <Box ml={2.5} sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
              {t('securityInfo.title')}
            </Typography>
          </Box>
        </Box>
        <Link component="button" onClick={toggle}>
          <Box alignItems="center" display="flex">
            <Typography
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
              variant="subtitle2"
            >
              {isExpanded
                ? t('securityInfo.learnMore.collapse')
                : t('securityInfo.learnMore.expand')}
            </Typography>
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
                <Typography variant="subtitle2">
                  {t('securityInfo.learnMore.heading1')}
                </Typography>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {t('securityInfo.learnMore.body1')}
              </Typography>
            </Box>
            <Box mt={5}>
              <Box mb={1}>
                <Typography variant="subtitle2">
                  {t('securityInfo.learnMore.heading2')}
                </Typography>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {t('securityInfo.learnMore.body2')}
              </Typography>
            </Box>
            <Box mt={5}>
              <Box mb={1}>
                <Typography variant="subtitle2">
                  {t('securityInfo.learnMore.heading3')}
                </Typography>
              </Box>
              <Typography color="textSecondary" variant="subtitle2">
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
