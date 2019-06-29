package exakis.atlantis.mobileapi.security;

import exakis.atlantis.mobileapi.models.User;
import org.jose4j.jwa.AlgorithmConstraints;
import org.jose4j.jwk.HttpsJwks;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.resolvers.HttpsJwksVerificationKeyResolver;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Service
public class JwtAuthenticationFilter extends GenericFilterBean {
    private CustomUserService userService;

    public JwtAuthenticationFilter(CustomUserService userService) {
        this.userService = userService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest)request;
        String bearerToken = req.getHeader("Authorization");
        String token = bearerToken.substring(7);

        HttpsJwks httpsJkws = new HttpsJwks("https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_signuporsignin");
        HttpsJwksVerificationKeyResolver httpsJwksKeyResolver = new HttpsJwksVerificationKeyResolver(httpsJkws);

        JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                .setRequireExpirationTime()
                .setAllowedClockSkewInSeconds(3600)
                .setRequireSubject()
                .setExpectedIssuer("https://atlantisproject.b2clogin.com/41dd4f0b-7a80-473f-82fa-d518398d6a7f/v2.0/")
                .setExpectedAudience("27fb84fe-4baf-4b6b-bfe7-f2d0638f2790")
                .setJwsAlgorithmConstraints(new AlgorithmConstraints(
                        AlgorithmConstraints.ConstraintType.WHITELIST,
                        AlgorithmIdentifiers.RSA_USING_SHA256
                ))
                .setVerificationKeyResolver(httpsJwksKeyResolver)
                .build();

        try {
            JwtClaims claims = jwtConsumer.processToClaims(token);
            System.out.println(claims.toJson());

            User user = this.userService.loadUser(claims);
            List<GrantedAuthority> authorities = AuthorityUtils.NO_AUTHORITIES;
            user.setAttributes(claims.getClaimsMap());
            user.setAuthorities(authorities);

            OAuth2AuthenticationToken authenticationToken = new OAuth2AuthenticationToken(user, user.getAuthorities(), user.getId());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            chain.doFilter(request, response);
        } catch (InvalidJwtException e) {
            e.printStackTrace();
        }
        catch (MalformedClaimException e) {
            e.printStackTrace();
        }
    }
}
