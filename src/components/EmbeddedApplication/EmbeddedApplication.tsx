const EmbeddedApplication = (props: {
  name: string;
  sx: React.CSSProperties;
}) => {
  return (
    <div
      style={{ ...props.sx }}
      id={`single-spa-application:${props.name}`}
    ></div>
  );
};

export default EmbeddedApplication;
