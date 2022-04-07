import React, { ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import type { ClassNameMap } from '@mui/styles';
import { useTranslation } from 'next-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyIcon from '@/components/icons/CopyIcon';

interface CopyButtonProps {
  content: string;
}

interface CopyTextProps extends CopyButtonProps, Pick<ButtonProps, 'size'> {
  iconPosition: 'start' | 'end';
  showCopyText: true;
  classes?: never;
}

interface NoCopyTextProps extends CopyButtonProps {
  classes: ClassNameMap<'copyButton' | 'copyIcon'>;
  iconPosition?: never;
  showCopyText?: never;
}

const isNoCopyTextProp = (
  props: NoCopyTextProps | CopyTextProps
): props is NoCopyTextProps => !(props as CopyTextProps).showCopyText;

export const CopyButton = (props: NoCopyTextProps | CopyTextProps) => {
  const { t } = useTranslation('components');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let button: ReactElement;

  if (isNoCopyTextProp(props)) {
    button = (
      <IconButton
        className={props.classes.copyButton}
        // event.stopPropagation is needed to prevent opening clickable components underneath this button
        onClick={(event) => event.stopPropagation()}
        size="large"
      >
        <CopyIcon className={props.classes.copyIcon} />
      </IconButton>
    );
  } else {
    const startIcon = props.iconPosition === 'start' ? <CopyIcon /> : undefined;
    const endIcon = props.iconPosition === 'end' ? <CopyIcon /> : undefined;

    button = (
      <Button
        color="primary"
        endIcon={endIcon}
        onClick={(event) => event.stopPropagation()}
        size={props.size}
        variant="contained"
        sx={{
          width: (theme) => theme.spacing(12),
          fontSize: '16px',
          fontWeight: 600
        }}
      >
        {t(`shared.CopyButton.${copied ? 'copied' : 'copy'}`)}
      </Button>
    );
  }

  return (
    <CopyToClipboard onCopy={handleCopy} text={props.content}>
      {button}
    </CopyToClipboard>
  );
};
