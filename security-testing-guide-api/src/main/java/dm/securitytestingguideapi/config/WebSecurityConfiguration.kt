package dm.securitytestingguideapi.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager

//@Configuration
open class WebSecurityConfiguration : WebSecurityConfigurerAdapter() {


    override fun configure(http: HttpSecurity) {
        http.headers().httpStrictTransportSecurity().disable()
                .and().csrf().disable()
                .cors()
                .and().httpBasic()//.and().formLogin()
                .and().authorizeRequests().antMatchers("/login").permitAll()
                .anyRequest().authenticated()
    }

    @Bean
    open fun myUserDetails(): UserDetailsService = InMemoryUserDetailsManager (
            User.withUsername("user")
                    .password("user")
                    .passwordEncoder { passwordEncoder().encode(it) }
                    .roles("USER")
                    .build()
    )

    @Bean
    open fun passwordEncoder(): PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()

}