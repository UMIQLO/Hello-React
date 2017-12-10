//@flow
import React from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'reactstrap'

type Props = {
    color: string,
    message: string,
}

const StrapAlert = (props: Props) => {
    return (
        <Alert color={props.color}>
            {props.message}
        </Alert>
    )
}

StrapAlert.propsType = {
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default StrapAlert