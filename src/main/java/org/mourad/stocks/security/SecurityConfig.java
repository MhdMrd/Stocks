
package org.mourad.stocks.security;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Autowired
    public void globalConfig(AuthenticationManagerBuilder auth, DataSource dataSource) throws Exception{
//        auth.inMemoryAuthentication().withUser("Yuri").password("11121998").roles("Caissier", "Admin");
//        auth.inMemoryAuthentication().withUser("Yod").password("11121998").roles("Caissier", "AC");
//        auth.inMemoryAuthentication().withUser("Ikta").password("11121998").roles("Chef d'agence", "Admin");

          auth.jdbcAuthentication()
                  .dataSource(dataSource)
                  .usersByUsernameQuery("SELECT id_user as principal, password as credentials, true FROM User WHERE username = ?")
                  .authoritiesByUsernameQuery("SELECT u.username as principal, r.nom as role FROM Role r, User u WHERE r.user = ?")
                  .passwordEncoder(new Md5PasswordEncoder())
                  .rolePrefix("ROLE_");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/css/**", "/Angular-Materialize/**", "/font-awesome-4.7.0/**","/images/**","/materialize/**", "/fonts/**", "/js/**").permitAll()
                    .anyRequest()
                        .authenticated()
                            .and()
                .formLogin()
                    .loginPage("/login")
                    .defaultSuccessUrl("/index.html")
                    .permitAll().and()
                .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }
    
    
}
