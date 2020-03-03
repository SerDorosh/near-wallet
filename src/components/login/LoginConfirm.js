import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Translate } from 'react-localize-redux'
import { Grid, Input } from 'semantic-ui-react'

import MobileContainer from '../sign/MobileContainer'
import FormButton from '../common/FormButton'

import IconHelp from '../../images/IconHelp'

class LoginForm extends Component {
    state = {
        accountId: '',
        confirmStatus: ''
    }

    handleChange = (e, { name, value }) => {
        this.setState(() => ({
            [name]: value,
            confirmStatus: ''
        }))
    }

    handleConfirmSubmit = () => {
        if (this.state.accountId === this.props.account.accountId) {
            this.setState(() => ({
                confirmStatus: 'success'
            }))
            this.props.handleAllow()
        }
        else {
            this.setState(() => ({
                confirmStatus: 'problem'
            }))
        }
    }

    render() {
        const { appTitle, buttonLoader } = this.props
        const { accountId, confirmStatus } = this.state

        return (
            <MobileContainer>
                <Grid padded>
                    <Grid.Row centered>
                        <Grid.Column
                            textAlign='center'
                            className='authorize'
                        >
                            <IconHelp color='#ff595a' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className='title'>
                        <Grid.Column
                            as='h1'
                            className='font-benton'
                            textAlign='center'
                            computer={16}
                            tablet={16}
                            mobile={16}
                        >
                            <div className='font-bold'><Translate id='login.confirm.pageTitle' /></div>
                            <div className='h2 font-benton'><Translate id='login.confirm.pageText' data={{ appTitle }} /></div>
                            <div className='h2 font-benton'><br /><Translate id='login.confirm.pageTextSecondLine' /></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid padded>
                    <Grid.Row centered>
                        <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
                            <Translate>
                                {({ translate }) => (
                                    <Input 
                                        name='accountId'
                                        value={accountId}
                                        onChange={this.handleChange}
                                        className={confirmStatus ? (confirmStatus === 'success' ? 'success' : 'problem') : ''}
                                        placeholder={translate('login.confirm.username')}
                                        maxLength='32'
                                        required
                                        autoComplete='off'
                                        autoCorrect='off'
                                        autoCapitalize='off'
                                        spellCheck='false'
                                        tabIndex='1'
                                    />
                                )}
                            </Translate>
                            <div className='alert-info'>
                                {confirmStatus === 'problem' && `Account name doesn't match`}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered className='but-sec'>
                        <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
                            <Link to='/login'>
                                <FormButton
                                    color='gray-white'
                                >
                                    <Translate id='button.cancel' />
                                </FormButton>
                            </Link>

                            <FormButton
                                color='blue'
                                disabled={confirmStatus !== 'problem' && accountId ? false : true}
                                sending={buttonLoader}
                                onClick={this.handleConfirmSubmit}
                            >
                                <Translate id='button.confirm' />
                            </FormButton>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MobileContainer>
)}}

LoginForm.propTypes = {
    buttonLoader: PropTypes.bool.isRequired,
    appTitle: PropTypes.string,
    handleAllow: PropTypes.func.isRequired
}

const mapStateToProps = ({ account }) => ({
    account
})

export default connect(mapStateToProps)(LoginForm)
