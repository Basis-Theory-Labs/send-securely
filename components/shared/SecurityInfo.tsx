import React from 'react';
import { Divider, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import useStyles from '@/components/pages/styles/SecurityInfo.styles';
import { useSecurityInfo } from '@/components/shared/SecurityInfo.hooks';

export const SecurityInfo = () => {
  const { t, isExpanded, toggle } = useSecurityInfo();
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.paper}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        p={2}
      >
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box>
            <img src="/secret-share-icon.png" width="36px" height="36px" />
          </Box>
          <Box sx={{ textAlign: 'left' }} ml={2.5}>
            <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
              {t('securityInfo.title')}
            </Typography>
          </Box>
        </Box>
        <Link component="button" onClick={toggle}>
          <Box display="flex" alignItems="center">
            <Typography
              sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
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
              <Typography variant="subtitle2">
                {t('securityInfo.learnMore.heading1')}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {t('securityInfo.learnMore.body1')}
              </Typography>
            </Box>
            <Box mt={5}>
              <Typography variant="subtitle2">
                {t('securityInfo.learnMore.heading2')}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {t('securityInfo.learnMore.body2')}
              </Typography>
            </Box>
            <Box mt={5}>
              <Typography variant="subtitle2">
                {t('securityInfo.learnMore.heading3')}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                <Trans i18nKey="securityInfo.learnMore.body3" t={t}>
                  {'Explore how...'}
                  <Link target="_blank" href="https://basistheory.com">
                    Basis Theory
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
