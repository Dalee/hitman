import React from "react";

class AppLayout extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <div className="pure-menu-horizontal">
                        <span className="pure-menu-heading">Registry Browser</span>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content" style={{padding: "1em"}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default AppLayout;
