import React from 'react';
import { analytics } from '@detahard/suite-analytics';
import { DOCS_ANALYTICS_URL, DATA_TOS_URL } from '@detahard/urls';
import { DataAnalytics } from '@detahard/components';

import { useOnboarding, useSelector } from '@suite-hooks';
import SecurityCheck from './SecurityCheck';
import detahardLink from '@suite-components/detahardLink';
import styled from 'styled-components';

const StyleddetahardLink = styled(detahardLink)`
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const PreOnboardingSetup = () => {
    const { activeSubStep } = useOnboarding();
    const { confirmed } = useSelector(state => ({
        confirmed: state.analytics.confirmed,
    }));

    const { goToSubStep, rerun } = useOnboarding();
    const recovery = useSelector(state => state.recovery);

    const onConfirm = (trackingEnabled: boolean) => {
        if (trackingEnabled) {
            analytics.enable();
        } else {
            analytics.disable();
        }
        if (recovery.status === 'in-progress') {
            // TT remember the recovery state and should continue with recovery
            rerun();
        } else {
            goToSubStep('security-check');
        }
    };

    if (activeSubStep === 'security-check' || confirmed) {
        // If user already confirmed his choice about data collection
        // and just came to setup new device or reload the page we don't won't ask to about data collection again.
        // And only show this 2nd substep
        return <SecurityCheck />;
    }

    // 1st substep
    return (
        <DataAnalytics
            onConfirm={onConfirm}
            analyticsLink={(chunks: React.ReactNode[]) => (
                <StyleddetahardLink variant="underline" href={DOCS_ANALYTICS_URL}>
                    {chunks}
                </StyleddetahardLink>
            )}
            tosLink={(chunks: React.ReactNode[]) => (
                <StyleddetahardLink variant="underline" href={DATA_TOS_URL}>
                    {chunks}
                </StyleddetahardLink>
            )}
        />
    );
};

export default PreOnboardingSetup;
