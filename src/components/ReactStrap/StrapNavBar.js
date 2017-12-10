//@flow
import React from 'react'
import PropTypes from 'prop-types'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap'
import StrapNavItem from './StrapNavItem'

// NavItem PropsType
type navItem = {
    text: string,
    href: string,
}

type Props = {
    title: string,
    navItems: Array<navItem>,
}

class StrapNavBar extends React.Component {

    state: {
        isActive: number,
        isCollapsed: boolean,
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            isActive: 0,
            isCollapsed: true,
        }
    }

    // Highlight Item After Click
    handleClickItem = (index: number) => {
        this.setState({
            isActive: index
        })
    }

    // Mobile Version NavBar
    handleToggleNavBar = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }


    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">{this.props.title}</NavbarBrand>
                <NavbarToggler onClick={this.handleToggleNavBar} className="mr-2"/>
                <Collapse isOpen={!this.state.isCollapsed} navbar>
                    <Nav className="ml-auto" navbar>
                        {
                            this.props.navItems.map((navItem, index) => {
                                return (
                                    <StrapNavItem
                                        key={index}
                                        href={navItem.href}
                                        text={navItem.text}
                                        index={index}
                                        active={this.state.isActive === index}
                                        onItemClick={this.handleClickItem}
                                    />
                                )
                            })
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

StrapNavBar.propTypes = {
    title: PropTypes.string.isRequired,
    navItems: PropTypes.array.isRequired,
}

export default StrapNavBar