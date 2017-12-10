//@flow
import React from 'react'
import PropTypes from 'prop-types'
import {Nav, TabContent} from 'reactstrap'
import StrapNavItem from './StrapNavItem'
import StrapTabPane from './StrapTabPane'
import StrapAlert from './StrapAlert'

type tabItem = {
    title: string,
    content: string,
}

type Props = {
    tabItems: Array<tabItem>,
}

class StrapTabs extends React.Component {

    state: {
        isActiveTab: number
    }

    constructor(props: Props) {
        super(props)
        this.state = ({
            isActiveTab: 0,
        })
    }

    handleClickTabItem = (index: number) => {
        this.setState({
            isActiveTab: index
        })
        return (
            <StrapAlert
                color="warning"
                message={'This is index ' + index}
            />
        )
    }

    render() {
        return (
            <div>

                <Nav tabs>
                    {
                        this.props.tabItems.map((tabItem, index) => {
                            return (
                                <StrapNavItem
                                    key={index}
                                    text={tabItem.title}
                                    index={index}
                                    active={this.state.isActiveTab === index}
                                    onItemClick={this.handleClickTabItem}
                                />
                            )
                        })
                    }
                </Nav>
                <TabContent activeTab={this.state.isActiveTab}>
                    {
                        this.props.tabItems.map((tabItem, index) => {
                                return (
                                    <StrapTabPane
                                        key={index}
                                        tabId={index}
                                        content={tabItem.content}
                                    />
                                )
                            }
                        )
                    }
                </TabContent>
            </div>
        )
    }
}

StrapTabs.propTypes = {
    tabItems: PropTypes.array.isRequired,
}

export default StrapTabs