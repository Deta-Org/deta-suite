import React from 'react';
import { HELP_CENTER_PASSPHRASE_URL } from '@detahard/urls';
import { analytics, EventType } from '@detahard/suite-analytics';

import { Translation } from '@suite-components';
import { ActionColumn, SectionItem, TextColumn } from '@suite-components/Settings';
import { Switch } from '@detahard/components';
import { useDevice, useActions } from '@suite-hooks';
import * as deviceSettingsActions from '@settings-actions/deviceSettingsActions';
import { useAnchor } from '@suite-hooks/useAnchor';
import { SettingsAnchor } from '@suite-constants/anchors';

interface PassphraseProps {
    isDeviceLocked: boolean;
}

export const Passphrase = ({ isDeviceLocked }: PassphraseProps) => {
    const { device } = useDevice();
    const { applySettings } = useActions({
        applySettings: deviceSettingsActions.applySettings,
    });
    const { anchorRef, shouldHighlight } = useAnchor(SettingsAnchor.Passphrase);

    const passphraseProtection = !!device?.features?.passphrase_protection;
    return (
        <SectionItem
            data-test="@settings/device/passphrase"
            ref={anchorRef}
            shouldHighlight={shouldHighlight}
        >
            <TextColumn
                title={<Translation id="TR_DEVICE_SETTINGS_PASSPHRASE_TITLE" />}
                description={<Translation id="TR_DEVICE_SETTINGS_PASSPHRASE_DESC" />}
                buttonLink={HELP_CENTER_PASSPHRASE_URL}
            />
            <ActionColumn>
                <Switch
                    isChecked={passphraseProtection}
                    onChange={() => {
                        applySettings({
                            use_passphrase: !passphraseProtection,
                        });
                        analytics.report({
                            type: EventType.SettingsDeviceChangePassphraseProtection,
                            payload: {
                                use_passphrase: !passphraseProtection,
                            },
                        });
                    }}
                    dataTest="@settings/device/passphrase-switch"
                    isDisabled={isDeviceLocked}
                />
            </ActionColumn>
        </SectionItem>
    );
};
