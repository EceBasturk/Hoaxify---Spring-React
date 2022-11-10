package com.hoaxify.ws.user;

import lombok.Data;
import lombok.Generated;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data //It is a quick way of combining features of @ToString, @EqualsAndHashCode, @Getter,  @Setter and @RequiredArgsConstructor.
@Entity //veritabanı tarafından tanınabilmesi için
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private  long id;

    @NotNull
    @Size(min = 4, max = 255)
    @UniqueUsername //Kendi anatasyonumuz
    //Unique olması username de aynı değerin birden fazşa bulunamayacağını gösteriyor.
    //@Column(unique = true)
    //Column kullanımı yerine kendi constraint anotasyonumuzu yapacağız
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull
    @Size(min=4)
    //Pattern içinde bulunmasını istediğimiz charları kontrol ediyor. Regex=regular expression
    //Regex içinde dediklerimiz (a dan z ye, A dan Z ye, ve sayılardan bir tane karakter bulundursun
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$" )
    private String password;

//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getDisplayName() {
//        return displayName;
//    }
//
//    public void setDisplayName(String displayName) {
//        this.displayName = displayName;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    @Override
//    public String toString() {
//        return "User{" +
//                "username='" + username + '\'' +
//                ", displayName='" + displayName + '\'' +
//                ", password='" + password + '\'' +
//                '}';
//    }
}
