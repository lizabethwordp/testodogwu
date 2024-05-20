import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <small className="inside bg-gray-800">&copy; New Team {currentYear}</small>
            {/* <h4 className="header--project"></h4> */}
        </footer>
    );
}
