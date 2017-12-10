//@flow
import React from 'react'
import PropTypes from 'prop-types'
import {NavItem, NavLink} from 'reactstrap'

type Props = {
    text: string,
    href: string,
    active: boolean,
    onItemClick: Function,
}

const StrapNavItem = (props: Props) => {

    const handleClick = () => {
        props.onItemClick(props.index)
    }

    return (
        <NavItem>
            <NavLink
                href={props.href}
                active={props.active}
                onClick={handleClick}>
                {props.text}
            </NavLink>
        </NavItem>
    )
}

StrapNavItem.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool,
    onItemClick: PropTypes.func.isRequired,
}

export default StrapNavItem