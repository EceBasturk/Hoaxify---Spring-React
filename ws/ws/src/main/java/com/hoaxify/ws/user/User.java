package com.hoaxify.ws.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.shared.Views;
import lombok.Data;
import lombok.Generated;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;


@Data //It is a quick way of combining features of @ToString, @EqualsAndHashCode, @Getter,  @Setter and @RequiredArgsConstructor.
@Entity //veritabanı tarafından tanınabilmesi için
@Table(name="users")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private  long id;

    @NotNull(message="{hoaxify.constraint.username.NotNull.message}")
    @Size(min = 4, max = 255)
    @UniqueUsername //Kendi anatasyonumuz
    //Unique olması username de aynı değerin birden fazşa bulunamayacağını gösteriyor.
    //@Column(unique = true)
    //Column kullanımı yerine kendi constraint anotasyonumuzu yapacağız
    @JsonView(Views.Base.class)
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    @JsonView(Views.Base.class)
    private String displayName;

    @NotNull
    @Size(min=4)
    //Pattern içinde bulunmasını istediğimiz charları kontrol ediyor. Regex=regular expression
    //Regex içinde dediklerimiz (a dan z ye, A dan Z ye, ve sayılardan bir tane karakter bulundursun
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constrain.password.Pattern.message}")
    @JsonView(Views.Sensitive.class)
    private String password;

    @JsonView(Views.Base.class)
    private String image;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_user");
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
