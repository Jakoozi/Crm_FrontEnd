import React from 'react'
import Sidebar from './Sidebar'

class LayoutComponent extends React.Component {
    render() {
        return (
            <div className='with-content-panel'>
                <div className='all-wrapper menu-side with-side-panel'>
                    <div className='layout-w'>
                        <div className='desktop-menu menu-side-w menu-activated-on-click color-scheme-dark'>
                            <Sidebar />
                        </div>
                        <div className='content-w '>
                            <div
                                className='with-content-panel'
                                style={{ minHeight: '100vh' }}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LayoutComponent
