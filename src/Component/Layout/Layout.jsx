import React from 'react'
import Sidebar from './Sidebar'

class LayoutComponent extends React.Component {
    render() {
        return (
            <div className='with-content-panel'>
                <div className='all-wrapper menu-side with-side-panel'>
                    <div className='layout-w'>
                        <div className='desktop-menu menu-side-w menu-activated-on-click color-scheme-dark'>
                        {/* <div class="menu-mobile menu-activated-on-click color-scheme-dark"> */}
                            <Sidebar />
                        </div>
                        <div className='content-w '>
                            {/* this is the color toggler button */}
                            {/* <div class="floated-colors-btn second-floated-btn">
                                <div class="os-toggler-w">
                                    <div class="os-toggler-i">
                                        <div class="os-toggler-pill"></div>
                                    </div>
                                </div>
                                <span>Dark </span><span>Colors</span>
                            </div> */}

                            <div
                                className='with-content-panel '
                                style={{ minHeight: '100vh' }}
                            >
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
