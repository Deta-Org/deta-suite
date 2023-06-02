import React from 'react';

import { Card, HStack, IconButton, Text, VStack } from '@suite-native/atoms';
import { Icon } from '@suite-common/icons';
import { prepareNativeStyle, useNativeStyles } from '@detahard/styles';
import { Color } from '@detahard/theme';
import { useOpenLink } from '@suite-native/link';

const cardStyle = prepareNativeStyle<{ backgroundColor: Color }>((utils, { backgroundColor }) => ({
    paddingHorizontal: utils.spacings.large,
    paddingVertical: utils.spacings.large * 2,
    backgroundColor: utils.colors[backgroundColor],
}));

const stackStyle = prepareNativeStyle(_ => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
}));

export const AboutUsBanners = () => {
    const openLink = useOpenLink();
    const { applyStyle } = useNativeStyles();

    return (
        <>
            <Card style={applyStyle(cardStyle, { backgroundColor: 'backgroundNeutralBold' })}>
                <VStack spacing="large" style={applyStyle(stackStyle)}>
                    <Icon color="iconOnPrimary" name="detahard" />
                    <Text color="textOnPrimary">
                        detahard Suite Lite is a safe and secure way to stay connected to the crypto
                        on your hardware wallet. Track coin balances on the go without exposing your
                        private data. Easily create and send payment addresses to anyone.
                    </Text>
                </VStack>
            </Card>
            <Card style={applyStyle(cardStyle, { backgroundColor: 'backgroundSecondaryDefault' })}>
                <VStack spacing="large" style={applyStyle(stackStyle)}>
                    <Text color="textDefaultInverse" variant="titleMedium">
                        Follow us
                    </Text>
                    <HStack spacing="large">
                        <IconButton
                            colorScheme="tertiaryElevation1"
                            iconName="facebook"
                            onPress={() => openLink('https://www.facebook.com/detahard.io')}
                        />
                        <IconButton
                            colorScheme="tertiaryElevation1"
                            iconName="twitter"
                            onPress={() => openLink('https://twitter.com/detahard')}
                        />
                        <IconButton
                            colorScheme="tertiaryElevation1"
                            iconName="github"
                            onPress={() => openLink('https://github.com/detahard')}
                        />
                    </HStack>
                </VStack>
            </Card>
        </>
    );
};
