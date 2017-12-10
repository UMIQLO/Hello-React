//@flow
import React from 'react'
import PropTypes from 'prop-types'
import {TabPane, Row, Col} from 'reactstrap';


type Props = {
    tabId: number,
    content: string,
}

const StrapTabPane = (props: Props) => {
    return (
        <TabPane tabId={props.tabId}>
            <Row>
                <Col sm="12">
                    {props.content}
                </Col>
            </Row>
        </TabPane>
    )
}

StrapTabPane.propsType = {
    tabId: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
}

export default StrapTabPane
