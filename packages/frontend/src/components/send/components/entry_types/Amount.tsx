import React from 'react';
import { Translate } from 'react-localize-redux';

import Tooltip from '../../../common/Tooltip';
import RawTokenAmount from '../RawTokenAmount';
import StyledContainer from './css/Style.css';

type AmountProps = {
    className?: string;
    symbol?: string;
    amount?: string;
    decimals?: number;
    translateIdTitle?: string;
    translateIdInfoTooltip?: string;
    'data-test-id'?: string;
};

const Amount = ({
    className,
    symbol,
    amount,
    decimals,
    translateIdTitle,
    translateIdInfoTooltip,
    'data-test-id': testId
}: AmountProps) => {
    /* TODO: Handle long amounts */
    return (
        <StyledContainer className={className} data-test-id={testId}>
            <Translate id={translateIdTitle} />
            {translateIdInfoTooltip && 
                //@ts-ignore
                <Tooltip translate={translateIdInfoTooltip}/>
            }
            <div className='amount'>
                <RawTokenAmount
                    symbol={symbol}
                    amount={amount}
                    decimals={decimals}
                    showFiatAmountForNonNearToken={false}
                />
            </div>
        </StyledContainer>
    );
};

export default Amount;