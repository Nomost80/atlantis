package exakis.atlantis.admin.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import exakis.atlantis.admin.config.OAuth2Config;
import exakis.atlantis.admin.dtos.ErrorResponse;
import exakis.atlantis.admin.models.User;
import org.jose4j.jwa.AlgorithmConstraints;
import org.jose4j.jwk.HttpsJwks;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.resolvers.HttpsJwksVerificationKeyResolver;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class JwtAuthenticationFilter extends GenericFilterBean {
    private OAuth2Config oAuth2Config;
    private CustomUserService userService;

    public JwtAuthenticationFilter(OAuth2Config oAuth2Config, CustomUserService userService) {
        this.oAuth2Config = oAuth2Config;
        this.userService = userService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;
        try {
            String bearerToken = req.getHeader("Authorization");
            String token = bearerToken.substring(7);

            HttpsJwks httpsJkws = new HttpsJwks(oAuth2Config.getJwks());
            HttpsJwksVerificationKeyResolver httpsJwksKeyResolver = new HttpsJwksVerificationKeyResolver(httpsJkws);

            JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                    .setRequireExpirationTime()
                    .setAllowedClockSkewInSeconds(oAuth2Config.getExpiry())
                    .setRequireSubject()
                    .setExpectedIssuer(oAuth2Config.getIssuer())
                    .setExpectedAudience(oAuth2Config.getAudience())
                    .setJwsAlgorithmConstraints(new AlgorithmConstraints(
                            AlgorithmConstraints.ConstraintType.WHITELIST,
                            AlgorithmIdentifiers.RSA_USING_SHA256
                    ))
                    .setVerificationKeyResolver(httpsJwksKeyResolver)
                    .build();

            JwtClaims claims = jwtConsumer.processToClaims(token);

            User user = this.userService.loadUser(claims);
            List<GrantedAuthority> authorities = AuthorityUtils.NO_AUTHORITIES;
            user.setAttributes(claims.getClaimsMap());
            user.setAuthorities(authorities);

            OAuth2AuthenticationToken authenticationToken = new OAuth2AuthenticationToken(user, user.getAuthorities(), user.getId());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            chain.doFilter(request, response);
        } catch (Exception ex) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setTimestamp(new Date());
            errorResponse.setException(ex.getClass().getSimpleName());
            errorResponse.setMessage(ex.getLocalizedMessage());
            errorResponse.setPath(req.getContextPath());
            errorResponse.setStatus(401);

            String json = new ObjectMapper().writeValueAsString(errorResponse);

            res.setStatus(401);
            res.getWriter().write(json);
        }
    }
}
