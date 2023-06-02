import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Button, Box, VStack, Text, Card, HStack, Pictogram } from '@suite-native/atoms';
import { useOpenLink } from '@suite-native/link';
import { Icon } from '@suite-common/icons';

type ReceiveTextHintProps = {
    onShowAddress(): void;
};

export const ReceiveTextHint = ({ onShowAddress }: ReceiveTextHintProps) => {
    const openLink = useOpenLink();

    return (
        <VStack spacing="medium">
            <Card>
                <Box marginVertical="medium">
                    <Pictogram
                        variant="yellow"
                        icon="warningCircleLight"
                        title={
                            <Text variant="titleSmall" align="center">
                                <Text
                                    variant="titleSmall"
                                    color="textSecondaryHighlight"
                                    align="center"
                                >
                                    detahard Suite
                                </Text>{' '}
                                <Text variant="titleSmall" color="textSubdued" align="center">
                                    Lite
                                </Text>
                                {'\n'}
                                receive address
                            </Text>
                        }
                        subtitle="For an extra layer of security, use detahard Suite with your detahard hardware
                    wallet to verify the receiving address."
                    />
                </Box>
            </Card>

            <TouchableOpacity
                onPress={() =>
                    openLink('https://detahard.io/learn/a/verifying-detahard-suite-lite-addresses')
                }
            >
                <HStack justifyContent="center" alignItems="center">
                    <Text variant="hint" color="textPrimaryDefault" align="center">
                        Learn more about verifying addresses{' '}
                    </Text>
                    <Icon color="iconPrimaryDefault" name="arrowUpRight" size="medium" />
                </HStack>
            </TouchableOpacity>

            <Box paddingHorizontal="medium">
                <Button iconLeft="eye" size="large" onPress={onShowAddress}>
                    Show address
                </Button>
            </Box>
        </VStack>
    );
};
