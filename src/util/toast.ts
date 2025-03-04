import React from 'react';

import { toast } from 'sonner';

export const customToast = (
    type: string,
    toastIcon: React.ReactNode,
    closeIcon: React.ReactNode
) => {
    switch (type) {
        case 'success':
            return {
                action: {
                    label: closeIcon,
                    onClick: () => toast.dismiss()
                },
                icon: toastIcon,
                actionButtonStyle: {
                    backgroundColor: '#fff'
                }
            };
    }
};
