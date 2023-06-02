import React from 'react';
import { analytics, EventType } from '@detahard/suite-analytics';

import { Translation } from '@suite-components';
import { ActionColumn, SectionItem, TextColumn } from '@suite-components/Settings';
import { Switch } from '@detahard/components';
import { useDevice, useActions } from '@suite-hooks';
import * as deviceSettingsActions from '@settings-actions/deviceSettingsActions';
import { useAnchor } from '@suite-hooks/useAnchor';
import { SettingsAnchor } from '@suite-constants/anchors';

interface PinProtectionProps {
    isDeviceLocked: boolean;
}

export const PinProtection = ({ isDeviceLocked }: PinProtectionProps) => {
    const { device } = useDevice();
    const { changePin } = useActions({
        changePin: deviceSettingsActions.changePin,
    });
    const { anchorRef, shouldHighlight } = useAnchor(SettingsAnchor.PinProtection);

    const pinProtection = device?.features?.pin_protection ?? null;
    return (
        <SectionItem
            data-test="@settings/device/pin-protection"
            ref={anchorRef}
            shouldHighlight={shouldHighlight}
        >
            <TextColumn
                title={<Translation id="TR_DEVICE_SETTINGS_PIN_PROTECTION_TITLE" />}
                description={<Translation id="TR_DEVICE_SETTINGS_PIN_PROTECTION_DESC" />}
            />
            <ActionColumn>
                <Switch
                    isChecked={!!pinProtection}
                    onChange={() => {
                        changePin({ remove: !!pinProtection });
                        analytics.report({
                            type: EventType.SettingsDeviceChangePinProtection,
                            payload: {
                                remove: pinProtection,
                            },
                        });
                    }}
                    isDisabled={isDeviceLocked}
                    dataTest="@settings/device/pin-switch"
                />
            </ActionColumn>
        </SectionItem>
    );
};
