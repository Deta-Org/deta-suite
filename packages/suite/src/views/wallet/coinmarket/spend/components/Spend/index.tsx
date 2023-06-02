import React from 'react';
import styled from 'styled-components';

import { Button, Note } from '@detahard/components';
import { Translation } from '@suite-components';
import { isDesktop } from '@suite-utils/env';
import { useCoinmarketSpendContext } from '@wallet-hooks/useCoinmarketSpend';
import { NoProviders, Wrapper } from '@wallet-views/coinmarket';
import { CoinmarketSkeleton } from '@wallet-views/coinmarket/skeleton';

const Vouchers = styled.div`
    width: 100%;
`;

const ProviderInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const IframeWrapper = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.STROKE_GREY};
`;

const WebContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 150px;
`;

const IframeContent = styled.div``;

const StyledButton = styled(Button)`
    margin-top: 25px;
`;

const CoinmarketSpend = () => {
    const { isLoading, noProviders, voucherSiteUrl, openWindow, setShowLeaveModal } =
        useCoinmarketSpendContext();
    const showIframe = !isDesktop();

    return (
        <Wrapper responsiveSize="LG">
            {isLoading && <CoinmarketSkeleton />}
            {!isLoading && noProviders && (
                <NoProviders>
                    <Translation id="TR_SPEND_NO_PROVIDERS" />
                </NoProviders>
            )}
            {!isLoading && !noProviders && (
                <Vouchers>
                    {showIframe && (
                        <IframeContent>
                            <ProviderInfo>
                                <Note>
                                    <Translation id="TR_SPEND_PROVIDER_CONTENT" />
                                </Note>
                            </ProviderInfo>
                            <IframeWrapper>
                                <iframe
                                    title="."
                                    sandbox="allow-scripts allow-forms allow-same-origin"
                                    style={{
                                        width: '100%',
                                        height: '650px',
                                        border: '0',
                                        display: 'block',
                                    }}
                                    src={voucherSiteUrl}
                                />
                            </IframeWrapper>
                        </IframeContent>
                    )}
                    {!showIframe && (
                        <WebContent>
                            <Note>
                                <Translation id="TR_SPEND_PROVIDER_CONTENT_WINDOW" />
                            </Note>
                            <StyledButton
                                variant="primary"
                                onClick={() => {
                                    setShowLeaveModal(true);
                                    openWindow(voucherSiteUrl);
                                }}
                            >
                                <Translation id="TR_SPEND_OPEN_WINDOW" />
                            </StyledButton>
                        </WebContent>
                    )}
                </Vouchers>
            )}
        </Wrapper>
    );
};

export default CoinmarketSpend;
