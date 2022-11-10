package com.hoaxify.ws.user;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.NotNull;
import java.lang.annotation.Documented;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD }) //Nereye etkileyeceği
@Retention(RUNTIME) //Ne zaman çalışacağı
@Constraint(validatedBy = { UniqueUsernameValidator.class }) //
public @interface UniqueUsername {

    String message() default "Username must be unique";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
