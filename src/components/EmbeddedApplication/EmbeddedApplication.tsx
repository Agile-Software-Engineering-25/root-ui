import { useEffect } from "react";

const EmbeddedApplication = (props: {
  name: string;
  sx: React.CSSProperties;
  [key: string]: any;
}) => {
  
  useEffect(() => {
    // Make props available globally
    const { name, sx, ...microfrontendProps } = props;

    // Store props under a unique key
    (window as any).rootAppProps = microfrontendProps;

    // Event dispatch for updates
    window.dispatchEvent(new CustomEvent('root-props-updated', {
      detail: microfrontendProps
    }));
  }, [props]);

  return (
    <div
      style={{ ...props.sx }}
      id={`single-spa-application:${props.name}`}
    ></div>
  );
};

export default EmbeddedApplication;
