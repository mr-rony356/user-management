import React from 'react';

const FrillWidget: React.FC = React.memo(() => {
  // This effect will run once when the component has mounted
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const widget = (window as any).Frill("widget", {
        key: "90d54760-b65b-4902-a6c3-b54ca7b96a86", // <-- Add Widget key here
        // Pass the element so it knows where to render the embedded widget
      });

      return () => {
        widget.destroy();
      };
    }
  }, []);

  // We are going to render a button that will be used to open the widget. This is because
  // the example widget is using a "CSS selector" for the "Launcher".
  // If your widget does not use this launcher, you can return null.
  return (
    <button type='button' className='frill-container btn'>
      Click here to show the Widget
    </button>
  );
});

export default FrillWidget;