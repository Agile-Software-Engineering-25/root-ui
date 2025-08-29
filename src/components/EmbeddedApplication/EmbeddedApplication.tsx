import { User } from "oidc-client-ts";

const EmbeddedApplication = (props: {
  name: string;
  sx: React.CSSProperties;
  // this thing contains all of the information e.g login token, name, email and claims. (https://authts.github.io/oidc-client-ts/classes/User.html)
  // you can get the profile data with userData.profile, as seen in docs:
  // https://authts.github.io/oidc-client-ts/interfaces/IdTokenClaims.html
  // sorry for the horrible hack, but idk how to check the taype of User with typesystem (?)
  userProfile: User | null | undefined,
  
}) => {

  console.log(props.userProfile?.profile)
  return (
    <div
      style={{ ...props.sx }}
      id={`single-spa-application:${props.name}`}
    >
      hello world!
      <br />
      welcome, { props.userProfile?.profile.given_name }
      <br/>
      your scopes: { props.userProfile?.scopes.join(", ") }
    </div>
  );
};

export default EmbeddedApplication;
