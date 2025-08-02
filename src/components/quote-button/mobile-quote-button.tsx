"use client";

interface MobileQuoteButtonProps {
    onOpenQuoteForm: () => void;
    isVisible?: boolean;
}

const MobileQuoteButton = ({ onOpenQuoteForm, isVisible = true }: MobileQuoteButtonProps) => {

    return (
        <div
            className={`mobile-quote-button ${isVisible ? 'visible' : ''}`}
            onClick={onOpenQuoteForm}
        >
            <div className="quote-button-content">
                <span>Get a Quote</span>
            </div>
        </div>
    );
};

export default MobileQuoteButton;
