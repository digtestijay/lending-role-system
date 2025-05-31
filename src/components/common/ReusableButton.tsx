
import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReusableButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  children,
  loading = false,
  loadingText = 'Loading...',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Button
      className={cn(
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </Button>
  );
};

export default ReusableButton;
