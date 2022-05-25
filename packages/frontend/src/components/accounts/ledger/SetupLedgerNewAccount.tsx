import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';

import { Mixpanel } from '../../../mixpanel/index';
import FormButton from '../../common/FormButton';
import Container from '../../common/styled/Container.css';
import LedgerIcon from '../../svg/LedgerIcon';
import InstructionsModal from './InstructionsModal';

type SetupLedgerNewAccountProps = {
    onClickConnectLedger: ()=> void;
}

export default ({
    onClickConnectLedger
}:SetupLedgerNewAccountProps) => {
    const [showInstructions, setShowInstructions] = useState(false);
    return (
        <Container className='small-centered border ledger-theme'>
            <h1><Translate id='setupLedger.header' /></h1>
            <LedgerIcon />
            <h2>
                <Translate id='setupLedger.one' />
                &nbsp;<Translate id='setupLedger.two' />
                &nbsp;<span
                    className='link underline'
                    onClick={() => {
                        //@ts-ignore
                        Mixpanel.track('SR-Ledger See instructions');
                        setShowInstructions(true);
                    }}
                >
                    <Translate id='setupLedger.twoLink' />
                </span>.
            </h2>
            <FormButton onClick={onClickConnectLedger}>
                <Translate id='button.continue' />
            </FormButton>
            <FormButton
                className='link red'
                linkTo='/set-recovery-implicit-account'
                trackingId='SR-Ledger Click cancel button'
            >
                <Translate id='button.cancel' />
            </FormButton>
            {showInstructions &&
                <InstructionsModal
                    open={showInstructions}
                    onClose={() => {
                        //@ts-ignore
                        Mixpanel.track('SR-Ledger Close instructions');
                        setShowInstructions(false);
                    }}
                />
            }
        </Container>
    );
};
