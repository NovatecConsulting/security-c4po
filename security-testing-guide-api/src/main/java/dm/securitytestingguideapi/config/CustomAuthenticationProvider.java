package dm.securitytestingguideapi.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoderJwkSupport;
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken;
import org.springframework.stereotype.Component;

//@Component
//TODO: unused
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final JwtDecoder jwtDecoder = new NimbusJwtDecoderJwkSupport("https://dev-308298.okta.com/oauth2/default/v1/keys");

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        BearerTokenAuthenticationToken bearer = (BearerTokenAuthenticationToken) authentication;
        Jwt jwt = jwtDecoder.decode(bearer.getToken());
        System.out.println("Issuer: " + jwt.getIssuer());
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(BearerTokenAuthenticationToken.class);
    }

}
